'use client'
import Lottery, {Prize} from './lottery'
import {useState} from "react";
import {Flex, Text} from "@radix-ui/themes";
import { useRouter, useSearchParams } from 'next/navigation'

type Param = {
  uuid: string
  phone: string
  user: string
  sn: string
  ip: string
  isAgreed: number
}

export default function Home() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const [canPlay, setCanPlay] = useState(true)
  const [isWin, setIsWin] = useState(false)

  const param: Param = {
    uuid: searchParams.get('uuid') || '',
    phone: searchParams.get('phone') || '',
    user: searchParams.get('user') || '',
    sn: searchParams.get('sn') || '',
    ip: searchParams.get('ip') || '',
    isAgreed: searchParams.get('isAgreed' || false)? 1: 0,
  }
  const handleEndGame = (prize: Prize | undefined) => {
    if (prize) {
      const prizeUrl = new URLSearchParams()
      if(prize) {
        prize && setIsWin(true)
        prize && setCanPlay(false)
        prizeUrl.set('id', String(prize.id))
        prizeUrl.set('name', prize.goodsName)
        prizeUrl.set('priceCode', prize.serialCode)
        router.push(`/prize?${prizeUrl.toString()}`)
      }
    }
  }

  return (
    <Flex width="100%" height="100%" direction="column">
      <Flex width="100%" height="9" align="center" justify="center">
      </Flex>
      <Flex width="100%" height="9" align="center" justify="center" mt="1">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" width="100%" direction="column" align="center" justify="center">
        <Lottery param={param} canPlay={canPlay} onEndGame={handleEndGame}/>
        <Text weight="medium" size="5" className="text-slate-50" mt="2">Click Go to start</Text>
      </Flex>
      <Flex width="100%" height="9" align="center" justify="center">
        <a href="https://sa.senix.co" className="text-slate-50 text-xl">sa.senix.co</a>
      </Flex>
    </Flex>
  )
}