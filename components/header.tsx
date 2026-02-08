"use client";

import NavMenu from "./navbar/nav-menu";
import NavLogo from "./navbar/nav-logo";
import NavSearchBar from "./navbar/nav-searchbar";
import NavAuth from "./navbar/nav-auth";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";

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
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarFallback className="bg-neutral-500 text-neutral-50">
              {session?.user.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-800/70"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
      {!session && <NavAuth />}
    </header>
  );
}
