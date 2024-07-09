'use client'

import * as Form from '@radix-ui/react-form';
import {Component, FormEvent } from "react";
import {Checkbox, Flex, Text} from '@radix-ui/themes'

interface HomeProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
// @ts-ignore
export default class Home extends Component<HomeProps> {
  render() {
    let {onSubmit} = this.props;

    return (
      <Form.Root className="w-full" onSubmit={(event) => {
        onSubmit(event)
      }}>
        <Form.Field className="grid mb-[10px]" name="city">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Your Country
            </Form.Label>
          </div>
          <Form.Control asChild>
            <select defaultValue={'Philippines'}
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-auto items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none">
              <option value="Philippines">Philippines</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Indonesia">Indonesia</option>
            </select>
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="customer">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Your Name
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="phone">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Phone Number
            </Form.Label>
            <Form.Message className="text-[13px] text-[rgb(var(--background-senix-orange-rgb))] opacity-[0.8]"
                          match="valueMissing">
              Please enter your phone number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="code">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">SN Code</Form.Label>
            <Form.Message className="text-[13px] text-[rgb(var(--background-senix-orange-rgb))]" match="valueMissing">
              Please enter your SN Code
            </Form.Message>
            <Form.Message className="text-[13px] text-[rgb(var(--background-senix-orange-rgb))]" match="typeMismatch">
              Please enter your Phone Number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="phone"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            className="box-border w-full text-white shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[rgb(var(--background-senix-orange-rgb))] px-[15px] font-medium leading-none shadow-[0_2px_10px] mt-[10px]">
            Lucky draw
          </button>
        </Form.Submit>
      </Form.Root>
    )
  }
};