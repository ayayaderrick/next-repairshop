import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

const CustomerSearch = () => {
  return (
    <Form action={"/customers"} className="flex items-center gap-2">
      <Input
        type="text"
        name="searchText"
        placeholder="Search customers..."
        className="w-full "
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};

export default CustomerSearch;
