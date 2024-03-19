
import { Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
export default function Home() {
  return (
    <Callout.Root>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        You will need admin privileges to install and access this application.
      </Callout.Text>
    </Callout.Root>
  )
}