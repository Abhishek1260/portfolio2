"use client"

import { useEffect, useRef, useState } from "react";
import { audioSVG, stopSVG } from "./constants/icons";
import { useStore } from "./store/store";

export default function Page() {

  const [time, setTime] = useState("Day")

  const [muted, setMuted] = useState(true)

  const { click } = useStore((state: any) => ({ click: state.click }))

  useEffect(() => {
    const date = new Date()
    const hour = date.getHours()
    if (hour >= 6 && hour < 14) {
      setTime("White")
    } else if (hour >= 14 && hour < 22) {
      setTime("Day")
    } else {
      setTime("Night")
    }
  }, [])

  useEffect(() => {
    if (!click) return
    if (ref == undefined || ref == null || ref.current == null) {
      return
    }
    console.log(ref.current.muted)
    if (ref.current.muted) {
      setMuted(false)
      ref.current.muted = false
      ref.current.volume = 0.3
    }
  }, [click])

  const clickHandler = () => {
    if (ref == undefined || ref == null || ref.current == null) {
      return
    }
    console.log(ref.current.muted)
    if (ref.current.muted) {
      setMuted(false)
      ref.current.muted = false
      ref.current.volume = 0.3
    } else {
      setMuted(true)
      ref.current.muted = true
      ref.current.volume = 0
    }
  }


  const ref = useRef<HTMLAudioElement>(null)

  return <>

    <div className="w-full h-full">
      <audio autoPlay muted ref={ref}>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={() => { clickHandler() }} className={`z-50 ${time == "Night" ? "border-white fill-white" : "border-black fill-black"} absolute bottom-8 right-8 border rounded-full p-4`}>
        {muted ? audioSVG : stopSVG}
      </button>
    </div>
  </>
}