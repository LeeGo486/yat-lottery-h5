import Link from "next/link";
import {Flex} from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" justify="between" width="auto" height="100%">
      <Flex align="center" justify="center" width="100%" height="9">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </Flex>

      <Flex grow="1" direction="column" align="center" justify="center" width="100%">
        <img src="/welcome.png" alt="senix welcome image"/>
        <Link href={"/lottery"} className="flex justify-center items-center drop-shadow-lg mt-3
          w-48 h-14 bg-[rgb(var(--background-senix-orange-rgb))] border-0 rounded-md">
          <span className="text-slate-100 font-sans font-bold text-xl italic uppercase">Lucky draw</span></Link>
      </Flex>

      <Flex align="center" justify="center" width="100%" height="9">
        <a href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</a>
      </Flex>
    </Flex>
  )
}