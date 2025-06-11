#!/bin/bash

# SMOLITUX CHRONOLOGICAL PR MERGE
# Merges GitHub pull requests in chronological order while preserving
# all code improvements. Closed PRs are reopened automatically when
# possible.

set -e

# Source utilities if available
SCRIPT_DIR="$(dirname "$0")"
source "$SCRIPT_DIR/../core/utils.sh" 2>/dev/null || true

log_info() {
  echo -e "[INFO] $1"
}

log_error() {
  echo -e "[ERROR] $1" >&2
}

# Validate repository setup
if ! git remote get-url origin &>/dev/null; then
  log_error "Repository remote not configured"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  log_error "GitHub CLI not authenticated"
  exit 1
fi

log_info "Fetching latest changes"
git fetch origin --prune

# Reopen closed PRs without merge
log_info "Checking for closed, unmerged PRs"
CLOSED=$(gh pr list --state closed --json number,mergedAt --jq '.[] | select(.mergedAt == null) | .number')
for PR in $CLOSED; do
  if gh pr reopen "$PR" >/dev/null 2>&1; then
    log_info "Reopened PR #$PR"
  else
    log_error "Could not reopen PR #$PR"
  fi
done

git fetch origin --prune

# Merge PRs oldest first
while true; do
  OLDEST=$(gh pr list --json number,createdAt --jq 'sort_by(.createdAt) | .[0].number')
  if [[ -z "$OLDEST" || "$OLDEST" == "null" ]]; then
    log_info "No open PRs remaining"
    break
  fi

  log_info "Processing PR #$OLDEST"
  git checkout main
  git pull origin main
  gh pr checkout "$OLDEST"

  if ! git rebase main; then
    log_error "Conflicts detected for PR #$OLDEST"
    git rebase --abort
    exit 1
  fi

  git push -f
  gh pr merge "$OLDEST" --merge --delete-branch
  log_info "Merged PR #$OLDEST"

done

