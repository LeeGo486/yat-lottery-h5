import {Flex, Strong, Text} from "@radix-ui/themes";
import './page.css'
import Link from "next/link";

export default function Home() {
  return (
    <Flex width="100%" height="100%" align="center" justify="between" direction="column" className="bg-[url('/prize-bg.jpg')] bg-cover bg-center" >
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>
      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <Text size="5" weight="medium" as="p" color="orange" mb="5" ><Strong>电链锯</Strong></Text>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <Link href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</Link>
      </Flex>
    </Flex>
  )
}