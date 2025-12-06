#!/usr/bin/env zx

import { readdirSync, statSync, cpSync, existsSync } from 'fs';
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

  // Copy assets folder to maintain images referenced in frontmatter
  const sourceAssets = `presentations/${name}/assets`;
  const destAssets = `_site/${name}/assets`;

  if (existsSync(sourceAssets)) {
    // Copy all assets, Vite-processed files will be overwritten by this
    // but that's okay since they have different filenames (with hashes)
    cpSync(sourceAssets, destAssets, { recursive: true });
  }
}
