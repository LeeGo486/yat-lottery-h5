'use client'

import {Box, Flex, Strong, Text} from "@radix-ui/themes";
import Link from "next/link";
export default function Home() {
  return (
    <Flex width="100%" height="100%" align="center" justify="between" direction="column">
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <Flex direction="column" align="center" justify="between"
          className="w-80 h-40 border-4 rounded-xl border-[rgb(var(--background-senix-orange-rgb))] bg-white p-">
          <Text weight="medium" size="5">The raffle has ended</Text>
          <Text weight="regular" size="4">You will be redirected to the official website in 10 seconds.</Text>
        </Flex>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <Link href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</Link>
      </Flex>
    </Flex>
  )
}