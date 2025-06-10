#!/bin/bash
# Phase 1: Auto-fix lint issues
set -e

PACKAGES=(core theme utils testing layout charts media ai blockchain community resonance federation voice-control)

mkdir -p auto_fix_progress

for pkg in "${PACKAGES[@]}"; do
  pkg_path="packages/@smolitux/$pkg"
  [ -d "$pkg_path" ] || continue
  echo "Processing $pkg_path"
  npx eslint "$pkg_path" --ext .ts,.tsx --fix >/dev/null 2>&1 || true
done

echo "Auto-fix phase complete" > auto_fix_progress/AUTO_FIX_REPORT.md
