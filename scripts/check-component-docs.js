#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to check
const filesToCheck = process.argv.slice(2);

// Only check core components
const CORE_COMPONENTS = [
  'Button',
  'Card',
  'Input',
  'Modal',
  // Add other core components as we create them
];

function checkComponentDoc(componentPath) {
  const componentName = path.basename(componentPath, path.extname(componentPath));
  
  // Only block commits for core components
  if (!CORE_COMPONENTS.includes(componentName)) {
    return;
  }

  const docPath = path.join('Docs', 'components', `${componentName}.md`);
  
  if (!fs.existsSync(docPath)) {
    console.error(`❌ Missing documentation for core component: ${componentName}`);
    console.log(`Please create ${docPath} with basic usage documentation`);
    process.exit(1);
  }
}

// Check each file
filesToCheck.forEach(file => {
  if (file.includes('/components/core/')) {
    checkComponentDoc(file);
  }
});

console.log('✅ Core component documentation check passed'); 