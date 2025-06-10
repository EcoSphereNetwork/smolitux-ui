#!/bin/bash

# Script to reorganize the scripts directory according to the new structure

echo "🔧 Reorganizing scripts directory..."

# Analysis scripts
echo "📊 Moving analysis scripts..."
cp scripts/core/analysis.sh scripts/analysis/
cp scripts/legacy/analysis/smolitux-analyzer.sh scripts/analysis/
cp scripts/legacy/analysis/generate-coverage-report.js scripts/analysis/
cp scripts/legacy/analysis/run_complete_analysis.sh scripts/analysis/

# Generation scripts
echo "🚀 Moving generation scripts..."
cp scripts/core/completion.sh scripts/generation/
cp scripts/legacy/generation/smolitux-completion-finisher.sh scripts/generation/
cp scripts/legacy/generation/annotate-components.js scripts/generation/
cp scripts/legacy/generation/component-generator.js scripts/generation/

# Validation scripts
echo "✅ Moving validation scripts..."
cp scripts/core/validation.sh scripts/validation/
cp scripts/legacy/validation/run-visual-tests.sh scripts/validation/
cp scripts/legacy/validation/update-visual-snapshots.sh scripts/validation/
cp scripts/legacy/validation/component-validator.js scripts/validation/

# Utility scripts
echo "🛠️ Moving utility scripts..."
cp scripts/core/utils.sh scripts/utils/
cp scripts/legacy/utils/setup-dev-env.sh scripts/utils/
cp scripts/legacy/utils/codespace-setup.sh scripts/utils/
cp scripts/legacy/utils/issue_utils.sh scripts/utils/
cp scripts/legacy/utils/create_issues.sh scripts/utils/
cp scripts/legacy/utils/progress-tracker.js scripts/utils/

# Prompt scripts
echo "📝 Moving prompt scripts..."
cp scripts/legacy/prompts/codex-init.sh scripts/prompts/
cp scripts/legacy/prompts/prompt-builder.js scripts/prompts/

# Make scripts executable
echo "🔑 Making scripts executable..."
find scripts/analysis scripts/generation scripts/validation scripts/utils scripts/prompts -type f -name "*.sh" -exec chmod +x {} \;

# Create README files
echo "📚 Creating README files..."
cat > scripts/README.md << EOF
# Smolitux UI - Skripte

Dieses Verzeichnis enthält Skripte für die Entwicklung, Analyse, Generierung und Validierung von Smolitux UI Komponenten.

## Verzeichnisstruktur

- **analysis/**: Skripte zur Codeanalyse
- **generation/**: Skripte zur Codegenerierung
- **validation/**: Skripte zur Codevalidierung
- **utils/**: Hilfsskripte
- **prompts/**: Prompt-Skripte

## Verwendung

Siehe die README-Dateien in den jeweiligen Unterverzeichnissen für weitere Informationen.
EOF

echo "✅ Scripts reorganized successfully!"
echo "📋 New structure:"
echo "  - scripts/analysis/: Analysis scripts"
echo "  - scripts/generation/: Generation scripts"
echo "  - scripts/validation/: Validation scripts"
echo "  - scripts/prompts/: Prompt-related scripts"
echo "  - scripts/utils/: Utility scripts"