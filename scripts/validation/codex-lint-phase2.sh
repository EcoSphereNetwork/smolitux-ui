#!/bin/bash
# Phase 2: Manual fix guidance
set -e

mkdir -p manual_fix_progress
npm run lint -- --format=json --output-file=manual_fix_progress/remaining.json 2>/dev/null || true

echo "Manual fix guidance generated" > manual_fix_progress/MANUAL_FIX_SESSION_REPORT.md
