const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const packagesDir = path.join(baseDir, 'packages', '@smolitux');

const todoMap = {}; // {pkg: {component: Set<string>}}
const fixmeMap = {}; // same structure

function add(map, pkg, comp, msg) {
  if (!map[pkg]) map[pkg] = {};
  if (!map[pkg][comp]) map[pkg][comp] = new Set();
  map[pkg][comp].add(msg);
}

function annotateFile(filePath, pkg, comp) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  let added = false;

  // skip if file already annotated
  if (lines[0] && lines[0].startsWith('// TODO') || lines[0].startsWith('// FIXME')) {
    return;
  }

  const untypedProps = /(\(\s*props\s*\)|:\s*any[\s,}\n])/;
  if (untypedProps.test(text)) {
    lines.unshift('// FIXME: Props nicht typisiert');
    add(fixmeMap, pkg, comp, 'Props nicht typisiert');
    added = true;
  }

  const untypedCallback = /on[A-Z]\w*=\(e\) =>/;
  if (untypedCallback.test(text)) {
    lines.unshift('// FIXME: Callback nicht typisiert');
    add(fixmeMap, pkg, comp, 'Callback nicht typisiert');
    added = true;
  }

  const useEffectNoCleanup = /useEffect\([^)]*\{[^]*?\}\)/s;
  if (useEffectNoCleanup.test(text) && !/return\s*\(\s*\(\)\s*=>/.test(text)) {
    lines.unshift('// FIXME: useEffect ohne Cleanup');
    add(fixmeMap, pkg, comp, 'useEffect ohne Cleanup');
    added = true;
  }

  if (!text.includes('forwardRef')) {
    lines.unshift('// TODO: forwardRef hinzufügen');
    add(todoMap, pkg, comp, 'forwardRef hinzufügen');
    added = true;
  }

  const dir = path.dirname(filePath);
  const stories = fs.readdirSync(dir).filter(f => f.endsWith('.stories.tsx')).length;
  if (stories === 0) {
    lines.unshift('// TODO: Storybook fehlt');
    add(todoMap, pkg, comp, 'Storybook fehlt');
    added = true;
  }
  const tests = fs.readdirSync(dir).filter(f => f.endsWith('.test.tsx')).length;
  if (tests === 0) {
    lines.unshift('// TODO: Tests fehlen');
    add(todoMap, pkg, comp, 'Tests fehlen');
    added = true;
  }

  if (added) {
    fs.writeFileSync(filePath, lines.join('\n'));
  }
}

function scanComponent(dir, pkg, comp) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.includes('.stories') && !entry.name.includes('.test') && !entry.name.includes('.a11y')) {
      annotateFile(full, pkg, comp);
    }
  }
}

function scanPackages() {
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true });
  for (const pkgDir of packages) {
    if (!pkgDir.isDirectory()) continue;
    const pkgName = pkgDir.name;
    const compRoot = path.join(packagesDir, pkgName, 'src', 'components');
    if (!fs.existsSync(compRoot)) continue;
    const comps = fs.readdirSync(compRoot, { withFileTypes: true });
    for (const compDir of comps) {
      if (compDir.isDirectory()) {
        scanComponent(path.join(compRoot, compDir.name), pkgName, compDir.name);
      }
    }
  }
}

function formatTable(map, type) {
  const sections = [];
  for (const pkg of Object.keys(map)) {
    sections.push(`## @smolitux/${pkg}`);
    sections.push('');
    sections.push(`| Komponente | ${type} |`);
    sections.push('|------------|-------|');
    for (const comp of Object.keys(map[pkg])) {
      const msgs = Array.from(map[pkg][comp]).join(', ');
      sections.push(`| ${comp} | ${msgs} |`);
    }
    sections.push('');
  }
  return sections.join('\n');
}

function updateDocs() {
  const date = new Date().toISOString().split('T')[0];
  if (Object.keys(todoMap).length) {
    let todoDoc = fs.readFileSync(path.join(baseDir, 'docs/wiki/development/component-todo.md'), 'utf8');
    todoDoc += `\n### Update ${date} - Automated annotations\n` + formatTable(todoMap, 'TODOs') + '\n';
    fs.writeFileSync(path.join(baseDir, 'docs/wiki/development/component-todo.md'), todoDoc);
  }
  if (Object.keys(fixmeMap).length) {
    let fixmeDoc = fs.readFileSync(path.join(baseDir, 'docs/wiki/development/component-fixme.md'), 'utf8');
    fixmeDoc += `\n### Update ${date} - Automated annotations\n` + formatTable(fixmeMap, 'FIXMEs') + '\n';
    fs.writeFileSync(path.join(baseDir, 'docs/wiki/development/component-fixme.md'), fixmeDoc);
  }
  const statusFiles = [
    path.join(baseDir, 'docs/wiki/development/component-status.md'),
    path.join(baseDir, 'COMPONENT_STATUS.md'),
    path.join(baseDir, 'docs/wiki/testing/test-coverage-dashboard.md')
  ];
  for (const file of statusFiles) {
    if (fs.existsSync(file)) {
      let txt = fs.readFileSync(file, 'utf8');
      txt += `\n### Update ${date} - Automated TODO/FIXME scan executed.`;
      fs.writeFileSync(file, txt);
    }
  }
}

scanPackages();
updateDocs();
