'use client'
import React, { useState, useRef } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'

export interface Prize {
  background: string;
  range: number;
  fonts: {
    text: string;
    fontColor: string;
    fontWeight: number;
    top: number;
  }[];
}
interface HomeProps {
  prizes: Prize[];
  onEndGame: (prize: Prize) => void;
  canPlay: boolean;
}

export default function Home({prizes, canPlay, onEndGame}: HomeProps) {

  const [blocks] = useState([
    { padding: '10px', background: '#E24912' }
  ])
  const [buttons] = useState([
    { radius: '40%', background: '#E04307' },
    { radius: '35%', background: '#afc8ff' },
    { radius: '30%', background: '#44687D', pointer: true,
      fonts: [{ text: 'Go', top: -10, fontColor: '#afc8ff', fontWeight: 800 }],
    }
  ])
  const myLucky = useRef()
  return (
    <div>
      <LuckyWheel
        ref={myLucky}
        width="20rem"
        height="20rem"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        defaultConfig={{gutter: 1}}
        onStart={() => {
          if (!canPlay) { return; }
          // @ts-ignore
          myLucky.current.play()
          setTimeout(() => {
            // @ts-ignore
            myLucky.current.stop()
          }, 2500)
        }}
        onEnd={(prize: Prize) => {
          onEndGame(prize);
        }}
      />
    </div>
  )
}