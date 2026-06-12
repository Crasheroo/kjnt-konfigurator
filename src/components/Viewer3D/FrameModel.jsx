import { useMemo, forwardRef } from 'react'
import * as THREE from 'three'
import { useConfigStore } from '../../store/useConfigStore'

const frameMat = new THREE.MeshStandardMaterial({
  roughness: 0.35,
  metalness: 0.05,
})

export const FrameModel = forwardRef(function FrameModel(_, ref) {
  const config = useConfigStore((s) => s.config)
  const { width, height, depth, barThickness, frameColor, wireframe } = config

  const W = width
  const H = height
  const D = depth
  const T = barThickness

  const material = useMemo(() => {
    frameMat.color.set(frameColor)
    frameMat.wireframe = wireframe
    return frameMat
  }, [frameColor, wireframe])

  // Bar definitions: [position, size]
  // 4 vertical corner bars (full height)
  // 4 top horizontal X bars (full width)
  // 4 bottom horizontal X bars (full width)
  // 4 top/bottom Z inner bars (depth minus T each side, placed between X bars)
  const bars = useMemo(() => {
    const hw = W / 2
    const hh = H / 2
    const hd = D / 2

    return [
      // Vertical corner bars
      { pos: [-hw, 0, -hd], size: [T, H, T] },
      { pos: [hw, 0, -hd], size: [T, H, T] },
      { pos: [-hw, 0, hd], size: [T, H, T] },
      { pos: [hw, 0, hd], size: [T, H, T] },

      // Top X bars (front & back, full width)
      { pos: [0, hh, -hd], size: [W - T, T, T] },
      { pos: [0, hh, hd], size: [W - T, T, T] },

      // Bottom X bars
      { pos: [0, -hh, -hd], size: [W - T, T, T] },
      { pos: [0, -hh, hd], size: [W - T, T, T] },

      // Top Z bars (left & right, inner depth)
      { pos: [-hw, hh, 0], size: [T, T, D - T] },
      { pos: [hw, hh, 0], size: [T, T, D - T] },

      // Bottom Z bars
      { pos: [-hw, -hh, 0], size: [T, T, D - T] },
      { pos: [hw, -hh, 0], size: [T, T, D - T] },
    ]
  }, [W, H, D, T])

  return (
    <group ref={ref}>
      {bars.map((bar, i) => (
        <mesh
          key={i}
          position={bar.pos}
          material={material}
          castShadow
          receiveShadow
        >
          <boxGeometry args={bar.size} />
        </mesh>
      ))}
    </group>
  )
})
