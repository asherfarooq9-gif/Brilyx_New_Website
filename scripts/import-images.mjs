// Drop generated images into ./incoming named by slot (see IMAGE_PROMPTS.md), then run:
//   node scripts/import-images.mjs
// Each file is cropped to the slot's ratio, resized, converted to WebP and saved under public/images/.
import { existsSync, mkdirSync, readdirSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const INCOMING = "incoming"
const OUT_ROOT = "public/images"
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"])

// slot file name (no extension) -> folder and pixel size. Keep in sync with src/content/assets.ts.
const SLOTS = {
  // neutral: true strips most of the blue cast (desaturate + slight lift). Originals stay in ./incoming.
  "hero-primary": { dir: "hero", width: 2400, height: 1350, neutral: true },
  intro: { dir: "about", width: 1600, height: 1200 },
  approach: { dir: "about", width: 1600, height: 1200 },
  studio: { dir: "about", width: 1600, height: 1200 },
  "website-development": { dir: "services", width: 1600, height: 1000 },
  "app-development": { dir: "services", width: 1600, height: 1000 },
  "ai-automation": { dir: "services", width: 1600, height: 1000 },
  chatbot: { dir: "services", width: 1600, height: 1000 },
  "why-band": { dir: "backgrounds", width: 2400, height: 1350, neutral: true },
  cta: { dir: "backgrounds", width: 2400, height: 1350 },
  "featured-concept": { dir: "projects", width: 1920, height: 1200 },
}
const PROJECT_SIZE = { dir: "projects", width: 1500, height: 1000 }
const PROJECT_SLUG = /^(website|app|automation|chatbot)-project-(one|two)$/

if (!existsSync(INCOMING)) {
  console.error(`No ./${INCOMING} folder. Create it and put your generated images there.`)
  process.exit(1)
}

let imported = 0
for (const file of readdirSync(INCOMING)) {
  const { name, ext } = path.parse(file)
  if (!EXTENSIONS.has(ext.toLowerCase())) continue

  const slot = SLOTS[name] ?? (PROJECT_SLUG.test(name) ? PROJECT_SIZE : null)
  if (!slot) {
    console.warn(`skip  ${file}: "${name}" is not a known slot name`)
    continue
  }

  const outDir = path.join(OUT_ROOT, slot.dir)
  mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, `${name}.webp`)
  let pipeline = sharp(path.join(INCOMING, file)).resize(slot.width, slot.height, { fit: "cover", position: "attention" })
  if (slot.neutral) pipeline = pipeline.gamma(1.9).modulate({ saturation: 0.15, brightness: 1.05 })
  await pipeline.webp({ quality: 80 }).toFile(outFile)
  console.log(`ok    ${file} -> ${outFile} (${slot.width}x${slot.height})`)
  imported += 1
}
console.log(`${imported} image(s) imported.`)
