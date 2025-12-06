#!/usr/bin/env zx

import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function findMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (extname(file) === '.md') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const markdownFiles = findMarkdownFiles('presentations');

// Clean the output directory
await $`rm -rf _site`;

for (const path of markdownFiles) {
  const name = path.split('/')[1];

  await $`npm run build-slide --name=${name} --out=../../_site/${name}`;
}
