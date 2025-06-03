import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <h2 className="text-2xl ">Page Not Found</h2>
      <Image
        src={"/images/not-found-1024x1024.png"}
        alt="Page Not Found"
        width={300}
        height={300}
        className="rounded-xl"
        priority
        sizes="300px"
        title="Page Not Found"
      />
      <Button variant={"default"} size={"lg"} className="cursor-pointer">
        <Link href={"/tickets"}>Go Home</Link>
      </Button>
    </div>
  );
}
