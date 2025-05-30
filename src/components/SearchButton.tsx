"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchButton = () => {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={status.pending}
      className="w-20 cursor-pointer"
    >
      {status.pending ? <LoaderCircle className="animate-spin" /> : "Search"}
    </Button>
  );
};

export default SearchButton;
