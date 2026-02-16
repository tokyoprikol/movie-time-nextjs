import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { EllipsisVertical, Moon, Sun } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { NAV_ITEMS } from "@/lib/config/nav-items";
import { Button } from "../ui/button";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";

export default function BurgerMenu() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const handleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <EllipsisVertical className="cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="duration-300 data-[state=open]:duration-300"
      >
        <SheetHeader>
          <SheetTitle>Content</SheetTitle>
          <div className="flex flex-col py-4">
            <Accordion type="single" collapsible className="w-full px-2">
              {NAV_ITEMS.map((menuItem) => (
                <AccordionItem key={menuItem.title} value={menuItem.title}>
                  <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">
                    {menuItem.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <div className="flex flex-col">
                      {menuItem.items.map((item) => (
                        <Button
                          key={item.title}
                          variant="ghost"
                          className="hover:bg-accent/50 justify-start rounded-none px-8 py-2.5 text-base font-normal"
                          asChild
                        >
                          <Link href={item.href}>{item.title}</Link>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="switchTheme"
              checked={isLight}
              onCheckedChange={handleTheme}
            />
            <Label htmlFor="switchTheme" className="relative">
              <Sun className="opacity-100 dark:opacity-0" />
              <Moon className="absolute inset-0 opacity-0 dark:opacity-100" />
            </Label>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
