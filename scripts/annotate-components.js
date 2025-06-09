const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const packagesDir = path.join(baseDir, 'packages', '@smolitux');

/** Simple heuristic to annotate TODOs and FIXMEs in component files */
function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  let added = false;

  // Detect untyped props (props: any or (props) => )
  const componentRegex = /(function|const)\s+([A-Z][A-Za-z0-9_]*)\s*(=\s*\(|\()/;
  const propsAnyRegex = /\(.*props?:?\s*any\s*\)/;
  const propsUntypedRegex = /\(\s*props\s*\)/;
  if ((propsAnyRegex.test(text) || propsUntypedRegex.test(text)) && !lines[0].includes('// FIXME')) {
    lines.unshift('// FIXME: Props nicht typisiert');
    added = true;
  }

  // Detect useEffect without cleanup
  if (/useEffect\([^)]*\{[^]*?\}\)/.test(text) && !/return\s*\(\s*\(\)\s*=>/.test(text) && !lines[0].includes('// FIXME: useEffect')) {
    lines.unshift('// FIXME: useEffect ohne Cleanup');
    added = true;
  }

  if (added) {
    fs.writeFileSync(filePath, lines.join('\n'));
    return true;
  }
  return false;
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      scanFile(full);
    }
  }
}

scanDir(packagesDir);
