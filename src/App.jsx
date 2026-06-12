import { useRef } from 'react'
import { Header } from './components/Header/Header'
import { Viewer3D } from './components/Viewer3D/Viewer3D'
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel'
import styles from './App.module.css'

export default function App() {
  const exportRef = useRef(null)

  return (
    <div className={styles.app}>
      <Header exportRef={exportRef} />
      <main className={styles.main}>
        <div className={styles.viewer}>
          <Viewer3D exportRef={exportRef} />
        </div>
        <aside className={styles.sidebar}>
          <ConfigPanel />
        </aside>
      </main>
    </div>
  )
}
