"use client";

import NavMenu from "./navbar/nav-menu";
import NavLogo from "./navbar/nav-logo";
import NavSearchBar from "./navbar/nav-searchbar";
import NavAuth from "./navbar/nav-auth";
import { Settings, User, LogOut, Moon, Sun } from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";

import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

export default function Header() {
  const { data: session, isPending, error, refetch } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const handleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

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
    <header className="flex items-center justify-between px-15 py-5">
      <div className="flex items-center gap-15">
        <NavLogo />
        {session && <NavMenu />}
      </div>

      {session && <NavSearchBar />}

      <div className="flex items-center gap-2">
        <Switch id="switchTheme" onCheckedChange={handleTheme} />
        <Label htmlFor="switchTheme" asChild>
          {isLight ? <Sun /> : <Moon />}
        </Label>
      </div>

      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback className="cursor-pointer">
                {session?.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!session && <NavAuth />}
    </header>
  );
}
