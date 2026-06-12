import { Box, Layers, Droplets, Palette, Info, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { ConfigSection } from './ConfigSection'
import { ParamSlider } from './ParamSlider'
import { GlassToggle } from './GlassToggle'
import { ColorPicker } from './ColorPicker'
import { useConfigStore } from '../../store/useConfigStore'
import { calcStats } from '../../utils/stlExport'
import styles from './ConfigPanel.module.css'

export function ConfigPanel() {
  const config = useConfigStore((s) => s.config)
  const updateConfig = useConfigStore((s) => s.updateConfig)
  const resetConfig = useConfigStore((s) => s.resetConfig)

  const stats = calcStats(config)

  return (
    <div className={styles.panel}>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{config.width}×{config.height}×{config.depth}</span>
          <span className={styles.statLbl}>mm</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>{stats.weightG}</span>
          <span className={styles.statLbl}>g PLA</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>{stats.glassAreaCm2}</span>
          <span className={styles.statLbl}>cm² szkło</span>
        </div>
      </div>

      <div className={styles.sections}>
        <ConfigSection title="Wymiary klatki" icon={Box}>
          <ParamSlider
            label="Szerokość"
            value={config.width}
            min={100}
            max={600}
            step={5}
            onChange={(v) => updateConfig({ width: v })}
          />
          <ParamSlider
            label="Wysokość"
            value={config.height}
            min={100}
            max={600}
            step={5}
            onChange={(v) => updateConfig({ height: v })}
          />
          <ParamSlider
            label="Głębokość"
            value={config.depth}
            min={100}
            max={600}
            step={5}
            onChange={(v) => updateConfig({ depth: v })}
          />
        </ConfigSection>

        <ConfigSection title="Profil ramy" icon={Layers}>
          <ParamSlider
            label="Grubość profilu"
            value={config.barThickness}
            min={8}
            max={50}
            step={1}
            onChange={(v) => updateConfig({ barThickness: v })}
          />
          <ParamSlider
            label="Głębokość slotu na szkło"
            value={config.glassSlotDepth}
            min={2}
            max={15}
            step={0.5}
            onChange={(v) => updateConfig({ glassSlotDepth: v })}
          />
          <ParamSlider
            label="Szerokość slotu (grubość szkła)"
            value={config.glassSlotWidth}
            min={2}
            max={8}
            step={0.5}
            onChange={(v) => updateConfig({ glassSlotWidth: v })}
          />
        </ConfigSection>

        <ConfigSection title="Szyby" icon={Droplets}>
          <p className={styles.hint}>Wybierz ściany z szybami</p>
          <GlassToggle />
          <ParamSlider
            label="Przezroczystość podglądu"
            value={Math.round(config.glassOpacity * 100)}
            min={5}
            max={80}
            step={5}
            unit="%"
            onChange={(v) => updateConfig({ glassOpacity: v / 100 })}
          />
        </ConfigSection>

        <ConfigSection title="Kolor ramy" icon={Palette}>
          <ColorPicker />
        </ConfigSection>

        <ConfigSection title="Informacje" icon={Info} defaultOpen={false}>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Objętość PLA</span>
              <span className={styles.infoVal}>{stats.volumeCm3} cm³</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Szacowana waga</span>
              <span className={styles.infoVal}>{stats.weightG} g</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Powierzchnia szkła</span>
              <span className={styles.infoVal}>{stats.glassAreaCm2} cm²</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Grubość profilu</span>
              <span className={styles.infoVal}>{config.barThickness} mm</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Slot na szkło</span>
              <span className={styles.infoVal}>
                {config.glassSlotDepth} × {config.glassSlotWidth} mm
              </span>
            </div>
          </div>
          <p className={styles.note}>
            * Waga szacunkowa dla filamentu PLA (1,24 g/cm³). Plik STL gotowy do
            Fusion 360 / Slicer.
          </p>
        </ConfigSection>
      </div>

      <div className={styles.footer}>
        <motion.button
          className={styles.resetBtn}
          onClick={resetConfig}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={13} />
          Przywróć domyślne
        </motion.button>
      </div>
    </div>
  )
}
