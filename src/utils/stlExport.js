import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import * as THREE from 'three'

export function exportFrameToSTL(frameGroup, filename = 'terrarium-frame.stl') {
  if (!frameGroup) return false

  const exporter = new STLExporter()
  const geometries = []

  frameGroup.traverse((child) => {
    if (child.isMesh && child.geometry) {
      child.updateWorldMatrix(true, false)
      const geo = child.geometry.clone()
      geo.applyMatrix4(child.matrixWorld)
      geometries.push(geo)
    }
  })

  if (geometries.length === 0) return false

  const merged = mergeGeometries(geometries, false)
  const tempMesh = new THREE.Mesh(merged)

  const stlData = exporter.parse(tempMesh, { binary: true })
  const blob = new Blob([stlData], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  geometries.forEach((g) => g.dispose())
  merged.dispose()

  return true
}

export function calcStats(config) {
  const { width, height, depth, barThickness } = config
  const W = width / 1000
  const H = height / 1000
  const D = depth / 1000
  const T = barThickness / 1000

  // Approximate bar volume: 4 vertical + 8 horizontal bars
  const vertVol = 4 * T * H * T
  const horizXVol = 4 * W * T * T
  const horizZVol = 4 * T * T * (D - T)
  const totalVol = (vertVol + horizXVol + horizZVol) * 1e9 // cm³

  const density = 1.24 // PLA g/cm³
  const weightG = Math.round(totalVol * density)

  const glassArea =
    2 * ((width - barThickness) * (height - barThickness)) +
    2 * ((depth - barThickness) * (height - barThickness))

  return {
    volumeCm3: Math.round(totalVol * 10) / 10,
    weightG,
    glassAreaCm2: Math.round(glassArea / 100),
  }
}
