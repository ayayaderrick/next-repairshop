import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Search Tickets",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) {
    //query default results
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No results found.</p>
        )}
      </>
    );
  }

  //query search results
  const results = await getTicketSearchResults(searchText);

  //return search results
  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </>
  );
};

export default Tickets;
