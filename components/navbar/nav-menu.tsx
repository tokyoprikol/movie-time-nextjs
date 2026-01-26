import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

import { NAV_ITEMS } from "@/lib/config/nav-items";

export default function NavMenu() {
  return (
    <nav className="flex gap-4">
      {NAV_ITEMS.map((menuItem) => (
        <DropdownMenu key={menuItem.title} modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{menuItem.title}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {menuItem.items.map((item) => (
              <DropdownMenuItem key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}
