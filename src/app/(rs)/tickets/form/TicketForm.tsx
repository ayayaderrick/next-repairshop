"use client";

import CheckboxWithLabel from "@/components/inputs/CheckboxWithLabel";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  insertTicketSchema,
  insertTicketSchemaType,
  selectTicketSchemaType,
} from "@/zod-schemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";
import { useEffect, useState } from "react";

type Props = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
  techs?: { id: string; description: string }[];
  isEditable?: boolean;
  isManager?: boolean | undefined;
};

const TicketForm = ({
  customer,
  ticket,
  techs,
  isEditable = true,
  isManager = false,
}: Props) => {
  const [showResponse, setShowResponse] = useState(false);

  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer?.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      toast.success("Success!", {
        description: data?.message,
      });
    },
    onError({ error }) {
      toast.error("Error!", {
        description: error?.serverError || "An error occurred while saving.",
      });
    },
  });

  const submitForm = async (data: insertTicketSchemaType) => {
    // console.log(data);
    executeSave(data);
  };

  useEffect(() => {
    if (saveResult) {
      setShowResponse(true);
      const timer = setTimeout(() => setShowResponse(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [saveResult]);

  return (
    <div className="w-full flex flex-col gap-1 sm:px-8">
      {showResponse && <DisplayServerActionResponse result={saveResult} />}
      <div className="mt-2 mb-4">
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Edit Ticket #${ticket.id}`
            : ticket?.id
            ? `View Ticket #${ticket.id}`
            : "New Ticket Form"}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />

            {isManager && techs ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech ID"
                nameInSchema="tech"
                data={[
                  {
                    id: "new-ticket@example.com",
                    description: "new-ticket@example.com",
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 && <p>{customer.address2}</p>}
              <p>
                {customer.city}, {customer.state}, {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className="flex justify-between items-center gap-2">
                <Button
                  type="submit"
                  // className="w-3/4"
                  className="cursor-pointer"
                  variant={"default"}
                  title="Save Details"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Saving
                    </>
                  ) : (
                    "Save Details"
                  )}
                </Button>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="cursor-pointer"
                  title="Reset Form"
                  onClick={() => {
                    {
                      form.reset(defaultValues);
                      resetSaveAction();
                    }
                  }}
                >
                  Reset Form
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
