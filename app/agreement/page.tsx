import {Box, Flex, Heading, ScrollArea, Text} from "@radix-ui/themes";
import React from "react";

export default function Home() {

  return (
    <Flex direction="column" justify="between" width="auto" height="100%">
      <ScrollArea type="auto" scrollbars="vertical">
      <Box className="text-white">
        <Heading size="4" my="2" trim="start">
          Portrait License Agreement
        </Heading>
        <Flex direction="column">
          <Text as="p" size="3" mb="4">
            This agreement is signed by the following parties:
          </Text>
          <Text as="p" size="3" mb="4">
            Portrait Rights Holder: User: SENIX
          </Text>
          <Text as="p" size="3" mb="4">
            1. Grant of use: The owner of the likeness agrees and authorizes the user to use his/her likeness in the following cases: [use of the winning communication of the SENIX Sweepstakes]
          </Text>
          <Text as="p" size="3" mb="4">
            2. Scope of Use: The Licensee may use the Image only for the following purposes: [advertising campaigns, promotional materials, social media, etc.]
          </Text>
          <Text as="p" size="3" mb="4">
            3. Term of Use: The term of use for this agreement is [1 year].
          </Text>
          <Text as="p" size="3" mb="4">
            4. Compensation: For the use of the Image under this Agreement, the Imageholder grants SENIX the right to use his/her Image without compensation in the event of an award.
          </Text>
          <Text as="p" size="3" mb="4">
            5. Other terms and conditions: The portrait right shall not be used in the process of using the portrait right for acts detrimental to the person concerned, or for acts against the law and morality.
          </Text>
          <Text as="p" size="3" mb="4">
            6. Entry into force and signing: This agreement shall enter into force on the date of signing by both parties. Both parties acknowledge that they have fully understood and agreed to all the terms and conditions of this Agreement.
          </Text>
        </Flex>
      </Box>
      <Box className="text-white">
        <Heading size="4" my="2" trim="start">
          Lottery Rules
        </Heading>
        <Flex direction="column">
          <Text as="p" size="3" mb="4">
            1.One machine corresponds to one product number and is entitled to one lottery entry.
          </Text>
          <Text as="p" size="3" mb="4">
            2.The campaign is limited to products purchased through regular distribution and authorized sales channels. Those who fail to provide proof of purchase will be refused redemption.
          </Text>
          <Text as="p" size="3" mb="4">
            3.In the event of force majeure or change of circumstances (including major disaster events, government orders to stop or adjust the event, serious cyber-attacks, system failures, etc.), we have the right to terminate the event without compensation or reimbursement to the user.
          </Text>
          <Text as="p" size="3" mb="4">
            4.If users engage in cheating or other illegal activities during the event, we have the right to revoke their participation and disqualify them from using rewards. We also reserve the right to withdraw any rights and benefits obtained.
          </Text>
          <Text as="p" size="3" mb="4">
            5.The personal information entered when logging into the lottery app will be used solely for the purpose of the lottery. We will strictly protect customer privacy, and by participating and logging into the lottery app, customers are deemed to have accepted this clause.
          </Text>
          <Text as="p" size="3" mb="4">
            6.Prizes must be claimed as set out and cannot be redeemed for cash or substituted. Prizes, or any unused portion, are non-refundable, non-transferable, non-exchangeable, and non-convertible to cash.
          </Text>
          <Text as="p" size="3" mb="4">
            7.Winners who do not redeem their prizes during the campaign period cannot redeem them later.
          </Text>
          <Text as="p" size="3" mb="4">
            8.Any other violation of the lottery rules will result in a denial of redemption.
          </Text>
          <Text as="p" size="3" mb="4">
            9.In the event of a return or exchange, the prize must be returned. Exchanges will allow you to keep the prize, but you will not be allowed to participate in the lottery again, subject to the rules and regulations of the local General Agent.
          </Text>
          <Text as="p" size="3" mb="4">
            10.By agreeing to the lottery rules, you automatically grant permission for the use of your likeness.
          </Text>
          <Text as="p" size="3" mb="4">
            a. Grant of Use: The image owner agrees and authorizes the user to use his/her likeness for the following purposes: [use in the winning communication of the SENIX Sweepstakes].
          </Text>
          <Text as="p" size="3" mb="4">
            b.Scope of Use: The Licensee may use the image only for the following purposes: [advertising campaigns, promotional materials, social media, etc.].
          </Text>
          <Text as="p" size="3" mb="4">
            c.Term of Use: The term of this agreement is [1 year].
          </Text>
          <Text as="p" size="3" mb="4">
            d.Compensation: The image owner grants SENIX the right to use his/her image without compensation in the event of an award.
          </Text>
          <Text as="p" size="3" mb="4">
            e.Other Terms and Conditions: The portrait right shall not be used in any manner detrimental to the person concerned, or for any act against the law and morality.
          </Text>
          <Text as="p" size="3" mb="4">
            f.Entry into Force and Signing: This agreement shall enter into force on the date of signing by both parties. Both parties acknowledge that they have fully understood and agreed to all the terms and conditions of this agreement.
          </Text>
        </Flex>
      </Box>
      </ScrollArea>
    </Flex>
  )
}