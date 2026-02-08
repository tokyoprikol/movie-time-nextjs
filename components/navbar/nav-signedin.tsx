import { Session } from "better-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function NavSignedIn({
  session,
  handleSignOut,
}: {
  session: Session;
  handleSignOut: Promise<void>;
}) {
  return (
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
  );
}
