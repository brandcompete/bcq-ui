/*
 * Generates a random social-sharing thumbnail (1200x630 PNG, the og:image size) made of
 * random geometric shapes, and writes it to public/images/thumbnails/<kebab-name>.png.
 * Called by bcq:create for every new component; can also be run on its own.
 *
 * Run: npm run bcq:thumbnail -- <kebab-name> [--force]
 *      (--force overwrites an existing thumbnail)
 */

const fs = require('fs')
const path = require('path')
const { createCanvas } = require('@napi-rs/canvas')

const root = path.resolve(__dirname, '..')
const thumbnailsDir = path.join(root, 'public/images/thumbnails')

const width = 1200
const height = 630
const background = '#212121'
const colors = [
  [66, 211, 146],
  [95, 139, 239]
]

const random = (min, max) => min + Math.random() * (max - min)
const randomInt = (min, max) => Math.floor(random(min, max + 1))
const pick = list => list[Math.floor(Math.random() * list.length)]

// one shape is drawn centered on (0, 0) with the given size; the caller translates/rotates the context
const shapes = {
  circle (ctx, size) {
    ctx.beginPath()
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
  },
  square (ctx, size) {
    ctx.beginPath()
    ctx.rect(-size / 2, -size / 2, size, size)
  },
  rectangle (ctx, size) {
    ctx.beginPath()
    ctx.rect(-size / 2, -size / 4, size, size / 2)
  },
  triangle (ctx, size) {
    const r = size / 2
    ctx.beginPath()
    for (let i = 0; i < 3; i++) {
      const angle = -Math.PI / 2 + i * (Math.PI * 2) / 3
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    ctx.closePath()
  },
  hexagon (ctx, size) {
    const r = size / 2
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    ctx.closePath()
  }
}

function drawShape (ctx) {
  const [r, g, b] = pick(colors)
  const size = random(40, 220)
  // shapes may stick out of the edges, like in the existing thumbnails
  const x = random(-size / 4, width + size / 4)
  const y = random(-size / 4, height + size / 4)

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(Math.random() < 0.5 ? 0 : random(0, Math.PI * 2))
  shapes[pick(Object.keys(shapes))](ctx, size)

  // mostly filled, sometimes outlined only
  if (Math.random() < 0.75) {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${random(0.55, 0.95).toFixed(2)})`
    ctx.fill()
  } else {
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${random(0.6, 1).toFixed(2)})`
    ctx.lineWidth = random(4, 10)
    ctx.stroke()
  }
  ctx.restore()
}

// returns the PNG as a Buffer
function renderThumbnail () {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)

  const count = randomInt(10, 18)
  for (let i = 0; i < count; i++) {
    drawShape(ctx)
  }

  return canvas.toBuffer('image/png')
}

// writes public/images/thumbnails/<kebabCaseName>.png and returns its path relative to the repo root
function createThumbnail (kebabCaseName, { dryRun = false, force = false } = {}) {
  if (!/^[a-z][a-z0-9-]*$/.test(kebabCaseName || '')) {
    throw new Error(`invalid thumbnail name "${kebabCaseName}", use kebab-case, e.g. date-picker`)
  }
  const target = path.join(thumbnailsDir, `${kebabCaseName}.png`)
  const relative = path.relative(root, target)
  if (!force && fs.existsSync(target)) {
    throw new Error(`${relative} already exists (use --force to overwrite it)`)
  }
  const png = renderThumbnail()
  if (!dryRun) {
    fs.writeFileSync(target, png)
  }
  return relative
}

module.exports = { createThumbnail, renderThumbnail }

// CLI: node bcq-cli/thumbnail.cjs <kebab-name> [--force]
if (require.main === module) {
  const args = process.argv.slice(2)
  const name = args.find(arg => !arg.startsWith('--'))
  try {
    const file = createThumbnail(name, { force: args.includes('--force') })
    console.log(`✓ ${file} created`)
  } catch (error) {
    console.error(`✗ ${error.message}`)
    process.exitCode = 1
  }
}
