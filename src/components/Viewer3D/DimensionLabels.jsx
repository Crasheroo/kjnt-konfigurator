import { Html } from '@react-three/drei'
import { useConfigStore } from '../../store/useConfigStore'
import styles from './Viewer3D.module.css'

export function DimensionLabels() {
  const config = useConfigStore((s) => s.config)
  const { width, height, depth, barThickness, showDimensions } = config

  if (!showDimensions) return null

  const W = width
  const H = height
  const D = depth
  const T = barThickness

  const offset = T * 0.8

  return (
    <group>
      {/* Width — front bottom */}
      <Html
        position={[0, -H / 2 - offset * 2, -D / 2 - offset]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.dimLabel}>⟷ {width} mm</div>
      </Html>

      {/* Height — left side */}
      <Html
        position={[-W / 2 - offset * 2, 0, -D / 2 - offset]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.dimLabel}>↕ {height} mm</div>
      </Html>

      {/* Depth — bottom right */}
      <Html
        position={[W / 2 + offset, -H / 2 - offset * 2, 0]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.dimLabel}>⟺ {depth} mm</div>
      </Html>
    </group>
  )
}
