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
const apiVar = '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`';
const apiBase = '${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace string literals like "http://localhost:5000/api/..." -> `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/...`
  content = content.replace(/['"]http:\/\/localhost:5000(.*?)['"]/g, '`' + apiBase + '$1`');
  
  // Replace occurrences already in template literals
  // We don't want to replace if it's already using apiBase
  content = content.replace(/http:\/\/localhost:5000/g, (match, offset, fullString) => {
    const previousChars = fullString.substring(Math.max(0, offset - 10), offset);
    if (previousChars.includes('API_URL')) {
      return match; // skip, already replaced
    }
    return apiBase;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
