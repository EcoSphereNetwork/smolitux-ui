#!/bin/bash
# Phase 0: Lint problem analysis and categorization
set -e

mkdir -p lint_analysis
cd lint_analysis

echo "🔍 Running comprehensive lint analysis..."
npm run lint -- --format=json --output-file=full_report.json 2>/dev/null || true
npm run lint -- --format=compact > compact_report.txt 2>&1 || true
npm run lint > human_readable.txt 2>&1 || true

TOTAL_PROBLEMS=$(grep -c "problem" human_readable.txt 2>/dev/null || echo 0)
if [ "$TOTAL_PROBLEMS" -eq 0 ]; then
  TOTAL_PROBLEMS=$(wc -l < compact_report.txt 2>/dev/null || echo 0)
fi

AUTO_FIXABLE=0
npm run lint -- --fix-dry-run --format=compact > auto_fixable.txt 2>&1 || true
if [ -f auto_fixable.txt ]; then
  AUTO_FIXABLE=$(wc -l < auto_fixable.txt)
fi

cat > ANALYSIS_SUMMARY.md <<EOF2
# Lint Analysis Summary

Generated: $(date)
Total Problems: $TOTAL_PROBLEMS
Auto-fixable: $AUTO_FIXABLE
Manual Fixes: $((TOTAL_PROBLEMS - AUTO_FIXABLE))
EOF2

cd ..
echo "📊 LINT ANALYSIS COMPLETE"
