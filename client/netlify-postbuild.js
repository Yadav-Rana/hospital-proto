// netlify-postbuild.js
import fs from 'fs';
import path from 'path';

// Ensure the _redirects file exists in the dist folder
const redirectsContent = '/* /index.html 200';
const distPath = path.resolve('./dist');
const redirectsPath = path.join(distPath, '_redirects');

// Create the file
fs.writeFileSync(redirectsPath, redirectsContent);
console.log('Created _redirects file in dist folder');
