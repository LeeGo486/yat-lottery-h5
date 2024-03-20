import {Flex, Strong, Text} from "@radix-ui/themes";
import './page.css'

export default function Home() {
  return (
    <Flex width="100%" height="100%" align="center" justify="center" direction="column" className="bg-[url('/prize-bg.jpg')] bg-cover bg-center" >
      <Text size="5" weight="medium" as="p" color="orange" ><Strong>电链锯</Strong></Text>
    </Flex>
  )
}