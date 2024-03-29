'use client'
import { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'

export interface Prize {
  background: string;
  range: number;
  fonts: {
    id: number
    text: string
    fontColor: string
    fontWeight: number
    top: number
  }[];
  imgs: {
    src: string
    top: number
    width: string
    height: string
  }[]
}

type PrizesResp = {
  code: number
  message: string
  data: [Goods]
}

type luckyResp = {
  code: number
  message: string
  data: Goods
}

type Goods = {
  id: number
  goodsName: string
  url: string
}

type Param = {
  uuid: string
  phone: string
  user: string
  sn: string
  ip: string
}

interface HomeProps {
  param: Param;
  canPlay: boolean;
  onEndGame: (prize: Prize) => void;
}

async function fetchLotteryItems() {
  try {
    const res= await fetch('http://192.168.177.13:9987/activity/getGoods?uuid=decc3f33-e8e8-415d-952b-5f8defe4f48c', {
      method: 'GET'
    })
    const resp: PrizesResp = await res.json()
    return resp
  } catch (e) {
    console.error(`check is fault. error is ${JSON.stringify(e)}`)
  }
}

async function getLotteryPrize(param: Param) {
  try {
    const res= await fetch('http://192.168.177.13:9987/activity/lottery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    })
    const resp: luckyResp = await res.json()
    return resp
  } catch (e) {
    console.error(`check is fault. error is ${JSON.stringify(e)}`)
  }
}

export default function Home({param, canPlay, onEndGame}: HomeProps) {
  const [prizes,setPrizes] = useState<Prize[]>([])
  const myLucky = useRef()

  useEffect(() => {
    fetchLotteryItems().then(res => {
      const prizes: Prize[] = []
      if (res?.code === 200) {
        const goods = res.data
        goods.map((g, i) => {
          let bgColor = (i%2 ===0)? '#EEEFEF': '#FFFFFF'

          const prize: Prize = {
            background: bgColor,
            range: 0,
            fonts: [{
              id: g.id,
              text: g.goodsName,
              fontColor: '#4A6E85',
              fontWeight: 700,
              top: 10
            }],
            imgs: []
          }
          prizes.push(prize)
        })
        setPrizes(prizes);
      }
    })
  }, [])

  const handlePlayGame = async (ref: any) => {
    return getLotteryPrize(param)
  }

  const getLotteryIndex = (id: number) => {
    return prizes.findIndex((p, i) => {
      if (p.fonts[0].id === id) {
        return i
      }
    })
  }

  const [blocks] = useState([
    { padding: '10px', background: '#E24912' }
  ])
  const [buttons] = useState([
    { radius: '40%', background: '#E04307' },
    { radius: '35%', background: '#afc8ff' },
    { radius: '30%', background: '#44687D', pointer: true, fonts: [{ text: 'Go', top: -10, fontColor: '#afc8ff', fontWeight: 800 }],
    }
  ])

  return (
    <div>
      <LuckyWheel
        ref={myLucky}
        width="19rem"
        height="19rem"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        defaultConfig={{gutter: 1}}
        onStart={() => {

          if (!canPlay) {return;}
          myLucky.current?.play()

          handlePlayGame(myLucky).then(res=> {
            setTimeout((res) => {
              if(res?.code === 200) {
                myLucky.current?.stop(getLotteryIndex(res.data.id))
              } else {
                myLucky.current?.init()
              }
            }, 2500, res)
          })
        }}
        onEnd={(prize: Prize) => {
          onEndGame(prize);
        }}
      />
    </div>
  )
}