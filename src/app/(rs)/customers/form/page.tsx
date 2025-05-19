import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";

const customerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId } = await searchParams;

    //Edit customr form
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

      console.log(customer);

      //Put customer form component
      return <CustomerForm customer={customer} />;
    } else {
      //New customer form component
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default customerFormPage;
