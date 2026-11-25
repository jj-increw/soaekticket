// Edit public/faq.html, then run node scripts/sync-faq.cjs.
// Use --check to verify the generated homepage without writing files.
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.join(__dirname, '..', 'public');
const source = fs.readFileSync(path.join(publicDir, 'faq.html'), 'utf8');
const homepagePath = path.join(publicDir, 'index.html');
const homepage = fs.readFileSync(homepagePath, 'utf8');
const questions = source.match(/<section\b[^>]*\bid="questions"[^>]*>[\s\S]*?<\/section>/)?.[0];
const entries = [...(questions ?? '').matchAll(/^      <details name="site-faq"(?: open)?>[\s\S]*?^      <\/details>/gm)].map(match => match[0]);

if (entries.length !== 12 || entries.some((entry, index) => {
  const label = 'Q' + String(index + 1).padStart(2, '0');
  return !entry.includes(`class="faq-num">${label}</span>`) ||
    entry.startsWith('      <details name="site-faq" open>') !== (index === 0);
})) {
  throw new Error('Expected Q01–Q12 in order, with only Q01 open.');
}

const marker = /(<!-- FAQ PREVIEW START: [^>]+ -->)[\s\S]*?(      <!-- FAQ PREVIEW END -->)/;
if (!marker.test(homepage)) throw new Error('Homepage FAQ markers are missing.');

const newline = homepage.includes('\r\n') ? '\r\n' : '\n';
const preview = entries.slice(0, 6).join('\n').replace(/\r?\n/g, newline);
const updated = homepage.replace(marker, (_, start, end) => [start, preview, end].join(newline));

if (process.argv.includes('--check')) {
  if (updated !== homepage) {
    console.error('Homepage FAQ is out of sync. Run node scripts/sync-faq.cjs.');
    process.exitCode = 1;
  } else {
    console.log('Homepage Q01–Q06 match faq.html.');
  }
} else if (updated !== homepage) {
  fs.writeFileSync(homepagePath, updated);
}
