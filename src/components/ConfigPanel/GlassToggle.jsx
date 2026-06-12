import { useConfigStore } from '../../store/useConfigStore'
import styles from './GlassToggle.module.css'

const FACES = [
  { key: 'front', label: 'Przód' },
  { key: 'back', label: 'Tył' },
  { key: 'left', label: 'Lewo' },
  { key: 'right', label: 'Prawo' },
  { key: 'top', label: 'Góra' },
  { key: 'bottom', label: 'Dół' },
]

export function GlassToggle() {
  const showGlass = useConfigStore((s) => s.config.showGlass)
  const toggleGlass = useConfigStore((s) => s.toggleGlass)

  return (
    <div className={styles.grid}>
      {FACES.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.faceBtn} ${showGlass[key] ? styles.on : ''}`}
          onClick={() => toggleGlass(key)}
          aria-pressed={showGlass[key]}
        >
          <span className={styles.indicator} />
          {label}
        </button>
      ))}
    </div>
  )
}
