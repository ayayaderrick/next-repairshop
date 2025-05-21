"use client";

import {
  insertCustomerSchema,
  insertCustomerSchemaType,
  selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { StatesArray } from "@/constants/StatesArray";

type Props = {
  customer?: selectCustomerSchemaType;
};

const CustomerForm = ({ customer }: Props) => {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const submitForm = async (data: insertCustomerSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div className="mt-2 mb-4">
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            <div className="flex justify-between items-center gap-2">
              <Button
                type="submit"
                // className="w-3/4"
                className="cursor-pointer"
                variant={"default"}
                title="Save"
              >
                Save Details
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                className="cursor-pointer"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                }}
              >
                Reset Form
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
