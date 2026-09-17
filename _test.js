const { spawnSync } = require('child_process');
const fs = require('fs');
const html = fs.readFileSync('/tmp/opencode/timetable/index.html', 'utf8');

// quick static analysis: check for obvious issues
const checks = [
  ['getElementById mismatch', /getElementById\("([^"]+)"\)/g],
];
let idMap = {};
let m;
const re = /getElementById\("([^"]+)"\)/g;
while ((m = re.exec(html))) idMap[m[1]] = (idMap[m[1]]||0)+1;
console.log("ids referenced:", Object.keys(idMap).sort().join(', '));
const idsInHtml = [...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
console.log("ids defined in HTML:", [...new Set(idsInHtml)].sort().join(', '));
const missing = Object.keys(idMap).filter(k => !idsInHtml.includes(k));
console.log("MISSING ids:", missing.length ? missing.join(', ') : "none");
