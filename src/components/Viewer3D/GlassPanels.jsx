import { useMemo } from 'react'
import * as THREE from 'three'
import { useConfigStore } from '../../store/useConfigStore'

export function GlassPanels() {
  const config = useConfigStore((s) => s.config)
  const { width, height, depth, barThickness, showGlass, glassOpacity } = config

  const W = width
  const H = height
  const D = depth
  const T = barThickness

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#a8d8ff',
        transparent: true,
        opacity: glassOpacity,
        roughness: 0.02,
        metalness: 0,
        transmission: 0.85,
        thickness: 4,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [glassOpacity]
  )

  const innerW = W - T
  const innerH = H - T
  const innerD = D - T

  const panels = [
    {
      key: 'front',
      show: showGlass.front,
      pos: [0, 0, -D / 2 + T / 4],
      rot: [0, 0, 0],
      size: [innerW, innerH],
    },
    {
      key: 'back',
      show: showGlass.back,
      pos: [0, 0, D / 2 - T / 4],
      rot: [0, 0, 0],
      size: [innerW, innerH],
    },
    {
      key: 'left',
      show: showGlass.left,
      pos: [-W / 2 + T / 4, 0, 0],
      rot: [0, Math.PI / 2, 0],
      size: [innerD, innerH],
    },
    {
      key: 'right',
      show: showGlass.right,
      pos: [W / 2 - T / 4, 0, 0],
      rot: [0, Math.PI / 2, 0],
      size: [innerD, innerH],
    },
    {
      key: 'top',
      show: showGlass.top,
      pos: [0, H / 2 - T / 4, 0],
      rot: [Math.PI / 2, 0, 0],
      size: [innerW, innerD],
    },
    {
      key: 'bottom',
      show: showGlass.bottom,
      pos: [0, -H / 2 + T / 4, 0],
      rot: [Math.PI / 2, 0, 0],
      size: [innerW, innerD],
    },
  ]

  return (
    <group>
      {panels
        .filter((p) => p.show)
        .map((p) => (
          <mesh key={p.key} position={p.pos} rotation={p.rot} material={glassMat}>
            <planeGeometry args={p.size} />
          </mesh>
        ))}
    </group>
  )
}
