import fs from 'fs/promises';
import convert from 'heic-convert';
import path from 'path';

const inputDir = './Our Work';
const outputDir = './public/images/work';

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.heic') {
      const inputBuffer = await fs.readFile(path.join(inputDir, file));
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.8
      });
      const outName = path.basename(file, path.extname(file)) + '.jpg';
      await fs.writeFile(path.join(outputDir, outName), outputBuffer);
      console.log(`Converted ${file} to ${outName}`);
    } else if (ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.webp') {
       await fs.copyFile(path.join(inputDir, file), path.join(outputDir, file));
       console.log(`Copied ${file}`);
    }
  }
}

main().catch(console.error);
