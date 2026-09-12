const fs = require("fs")
const path = require("path")
const zlib = require("zlib")

const OUT = path.join(__dirname, "..", "public")

const BOLT = [
  [36, 8],
  [18, 36],
  [29, 36],
  [25, 56],
  [48, 26],
  [35, 26],
  [39, 8],
]

function pointInPoly(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function crc32(buf) {
  let table = crc32.table
  if (!table) {
    table = crc32.table = []
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      table[n] = c >>> 0
    }
  }
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, "ascii")
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function render(size) {
  const scale = size / 64
  const radius = size * 0.22
  const ss = 3
  const stride = size * 4
  const raw = Buffer.alloc(stride * size)

  const sample = (x, y) => {
    const px = x / scale + 0.5
    const py = y / scale + 0.5
    // Within rounded square?
    const cx = Math.min(Math.max(px, radius), 64 - radius)
    const cy = Math.min(Math.max(py, radius), 64 - radius)
    const dx = px - cx
    const dy = py - cy
    const inRect = dx * dx + dy * dy <= radius * radius
    if (!inRect) return [0, 0, 0, 0]
    const inBolt = pointInPoly(px, py, BOLT)
    if (inBolt) return [255, 255, 255, 255]
    return [29, 29, 31, 255]
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const [cr, cg, cb, ca] = sample(x + (sx + 0.5) / ss, y + (sy + 0.5) / ss)
          r += cr * ca
          g += cg * ca
          b += cb * ca
          a += ca
        }
      }
      const n = ss * ss
      const alpha = a / n
      const idx = y * stride + x * 4
      if (alpha <= 0) {
        raw[idx] = raw[idx + 1] = raw[idx + 2] = raw[idx + 3] = 0
      } else {
        raw[idx] = Math.round(r / a)
        raw[idx + 1] = Math.round(g / a)
        raw[idx + 2] = Math.round(b / a)
        raw[idx + 3] = Math.round(alpha)
      }
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const filtered = Buffer.alloc(stride * size + size)
  for (let y = 0; y < size; y++) {
    const rowStart = y * stride
    filtered[y * (stride + 1)] = 0
    raw.copy(filtered, y * (stride + 1) + 1, rowStart, rowStart + stride)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(filtered, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

for (const size of [512, 192]) {
  fs.writeFileSync(path.join(OUT, `icon-${size}.png`), render(size))
  console.log(`icon-${size}.png generado`)
}