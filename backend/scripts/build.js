const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'src');
const dist = path.resolve(__dirname, '..', 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(src, dist, { recursive: true });

console.log('Build complete: src copied to dist');
