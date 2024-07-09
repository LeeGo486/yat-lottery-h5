'use client'
import {Flex, Callout, Checkbox} from "@radix-ui/themes";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons"
import Link from "next/link";
import Form from "./form/page";
import {FormEvent, useState} from "react";
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
  city: string
  career: string
  isAgreed: number
}

async function isActiveLottery() {
  try {
    const res= await fetch('https://api.lottery.yat.com/activity/isEffective?uuid=decc3f33-e8e8-415d-952b-5f8defe4f48c', {
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
    const res= await fetch('https://api.lottery.yat.com/activity/check', {
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
  const [isFaulted, setIsFaulted] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)

  const isEnd = () => {
    isActiveLottery().then((resp: Resp | undefined ) => {
      if(resp?.data) {
        const code = resp.code

        if (code !== 200) {
          console.info(JSON.stringify(resp?.data))
          router.push('/end')
        }
      } else {
        router.push('/end')
      }
    })
  }

  const setChecked = ((prevIsChecked: boolean) => setIsAgreed(prevIsChecked))
  const linkTerms = () => {
    console.info(111)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    isEnd() // check lottery is end.

    const formData = new FormData(event.currentTarget)
    const code = formData.get('code') as string
    const customer = formData.get('customer') as string
    const phone = formData.get('phone') as string
    const career = formData.get('career') as string
    const city = formData.get('city') as string
    const lotteryParam = new URLSearchParams();
    const prizeParam = new URLSearchParams();

    const param: Param = {
      uuid: 'decc3f33-e8e8-415d-952b-5f8defe4f48c',
      phone: phone,
      sn: code,
      city: city,
      career: career,
      user: customer,
      isAgreed: isAgreed? 0:1
    }

    lotteryParam.set('uuid', 'decc3f33-e8e8-415d-952b-5f8defe4f48c');
    lotteryParam.set('city', city);
    lotteryParam.set('user', customer);
    lotteryParam.set('phone', phone);
    lotteryParam.set('sn', code);
    lotteryParam.set('career', '');


    createInfo(param).then((resp: Resp) => {
      const code = resp.code
      const data = resp.data

      // 1登记成功参与抽奖 2已经抽奖 3填写信息不符规则
      if(code === 200) {
        if (data.code === 1) {
          router.push(`/lottery?${lotteryParam.toString()}`)
        } else if (data.code === 2) {
          prizeParam.set('id', data.message.id.toString())
          prizeParam.set('name', data.message.goodsName)
          prizeParam.set('priceCode', data.message.goodsName)
          router.push(`/prize?${prizeParam.toString()}`)
        } else if (data.code === 3) {
          const message = data.message
          setIsFaulted(true)
          // @ts-ignore
          setErrMsg(message)
        }
      } else if (code === 400) {
        alert(data.message)
      }
    })
  }

  return (
    <Flex direction="column" justify="between" width="auto" height="100%">

      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>

      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        {
          isFaulted &&
          <Callout.Root color="red" role="alert" className="bg-orange-600">
              <Callout.Icon>
                  <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>{errMsg}</Callout.Text>
          </Callout.Root>
        }

        <Form onSubmit={handleSubmit} />

        <Flex align="center" justify="center" width="100%"  className="mt-4">
          <Checkbox checked={isAgreed} onCheckedChange={setChecked} />
          <Link href="/agreement" onClick={linkTerms} color="indigo" className="text-white border-b-2 ml-4">Agree to Terms and Conditions</Link>
        </Flex>
      </Flex>
      <Flex align="center" justify="center" width="100%" height="9" mt="1">
        <Link href="https://sa.senix.co" className="text-slate-50 text-xl">sa.senix.co</Link>
      </Flex>
    </Flex>
  )
}