#!/bin/bash

# Codex Lint Fix Engine
# This script automates a multi-phase approach to resolve lint errors.
# Phase 0 - Analysis
# Phase 1 - Auto-fix
# Phase 2 - Manual fix guidance
# Phase 3 - Final validation

set -e

PHASE0_LOG="lint_analysis/ANALYSIS_SUMMARY.md"
PHASE1_LOG="auto_fix_progress/AUTO_FIX_REPORT.md"
PHASE2_LOG="manual_fix_progress/MANUAL_FIX_SESSION_REPORT.md"
PHASE3_LOG="final_validation/CODEX_LINT_FIX_FINAL_REPORT.md"

mkdir -p lint_analysis auto_fix_progress manual_fix_progress final_validation backups

bash scripts/smolitux-analyzer.sh

# Phase 0: Lint analysis
bash -c "${BASH_SOURCE[0]%/*}/codex-lint-phase0.sh"

# Phase 1: Auto-fix engine
bash -c "${BASH_SOURCE[0]%/*}/codex-lint-phase1.sh"

# Phase 2: Manual fix guidance
bash -c "${BASH_SOURCE[0]%/*}/codex-lint-phase2.sh"

# Phase 3: Final validation
bash -c "${BASH_SOURCE[0]%/*}/codex-lint-phase3.sh"

echo "\nReports generated:"
echo "- $PHASE0_LOG"
echo "- $PHASE1_LOG"
echo "- $PHASE2_LOG"
echo "- $PHASE3_LOG"
