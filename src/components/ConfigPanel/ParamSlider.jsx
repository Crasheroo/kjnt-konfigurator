import { useCallback } from 'react'
import styles from './ParamSlider.module.css'

export function ParamSlider({ label, value, min, max, step = 1, unit = 'mm', onChange }) {
  const pct = ((value - min) / (max - min)) * 100

  const handleChange = useCallback(
    (e) => onChange(Number(e.target.value)),
    [onChange]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <div className={styles.valueBox}>
          <input
            type="number"
            className={styles.numInput}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Math.min(max, Math.max(min, Number(e.target.value)))
              onChange(v)
            }}
          />
          <span className={styles.unit}>{unit}</span>
        </div>
      </div>
      <div className={styles.sliderWrap}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, var(--accent) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
          }}
        />
        <div className={styles.ticks}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}
