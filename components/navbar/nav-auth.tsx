import Link from "next/link";
import { Button } from "../ui/button";

export default function NavAuth() {
  return (
    <div className="flex gap-2">
      <Button
        asChild
        className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-800/70"
      >
        <Link href={"/sign-in"}>Sign In</Link>
      </Button>
      <Button
        asChild
        className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-800/70"
      >
        <Link href={"/sign-up"}>Sign Up</Link>
      </Button>
    </div>
  );
}
