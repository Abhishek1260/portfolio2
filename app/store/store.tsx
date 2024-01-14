import { create } from "zustand";


export const useStore = create((set) => ({
    lookAt: {
        x: 0,
        y: 2,
        z: 0
    },
    zoomed: false,
    domnain: "",
    goBack: false,
    setLookAt: (x: number, y: number, z: number) => set((state: any) => ({ ...state, lookAt: { x, y, z } })),
    toggleZoom: (to: boolean) => set((state: any) => ({ ...state, zoomed: to })),
    setGoBack: (cond: boolean) => set((state: any) => ({ goBack: cond })),
    cameraPos: {
        x: 0,
        y: 0,
        z: 0,
    },
    setCameraPos: (x: number, y: number, z: number) => set((state: any) => ({ ...state, cameraPos: { x, y, z } })),
    setDomain: (domain: string) => set((state: any) => ({ ...state, domain: domain })),
    removeMouseDown: false,
    setRemoveMouseDown: (bool: boolean) => set((state: any) => ({ ...state, removeMouseDown: bool }))
}
))