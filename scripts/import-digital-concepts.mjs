import { readFile, mkdir, copyFile } from 'node:fs/promises'
import sharp from 'sharp'

const { jobs } = JSON.parse(await readFile('output/digital-concepts/manifest.json', 'utf8'))
await mkdir('public/images/concepts', { recursive: true })
for (const job of jobs) {
  const original = `output/digital-concepts/${job.key}.png`
  await copyFile(job.source, original)
  const result = await sharp(original).webp({ quality: 88 }).toFile(`public/images/concepts/${job.key}.webp`)
  console.log(`${job.key}: ${result.width}x${result.height}, ${result.size} bytes`)
}
