'use client'
import {Box, Flex, Strong, Text} from "@radix-ui/themes";
import Link from "next/link";
import {useEffect, useState} from "react";
export default function Home() {

  const [second, setSecond] = useState(10)

  useEffect(() => {
    // if(second > 0) {
    //   const timerId = setTimeout(() => {
    //     setSecond(second - 1);
    //   }, 1000);
    //   return () => clearTimeout(timerId);
    // } else {
    //   window.location.href = 'https://sa.senix.co'
    // }
  },[second])
  return (
    <Flex width="100%" height="100%" align="center" justify="between" direction="column">
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <Flex direction="column" align="center" justify="start"
          className="w-80 h-40 border-4 rounded-xl border-[rgb(var(--background-senix-orange-rgb))] bg-white">
          <Box className="mt-4">
            <Text weight="medium" size="5" className="text-orange-600">The lottery has ended</Text>
          </Box>
          <Box className="mt-2 px-2">
            <Text weight="regular" size="3" className="px-2">You will be redirected to the official website in
              <Text weight="regular" size="3" className="text-orange-600 pl-1">{second} </Text> seconds.
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <Link href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</Link>
      </Flex>
    </Flex>
  )
}