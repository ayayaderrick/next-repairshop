import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

const TicketSearch = () => {
  return (
    <Form action={"/tickets"} className="flex items-center gap-2">
      <Input
        type="text"
        name="searchText"
        placeholder="Search tickets..."
        className="w-full "
      />
      <SearchButton />
    </Form>
  );
};

export default TicketSearch;
