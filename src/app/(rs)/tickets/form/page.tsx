import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { Users, init as kindeInit } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId)
    return { title: "Missing Ticket ID or Customer ID" };

  if (customerId) return { title: `New Ticket for Customer #${customerId}` };

  if (ticketId) return { title: `Edit Ticket #${ticketId}` };
};

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

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;

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
      if (isManager) {
        kindeInit(); //Initializes the kinde management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users
              .filter((user) => typeof user.email === "string")
              .map((user) => ({
                id: user.email!.toLowerCase(),
                description: user.email!.toLowerCase(),
              }))
          : [];

        return (
          <TicketForm customer={customer} techs={techs} isManager={isManager} />
        );
      } else {
        return <TicketForm customer={customer} />;
      }
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
      if (isManager) {
        kindeInit(); //Initializes the kinde management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            techs={techs}
            isManager={isManager}
          />
        );
      } else {
        const isEditable =
          !!user?.email &&
          user.email.toLowerCase() === ticket.tech.toLowerCase();
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default ticketFormPage;
