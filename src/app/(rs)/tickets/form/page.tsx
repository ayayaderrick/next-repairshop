import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";

const ticketFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId, ticketId } = await searchParams;

    //Edit ticket form
    if (!customerId && !ticketId) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-2">Customer ID or Ticket ID required.</h2>
          <BackButton
            title="Back"
            variant={"default"}
            className="cursor-pointer"
          />
        </div>
      );
    }

    //New ticket
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found.
            </h2>
            <BackButton
              title="Back"
              variant={"default"}
              className="cursor-pointer"
            />
          </div>
        );
      }

      if (!customer.active) {
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active.
            </h2>
            <BackButton
              title="Back"
              variant={"default"}
              className="cursor-pointer"
            />
          </div>
        );
      }

      //return ticket form
      console.log(customer);
    }

    //Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found.</h2>
            <BackButton
              title="Back"
              variant={"default"}
              className="cursor-pointer"
            />
          </div>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      //return ticket form
      console.log("Ticket: ", ticket);
      console.log("Customer: ", customer);
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default ticketFormPage;
