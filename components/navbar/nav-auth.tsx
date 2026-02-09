import Link from "next/link";
import { Button } from "../ui/button";

export default function NavAuth() {
  return (
    <div className="flex gap-2">
      <Button variant={"outline"} size={"sm"}>
        <Link href={"/sign-in"}>Sign In</Link>
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <Link href={"/sign-up"}>Sign Up</Link>
      </Button>
    </div>
  );
}
