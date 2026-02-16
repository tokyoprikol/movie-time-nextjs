import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function NavAuth() {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <div className="flex gap-2">
      {pathname == "/sign-in" && (
        <Button variant={"secondary"} size={"sm"}>
          <Link href={"/sign-up"}>Sign Up</Link>
        </Button>
      )}
      {pathname == "/sign-up" && (
        <Button variant={"secondary"} size={"sm"}>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      )}
    </div>
  );
}
