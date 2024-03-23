'use client'

import {Flex} from "@radix-ui/themes";
import Link from "next/link";
import Form from "./form/page";
import {FormEvent} from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const code = formData.get('code') as string
    const customer = formData.get('customer') as string
    const phone = formData.get('phone') as string
    console.info(`code: ${code}, customer: ${customer}, phone: ${phone}`)

    router.push('/lottery')
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