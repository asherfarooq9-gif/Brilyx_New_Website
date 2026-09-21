// One-off: derive transparent logo variants from the supplied raster (public/images/logos/brilyx-logo-source.png).
// Re-run after replacing the source. Replace with the official SVG when available.
import sharp from 'sharp'

const SRC = 'public/images/logos/brilyx-logo-source.png'
const OUT = 'public/images/logos'
const NAVY = [20, 38, 68]
const BLUE = [53, 96, 190]
const MARK_WORDMARK_SPLIT_Y = 800
const PAD = 24

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info

function build({ onDark, y0, y1 }) {
  const out = Buffer.alloc(width * height * 4)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3
      const o = (y * width + x) * 4
      const [r, , b] = [data[i], data[i + 1], data[i + 2]]
      const isBlue = b > r + 60
      const base = isBlue ? BLUE : NAVY
      const alpha = y < y0 || y >= y1 ? 0 : Math.min(1, Math.max(0, (255 - r) / (255 - base[0])))
      const c = onDark && !isBlue ? [255, 255, 255] : onDark ? [96, 140, 235] : base
      out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]
      out[o + 3] = alpha < 0.03 ? 0 : Math.round(alpha * 255)
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } })
}

async function save(name, opts) {
  const trimmed = await build(opts).png().toBuffer()
  await sharp(trimmed).trim({ threshold: 1 }).extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${OUT}/${name}`)
}

await save('brilyx-logo.png', { onDark: false, y0: 0, y1: height })
await save('brilyx-logo-light.png', { onDark: true, y0: 0, y1: height })
await save('brilyx-mark.png', { onDark: false, y0: 0, y1: MARK_WORDMARK_SPLIT_Y })
await save('brilyx-mark-light.png', { onDark: true, y0: 0, y1: MARK_WORDMARK_SPLIT_Y })
await save('brilyx-wordmark.png', { onDark: false, y0: MARK_WORDMARK_SPLIT_Y, y1: height })
await save('brilyx-wordmark-light.png', { onDark: true, y0: MARK_WORDMARK_SPLIT_Y, y1: height })

// Favicon: mark centred on white rounded square.
const markFile = `${OUT}/brilyx-mark.png`
const icon = async (size, radius) => {
  const mark = await sharp(markFile).resize(Math.round(size * 0.7), Math.round(size * 0.7), { fit: 'inside' }).toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([
      { input: Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}"/></svg>`), blend: 'dest-in' },
      { input: mark, gravity: 'centre' },
    ])
    .png()
}
await (await icon(512, 96)).toFile('src/app/icon.png')
await (await icon(180, 0)).toFile('src/app/apple-icon.png')
console.log('done')

// Open Graph / Twitter share image (1200x630): logo + tagline on the page tint.
const og = await sharp(`${OUT}/brilyx-logo.png`).resize({ height: 340 }).toBuffer()
const ogText = Buffer.from(
  `<svg width="600" height="340" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="150" font-family="Poppins, Inter, Arial, sans-serif" font-size="58" font-weight="700" fill="#0a0a0a">Digital experiences.</text>
    <text x="0" y="220" font-family="Poppins, Inter, Arial, sans-serif" font-size="58" font-weight="700" fill="#19398d">Engineered to impress.</text>
  </svg>`,
)
const share = sharp({ create: { width: 1200, height: 630, channels: 4, background: '#f3f5fb' } })
  .composite([
    { input: og, left: 110, top: 145 },
    { input: ogText, left: 520, top: 145 },
  ])
  .png()
const shareBuffer = await share.toBuffer()
await sharp(shareBuffer).toFile('src/app/opengraph-image.png')
await sharp(shareBuffer).toFile('src/app/twitter-image.png')
console.log('share image done')
