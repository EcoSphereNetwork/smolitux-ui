#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════════════════
# ⚙️ CODEX INITIALISIERUNG – Projekt-Setup & GitHub-Konfiguration
# ═══════════════════════════════════════════════════════════════════════════════

echo "⚡ Starte Codex-Projekt-Setup inklusive GitHub-Konfiguration..."

# ───────────────────────────────────────────────
# 1) GitHub Auth & CLI Setup
# ───────────────────────────────────────────────
GITHUB_TOKEN="${GH_TOKEN:-}"

echo "🔑 GitHub Setup..."
git remote remove origin 2>/dev/null || true
echo "✅ Git configured"

# Install GitHub CLI if not present
if ! command -v gh &> /dev/null; then
    echo "📦 Installing GitHub CLI..."
    apt-get update > /tmp/apt.log 2>&1
    apt-get install -y gh > /tmp/gh_install.log 2>&1
fi

# ───────────────────────────────────────────────
# 2) Node.js Dependencies (e.g., for Jest)
# ───────────────────────────────────────────────
if [ -f "package.json" ]; then
    echo "📦 Installing Node.js dependencies..."
    if ! command -v npm &> /dev/null; then
        echo "❌ npm not found. Please install Node.js and npm first."
        exit 1
    fi
    npm install
    echo "✅ Node dependencies installed"
else
    echo "⚠️ No package.json found – skipping npm install"
fi
