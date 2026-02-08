"use client";

import NavMenu from "./navbar/nav-menu";
import NavLogo from "./navbar/nav-logo";
import NavSearchBar from "./navbar/nav-searchbar";
import NavAuth from "./navbar/nav-auth";

import { signOut, useSession } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { data: session, isPending, error, refetch } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="flex items-center justify-between bg-neutral-900 px-15 py-5">
      <div className="flex items-center gap-15">
        <NavLogo />
        {session && <NavMenu />}
      </div>

      {session && <NavSearchBar />}
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback className="cursor-pointer bg-neutral-100 text-neutral-900">
                {session?.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-neutral-800 bg-neutral-900 text-neutral-50">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-semibold"
              onClick={handleSignOut}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!session && <NavAuth />}
    </header>
  );
}
