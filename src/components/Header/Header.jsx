import { motion } from 'framer-motion'
import { Download, Github } from 'lucide-react'
import { useConfigStore } from '../../store/useConfigStore'
import styles from './Header.module.css'

export function Header({ exportRef }) {
  const config = useConfigStore((s) => s.config)

  const handleExport = () => {
    exportRef.current?.exportSTL()
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoWrap}>
          <img src="/logo.jpg" alt="Kiedy Jak Nie Terra" className={styles.logo} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Kiedy Jak Nie Terra</span>
          <span className={styles.brandSub}>Konfigurator Terrarium 3D</span>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.sizeChip}>
          <span className={styles.sizeValue}>
            {config.width}×{config.height}×{config.depth}
          </span>
          <span className={styles.sizeMm}>mm</span>
        </div>

        <motion.button
          className={styles.exportBtn}
          onClick={handleExport}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download size={15} />
          Eksportuj STL
        </motion.button>
      </div>
    </header>
  )
}
