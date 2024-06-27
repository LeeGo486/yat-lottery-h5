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
    fontSize: number
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
  onEndGame: (prize: Prize | undefined) => void;
}

async function fetchLotteryItems() {
  try {
    const res= await fetch('https://api.lottery.yat.com/activity/getGoods?uuid=decc3f33-e8e8-415d-952b-5f8defe4f48c', {
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
    const res= await fetch('https://api.lottery.yat.com/activity/lottery', {
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
              fontWeight: 400,
              fontSize: 15,
              top: 20
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

  const getPrize = (id: number) => {
    return prizes.find((p, i) => {
      if (p.fonts[0].id === id) {
        return p
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
        width="20rem"
        height="20rem"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        defaultConfig={{gutter: 4.5}}
        onStart={() => {

          if (!canPlay) {return;}

          // @ts-ignore
          myLucky.current?.play()

          handlePlayGame(myLucky).then(res=> {
            setTimeout((res) => {
              if(res?.code === 200) {
                // @ts-ignore
                myLucky.current?.stop(getLotteryIndex(res.data.id))
              } else if (res?.code === 401) {
                // @ts-ignore
                onEndGame(getPrize(res?.data.message.id));
                // @ts-ignore
                myLucky.current?.init()
              }
              else {
                // @ts-ignore
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