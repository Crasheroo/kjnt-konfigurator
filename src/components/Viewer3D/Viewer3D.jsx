import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  ContactShadows,
  Grid,
  Environment,
} from '@react-three/drei'
import { Suspense, useRef, useImperativeHandle, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RotateCcw,
  Grid3x3,
  Maximize2,
  Minimize2,
  Ruler,
  RefreshCw,
} from 'lucide-react'
import { FrameModel } from './FrameModel'
import { GlassPanels } from './GlassPanels'
import { DimensionLabels } from './DimensionLabels'
import { useConfigStore } from '../../store/useConfigStore'
import { exportFrameToSTL } from '../../utils/stlExport'
import styles from './Viewer3D.module.css'

function Scene({ frameRef }) {
  const config = useConfigStore((s) => s.config)
  const { showGrid, autoRotate, width, height, depth } = config

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" color="#050505" near={800} far={2500} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[300, 500, 200]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={10}
        shadow-camera-far={3000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
      />
      <directionalLight position={[-200, 200, -300]} intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={0.6} color="#22c55e" distance={600} />

      <FrameModel ref={frameRef} />
      <GlassPanels />
      <DimensionLabels />

      <ContactShadows
        position={[0, -height / 2 - 1, 0]}
        opacity={0.5}
        scale={Math.max(width, depth) / 80}
        blur={2}
        far={height * 0.5}
        color="#000000"
      />

      {showGrid && (
        <Grid
          position={[0, -height / 2 - 1, 0]}
          args={[2000, 2000]}
          cellSize={50}
          cellThickness={0.4}
          cellColor="#1a1a1a"
          sectionSize={200}
          sectionThickness={1}
          sectionColor="#222222"
          fadeDistance={1500}
          fadeStrength={1}
          infiniteGrid
        />
      )}

      <Environment preset="city" />

      <OrbitControls
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.06}
        minDistance={80}
        maxDistance={2000}
        maxPolarAngle={Math.PI * 0.85}
      />

      <GizmoHelper alignment="bottom-right" margin={[72, 72]}>
        <GizmoViewport
          axisColors={['#ef4444', '#22c55e', '#3b82f6']}
          labelColor="#ffffff"
          hideNegativeAxes
        />
      </GizmoHelper>
    </>
  )
}

export function Viewer3D({ exportRef }) {
  const frameRef = useRef(null)
  const config = useConfigStore((s) => s.config)
  const updateConfig = useConfigStore((s) => s.updateConfig)
  const [loading, setLoading] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  useImperativeHandle(exportRef, () => ({
    exportSTL() {
      const { width, height, depth } = config
      exportFrameToSTL(frameRef.current, `kjnt-${width}x${height}x${depth}.stl`)
    },
  }))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setFullscreen(false)
    }
  }

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {loading && (
          <motion.div
            className={styles.loadingOverlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.spinner} />
            Ładowanie podglądu…
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [450, 350, 550], fov: 45 }}
        shadows
        dpr={[1, 2]}
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null}>
          <Scene frameRef={frameRef} />
        </Suspense>
      </Canvas>

      <div className={styles.toolbar}>
        <button
          className={`${styles.toolBtn} ${config.autoRotate ? styles.active : ''}`}
          onClick={() => updateConfig({ autoRotate: !config.autoRotate })}
          title="Auto-obrót"
        >
          <RefreshCw size={14} />
          Obrót
        </button>
        <button
          className={`${styles.toolBtn} ${config.showDimensions ? styles.active : ''}`}
          onClick={() => updateConfig({ showDimensions: !config.showDimensions })}
          title="Pokaż wymiary"
        >
          <Ruler size={14} />
          Wymiary
        </button>
        <button
          className={`${styles.toolBtn} ${config.showGrid ? styles.active : ''}`}
          onClick={() => updateConfig({ showGrid: !config.showGrid })}
          title="Siatka podłogi"
        >
          <Grid3x3 size={14} />
          Siatka
        </button>
        <button
          className={`${styles.toolBtn} ${config.wireframe ? styles.active : ''}`}
          onClick={() => updateConfig({ wireframe: !config.wireframe })}
          title="Widok siatki"
        >
          <RotateCcw size={14} />
          Szkielet
        </button>
        <button
          className={styles.toolBtn}
          onClick={toggleFullscreen}
          title="Pełny ekran"
        >
          {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  )
}
