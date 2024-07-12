'use client'
import { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'


export interface Prize {
  goodsName: string,
  serialCode: string,
  id: number,
  goodNum: number
}

type Goods = {
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
  data: [GoodsItem]
}

type luckyResp = {
  code: number
  message: string
  data: GoodsItem
}

type GoodsItem = {
  id: number
  goodsName: string
  serialCode: string
  url: string
}

type Param = {
  uuid: string
  phone: string
  isAgreed: number
  user: string
  sn: string
  ip: string
}

interface HomeProps {
  param: Param;
  canPlay: boolean;
  onEndGame: (p: Prize | undefined) => void;
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
  const [goodsItems,setGoodsItems] = useState<Goods[]>([])
  const [serialCode, setSerialCode] = useState<string>('')
  const myLucky = useRef()

  useEffect(() => {
    fetchLotteryItems().then(res => {
      const prizeItems: Goods[] = []
      if (res?.code === 200) {
        const goods = res.data
        goods.map((g, i) => {
          let bgColor = (i%2 ===0)? '#EEEFEF': '#FFFFFF'
          const item: Goods = {
            background: bgColor,
            range: 0,
            fonts: [{
              id: g.id,
              text: g.goodsName,
              fontColor: g.goodsName === 'cash'? '#E04307': '#4A6E85',
              fontWeight: g.goodsName === 'cash'? 800: 400,
              fontSize: g.goodsName === 'cash'?  18 :15,
              top: 20
            }],
            imgs: []
          }
          prizeItems.push(item)
        })
        setGoodsItems(prizeItems);
      }
    })
  }, [])

  const handlePlayGame = async (ref: any) => {
    return getLotteryPrize(param)
  }

  const getLotteryIndex = (id: number, isIndex= false) => {

    const idx = goodsItems.findIndex((p, i) => {
      if (p.fonts[0].id === id) {
        return i
      }
    })

    const gds = goodsItems.find((p, i) => {
      if (p.fonts[0].id === id) {
        return p
      }
    })

    return isIndex? idx: gds
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
        prizes={goodsItems}
        buttons={buttons}
        defaultConfig={{gutter: 4.5}}
        onStart={() => {

          if (!canPlay) {return;}

          // @ts-ignore
          myLucky.current?.play()

          handlePlayGame(myLucky).then(res=> {

            setTimeout((res) => {
              if(res?.code === 200) {
                setSerialCode(res.data.serialCode)
                // @ts-ignore
                myLucky.current?.stop(getLotteryIndex(res.data.id, true))
              } else if (res?.code === 401) {

                // @ts-ignore
                setSerialCode(res?.data.message.serialCode)
                // @ts-ignore
                const g:GoodsItem = getLotteryIndex(res?.data.message.id);
                const p: Prize =  {
                  // @ts-ignore
                  id: g.fonts[0].id,
                  // @ts-ignore
                  goodsName: g.fonts[0].text,
                  // @ts-ignore
                  serialCode: res?.data.message.serialCode,
                  goodNum: 0
                };
                onEndGame(p);
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
        onEnd={(g : Goods) => {
          if (Object.keys(g).length === 0){ return false}

          const p: Prize =  {
            id: g.fonts[0].id,
            goodsName: g.fonts[0].text,
            serialCode: serialCode,
            goodNum: 0
          };
          onEndGame(p);
        }}
      />
    </div>
  )
}