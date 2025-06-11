#!/bin/bash

# SMOLITUX CHRONOLOGICAL PR MERGE
# Merges GitHub pull requests in chronological order while preserving
# all code improvements. Closed PRs are reopened or recovered when
# possible.

set -e

SCRIPT_DIR="$(dirname "$0")"
source "$SCRIPT_DIR/../core/utils.sh" 2>/dev/null || true

log_section "VALIDATING SETUP..."
if ! git remote get-url origin &>/dev/null; then
  log_error "Repository remote not configured"
  log_info "Run: git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui.git"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  log_error "GitHub CLI not authenticated"
  log_info "Run: gh auth login --web"
  exit 1
fi

git fetch origin --prune || log_warning "Repository sync failed - continuing with local data"
log_success "Setup validated - Ready for PR operations"

log_section "SEARCHING FOR CLOSED, UNMERGED PRS..."
CLOSED=$(gh pr list --state closed --json number,mergedAt,closedAt --jq '.[] | select(.mergedAt == null) | .number' 2>/dev/null)
if [[ -n "$CLOSED" ]]; then
  for PR in $CLOSED; do
    log_info "Reopening PR #$PR..."
    if gh pr reopen "$PR" >/dev/null 2>&1; then
      log_success "PR #$PR successfully reopened"
    else
      log_warning "Could not reopen PR #$PR - attempting recovery"
      git fetch origin --prune
      BRANCH=$(git branch -r | grep -E "(pr.?$PR|$PR)" | head -1 | tr -d ' ')
      if [[ -n "$BRANCH" ]]; then
        log_info "Creating recovery branch from $BRANCH"
        git checkout -b recover-pr-$PR "$BRANCH"
        git push -u origin recover-pr-$PR
        TITLE=$(gh pr view "$PR" --json title --jq '.title' 2>/dev/null || echo "Recovered PR #$PR")
        gh pr create --title "🚨 RECOVERED: $TITLE" \
          --body "Automatic recovery of closed PR #$PR" >/dev/null
      else
        log_error "PR branch for #$PR not found - manual recovery required"
      fi
    fi
  done
  git fetch origin --prune
else
  log_info "No closed, unmerged PRs found"
fi

while true; do
  OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number' 2>/dev/null)
  if [[ -z "$OLDEST" || "$OLDEST" == "null" ]]; then
    log_success "All PRs merged"
    break
  fi

  log_section "MERGING OLDEST PR: #$OLDEST"
  gh pr view "$OLDEST" --json title --jq '"Title: " + .title'
  git checkout main && git pull origin main
  gh pr checkout "$OLDEST"

  if ! git rebase main; then
    log_error "Merge conflicts detected for PR #$OLDEST"
    git status --porcelain | grep '^UU\|^AA\|^DD' | cut -c4- || true
    log_warning "Resolve conflicts, then run: git add . && git rebase --continue"
    exit 2
  fi

  git push -f
  gh pr merge "$OLDEST" --merge --delete-branch
  log_success "PR #$OLDEST merged"
done

