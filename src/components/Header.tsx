import Link from "next/link";
import NavButton from "@/components/NavButton";
import { File, HomeIcon, LogOut, UsersRound } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavButtonMenu from "@/components/NavButtonMenu";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />
          <Link
            href={"/home"}
            className="flex items-center justify-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0">
              TechFix Repairs
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={File} />
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />
          <ModeToggle />
          <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Logout"
            title="Logout"
            className="rounded-full"
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
