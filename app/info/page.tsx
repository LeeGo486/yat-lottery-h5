'use client'
import {Flex} from "@radix-ui/themes";
import Link from "next/link";
import Form from "./form/page";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";

type Resp = {
  code: number
  message: string
  data: Data
}

type Data = {
  code: number
  message: Goods
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
}

async function isActiveLottery() {
  try {
    const res= await fetch('http://api.lottery.yat.com/activity/isEffective?uuid=decc3f33-e8e8-415d-952b-5f8defe4f48c', {
      method: 'GET'
    })
    const resp: Resp = await res.json()
    return resp
  } catch (e) {
    console.error(`check is fault. error is ${JSON.stringify(e)}`)
  }
}

async function createInfo(param: Param) {
  let resp: Resp = {code: 500, message: 'service error.', data: {code: 0, message: { id: 0, goodsName: '', url: ''}}}

  try {
    const res= await fetch('http://api.lottery.yat.com/activity/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param)
    })
    resp = await res.json()

  } catch (e) {
    console.error(`check is fault. error is ${JSON.stringify(e)}`)
  }
  return resp
}



export default function Home() {
  const router = useRouter()
  const isEnd = () => {
    isActiveLottery().then((resp: Resp | undefined ) => {
      if(resp?.data) {
        router.push('/end')
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    isEnd() // check lottery is end.

    const formData = new FormData(event.currentTarget)
    const code = formData.get('code') as string
    const customer = formData.get('customer') as string
    const phone = formData.get('phone') as string
    const lotteryParam = new URLSearchParams();
    const prizeParam = new URLSearchParams();
    const param: Param = {
      uuid: 'decc3f33-e8e8-415d-952b-5f8defe4f48c',
      phone: phone,
      sn: code,
      user: customer
    }

    lotteryParam.set('uuid', 'decc3f33-e8e8-415d-952b-5f8defe4f48c');
    lotteryParam.set('phone', phone);
    lotteryParam.set('sn', code);
    lotteryParam.set('user', customer);

    createInfo(param).then((resp: Resp) => {
      const code = resp.code
      const data = resp.data
      if(code === 200) {
        if (data.code === 1) {
          router.push(`/lottery?${lotteryParam.toString()}`)
        } else if (data.code === 2) {
          prizeParam.set('id', data.message.id.toString())
          prizeParam.set('name', data.message.goodsName)
          router.push(`/prize?${prizeParam.toString()}`)
        }
      } else {}
    })
  }

  return (
    <Flex direction="column" justify="between" width="auto" height="100%">
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>

      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <Form  onSubmit={handleSubmit}/>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <Link href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</Link>
      </Flex>
    </Flex>
  )
}