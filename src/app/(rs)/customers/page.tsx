import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";
// import * as Sentry from "@sentry/nextjs";

export const metadata = {
  title: "Search Customers",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  //query database
  const results = await getCustomerSearchResults(searchText);

  //return results
  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </>
  );
};

export default Customers;
