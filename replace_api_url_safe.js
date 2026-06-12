const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:\\CargoHub\\frontend\\customer-portal');

const HTTP_REPLACE = '(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`)';
const WS_REPLACE = '(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/^http/, "ws")}`)';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Double quotes
  content = content.replace(/"http:\/\/localhost:5000(.*?)"/g, HTTP_REPLACE + ' + "$1"');
  // 2. Single quotes
  content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, HTTP_REPLACE + ' + \'$1\'');
  // 3. Backticks
  content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}$1`');
  
  // 4. WebSocket Double quotes
  content = content.replace(/"ws:\/\/localhost:5000(.*?)"/g, WS_REPLACE + ' + "$1"');

  // Cleanup redundant empty string concatenations
  content = content.replace(/ \+ ""/g, '');
  content = content.replace(/ \+ ''/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
