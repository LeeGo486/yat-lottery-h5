'use client'

import Lottery, {Prize} from './lottery'
import Callout from './callout'
import {useState} from "react";
export default function Home() {

  const [prizes] = useState([
    { background: '#EEEFEF', range: 10, fonts: [{ text: '电链锯', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 20, fonts: [{ text: '割草机', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#EEEFEF', range: 10, fonts: [{ text: '修枝剪', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 10, fonts: [{ text: '4', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#EEEFEF', range: 10, fonts: [{ text: '5', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 10, fonts: [{ text: '6', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
  ])

  const [canPlay, setCanPlay] = useState(true)
  const [isWin, setIsWin] = useState(false)
  const [prizeName, setPrizeName] = useState('')

  const handlePrize = (prize: Prize) => {
    if (prize) {
      const font = prize.fonts[0]
      font && setIsWin(true)
      font && setPrizeName(font.text)
      font && setCanPlay(false)
    }
  }

  const [prize, setPrize] = useState<Prize | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Callout />
      <div className="w-full order-1 flex items-center justify-center mt-20">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </div>
      <div className="w-full order-2 flex flex-col items-center justify-center">
        <Lottery prizes = { prizes } canPlay={canPlay} onEndGame={handlePrize} />
        <p className="mt-5 text-xl text-slate-50">{isWin? 'Congratulations on winning：' + prizeName: 'Click Go to start'}</p>
        {isWin && <button className="flex justify-center items-center drop-shadow-lg mt-8
          w-48 h-14 bg-[rgb(var(--background-senix-orange-rgb))] border-0 rounded-md
          text-slate-100 font-sans font-bold text-xl italic uppercase
          ">receive rewards</button>}
      </div>

      <div className="order-last flex items-center justify-center">
        <a href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</a>
      </div>
    </div>
  )
}