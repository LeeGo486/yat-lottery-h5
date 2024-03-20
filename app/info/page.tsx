import {Flex} from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column" justify="between" width="auto" height="100%">
      <Flex align="center" justify="center" width="100%" height="9" mt="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>

      <Flex grow="1" direction="column" align="center" justify="center" width="100%">

      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <a href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</a>
      </Flex>
    </Flex>
  )
}