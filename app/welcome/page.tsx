'use client'
import Link from "next/link";
import {Flex} from "@radix-ui/themes";
import {useRouter} from "next/navigation";

type Resp = {
  code: number
  message: string
  data: string
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

export default function Home() {
  const router = useRouter()
  const handleStart = async () => {
    isActiveLottery().then((resp: Resp | undefined ) => {
      if(resp && resp.data === 'Y') {
        router.push('/info')
      } else {
        router.push('/end')
      }
    })
  }

  return (
    <Flex direction="column" justify="between" width="auto" height="100%">
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>

      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <img src="/welcome.png" alt="senix welcome image"/>
        <Link href="/" onClick={() => handleStart()} className="flex justify-center items-center drop-shadow-lg mt-3
          w-48 h-14 bg-[rgb(var(--background-senix-orange-rgb))] border-0 rounded-md">
          <span className="text-slate-100 font-sans font-bold text-xl italic uppercase">Start</span>
        </Link>
    </Flex>

  <Flex align="center" justify="center" width="100%" height="9">
  <Link href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</Link>
      </Flex>
    </Flex>
  )
}