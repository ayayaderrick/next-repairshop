import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";

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
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  //query search results
  const results = await getTicketSearchResults(searchText);

  //return search results
  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Tickets;
