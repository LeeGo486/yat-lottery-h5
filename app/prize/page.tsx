'use client'
import {Flex, Strong, Text} from "@radix-ui/themes";
import './page.css'
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Home() {

  const [name, setName] = useState('')
  const [priceCode,  setPriceCode] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    setName(searchParams.get('name') || '')
    setPriceCode(searchParams.get('priceCode') || '')
  }, [])

  return (
    <Flex width="100%" height="100%" align="center" justify="between" direction="column" className="bg-[url('/prize-bg.jpg')] bg-cover bg-center" >
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <Text size="5" weight="medium" as="p" color="orange" mb="5" >Prize: <Strong>{name}</Strong></Text>
        <Text size="5" weight="medium" as="p" color="orange" mb="5" >Code: <Strong>{priceCode}</Strong></Text>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <Link href="https://sa.senix.co" className="text-slate-50 text-xl">sa.senix.co</Link>
      </Flex>
    </Flex>
  )
}