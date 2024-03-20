
import { Callout } from '@radix-ui/themes'
import {ExclamationTriangleIcon} from '@radix-ui/react-icons'
import Link from "next/link";
export default function Home() {
  return (
    <Callout.Root color="yellow" variant="soft">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text color="indigo" weight="medium">
        Each serial number can only be drawn once.
      </Callout.Text>
    </Callout.Root>
  )
}