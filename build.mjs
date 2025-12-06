#!/usr/bin/env zx

import { readdirSync, statSync, cpSync, existsSync, readFileSync, writeFileSync } from 'fs';
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

function preprocessSlides(slidesPath, basePath) {
  const content = readFileSync(slidesPath, 'utf-8');

  // Replace image paths in frontmatter to include base path
  // This handles: image: './assets/file.png' or image: "./assets/file.png"
  const processedContent = content.replace(
    /^(image:\s*['"])(\.\/assets\/[^'"]+)(['"])/gm,
    (match, prefix, path, suffix) => {
      // Remove the leading ./ from the path and prepend the base path
      const cleanPath = path.replace('./', '');
      return `${prefix}${basePath}${cleanPath}${suffix}`;
    }
  );

  return processedContent;
}

const markdownFiles = findMarkdownFiles('presentations');

// Clean the output directory
await $`rm -rf _site`;

for (const path of markdownFiles) {
  const name = path.split('/')[1];

  // Create a temporary processed slides file
  const tempSlidesPath = `presentations/${name}/.slides-processed.md`;
  const basePath = `/${name}/`;

  const processedContent = preprocessSlides(path, basePath);
  writeFileSync(tempSlidesPath, processedContent);

  try {
    await $`slidev build ${tempSlidesPath} --out=../../_site/${name} --download --base=${basePath}`;
  } finally {
    // Clean up temp file
    await $`rm -f ${tempSlidesPath}`;
  }

  // Copy assets folder to maintain images referenced in frontmatter
  const sourceAssets = `presentations/${name}/assets`;
  const destAssets = `_site/${name}/assets`;

  if (existsSync(sourceAssets)) {
    // Copy all assets, Vite-processed files will be overwritten by this
    // but that's okay since they have different filenames (with hashes)
    cpSync(sourceAssets, destAssets, { recursive: true });
  }
}
