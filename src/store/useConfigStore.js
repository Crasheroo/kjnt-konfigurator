import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_CONFIG = {
  width: 300,
  height: 300,
  depth: 300,
  barThickness: 20,
  glassSlotDepth: 5,
  glassSlotWidth: 4,
  showGlass: {
    front: true,
    back: true,
    left: true,
    right: true,
    top: false,
    bottom: false,
  },
  frameColor: '#1a6b35',
  glassOpacity: 0.22,
  showDimensions: true,
  showGrid: true,
  autoRotate: false,
  wireframe: false,
}

export const useConfigStore = create(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,

      updateConfig: (updates) =>
        set((state) => ({ config: { ...state.config, ...updates } })),

      toggleGlass: (face) =>
        set((state) => ({
          config: {
            ...state.config,
            showGlass: {
              ...state.config.showGlass,
              [face]: !state.config.showGlass[face],
            },
          },
        })),

      resetConfig: () => set({ config: DEFAULT_CONFIG }),
    }),
    { name: 'kjnt-konfigurator-v1' }
  )
)
