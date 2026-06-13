import { useConfigStore } from '../../store/useConfigStore'
import styles from './ColorPicker.module.css'

const PRESETS = [
  { color: '#1a6b35', label: 'Leśna zieleń' },
  { color: '#1e4d91', label: 'Głęboki granat' },
  { color: '#7c3aed', label: 'Fiolet' },
  { color: '#1a1a1a', label: 'Czarny mat' },
  { color: '#8b5e3c', label: 'Orzech' },
  { color: '#b5b5b5', label: 'Aluminium' },
  { color: '#c0392b', label: 'Czerwień' },
  { color: '#f59e0b', label: 'Amber' },
]

export function ColorPicker() {
  const frameColor = useConfigStore((s) => s.config.frameColor)
  const updateConfig = useConfigStore((s) => s.updateConfig)

  return (
    <div className={styles.wrapper}>
      <div className={styles.presets}>
        {PRESETS.map(({ color, label }) => (
          <button
            key={color}
            className={`${styles.swatch} ${frameColor === color ? styles.selected : ''}`}
            style={{ '--swatch-color': color }}
            onClick={() => updateConfig({ frameColor: color })}
            title={label}
            aria-label={label}
          />
        ))}
      </div>
      <label className={styles.customRow}>
        <span className={styles.customLabel}>Własny kolor</span>
        <div className={styles.customPickerWrap} style={{ '--swatch-color': frameColor }}>
          <input
            type="color"
            value={frameColor}
            onChange={(e) => updateConfig({ frameColor: e.target.value })}
            className={styles.colorInput}
          />
        </div>
      </label>
    </div>
  )
}
