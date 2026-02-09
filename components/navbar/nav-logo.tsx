import { Film } from "lucide-react";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2">
        <Film size={48} />
        <span className="text-3xl font-bold">MovieTime</span>
      </div>
    </Link>
  );
}
