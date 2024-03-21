'use client'

import Lottery, {Prize} from './lottery'
import {useState} from "react";
import {Flex, Text} from "@radix-ui/themes";
import { useRouter } from 'next/navigation'
export default function Home() {

  const router = useRouter()

  const [prizes] = useState([
    { background: '#EEEFEF', range: 10, fonts: [{ text: '电链锯', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 10, fonts: [{ text: '割草机', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#EEEFEF', range: 60, fonts: [{ text: '1个亿', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 10, fonts: [{ text: '旋耕机', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#EEEFEF', range: 10, fonts: [{ text: '护目镜', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
    { background: '#FFFFFF', range: 10, fonts: [{ text: '电剪刀', fontColor: '#4A6E85', fontWeight: 700, top: 10 }] },
  ])

  const [canPlay, setCanPlay] = useState(true)
  const [isWin, setIsWin] = useState(false)

  const handlePrize = (prize: Prize) => {
    if (prize) {
      const font = prize.fonts[0]
      font && setIsWin(true)
      font && setCanPlay(false)

      router.push('/prize')
    }
  }

  const [prize, setPrize] = useState<Prize | null>(null);

  return (
    <Flex width="100%" height="100%" direction="column">
      <Flex width="100%" height="9" align="center" justify="center">
      </Flex>
      <Flex width="100%" height="9" align="center" justify="center" mt="1">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" width="100%" direction="column" align="center" justify="center">
        <Lottery prizes={prizes} canPlay={canPlay} onEndGame={handlePrize}/>
        <Text weight="medium" size="5" className="text-slate-50" mt="1">Click Go to start</Text>
      </Flex>
      <Flex width="100%" height="9" align="center" justify="center">
        <a href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</a>
      </Flex>
    </Flex>
  )
}