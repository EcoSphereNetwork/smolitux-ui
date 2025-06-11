# 🎯 CODEX: SOFORTIGER PR-MERGE

## **DIREKTER BEFEHL:**

**STARTE SOFORT mit diesem Befehl - keine Dokumentation lesen!**

```bash
# SOFORT AUSFÜHREN:
bash -c "$(cat <<'EOF'
echo "🚀 STARTING PR MERGE WORKFLOW..."

# 1. Check setup
if ! git remote get-url origin &>/dev/null; then
    echo "❌ Setup required"
    exit 1
fi
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub auth required"
    exit 1
fi

# 2. Find and recover closed, unmerged PRs
echo "🔍 Checking for closed, unmerged PRs..."
CLOSED_UNMERGED=$(gh pr list --state closed --json number,mergedAt --jq '.[] | select(.mergedAt == null) | .number' 2>/dev/null)

if [ -n "$CLOSED_UNMERGED" ]; then
    echo "🚨 Found closed PRs without merge - attempting recovery..."
    for PR_NUM in $CLOSED_UNMERGED; do
        echo "🔄 Reopening PR #$PR_NUM..."
        gh pr reopen $PR_NUM 2>/dev/null && echo "✅ Reopened" || echo "⚠️ Failed to reopen"
    done
    git fetch origin --prune
fi

# 3. Merge oldest open PR
OLDEST_PR=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')

if [ -n "$OLDEST_PR" ] && [ "$OLDEST_PR" != "null" ]; then
    echo "🎯 Merging oldest PR: #$OLDEST_PR"
    
    git checkout main && git pull origin main
    gh pr checkout $OLDEST_PR
    
    if git rebase main; then
        echo "✅ Clean rebase - merging..."
        git push -f
        gh pr merge $OLDEST_PR --merge --delete-branch
        echo "✅ PR #$OLDEST_PR merged successfully!"
        
        # Check for more PRs
        REMAINING=$(gh pr list --json number --jq 'length')
        echo "📊 Remaining PRs: $REMAINING"
    else
        echo "🚨 MERGE CONFLICTS in PR #$OLDEST_PR"
        echo "📋 Conflicted files:"
        git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
        echo ""
        echo "🛠️ RESOLVE CONFLICTS:"
        echo "1. Edit each file to keep ALL PR improvements"
        echo "2. Priority: Bug-fixes > Security > Performance > Features"
        echo "3. Run: git add . && git rebase --continue"
        echo "4. Then: git push -f && gh pr merge $OLDEST_PR --merge"
        echo ""
        echo "🚨 DO NOT CLOSE PR #$OLDEST_PR!"
    fi
else
    echo "🎉 No open PRs found!"
fi
EOF
)"
```

## **BEI KONFLIKTEN:**

**NIEMALS PRs schließen! Immer lösen:**

1. **Öffne konfliktierte Dateien**
2. **Behalte ALLE Code-Verbesserungen aus dem PR**
3. **Priorität: Bug-Fixes > Security-Fixes > Performance > Features**
4. **Kombiniere mit main, aber verliere nie PR-Code**
5. **Entferne `<<<<<<< ======= >>>>>>>` Marker**
6. **`git add . && git rebase --continue`**
7. **`git push -f && gh pr merge [PR-NUM] --merge`**

## **WIEDERHOLUNG:**

Nach erfolgreichem Merge: **Führe den Befehl erneut aus** für den nächsten PR.

**ZIEL:** Alle PRs chronologisch mergen, keine Code-Verbesserungen verlieren.
