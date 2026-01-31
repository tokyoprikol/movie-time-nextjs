import NavLogo from "./navbar/nav-logo";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="jus flex items-center justify-between bg-neutral-900 px-15 py-15">
      <NavLogo />
      <div className="flex items-center gap-2 text-neutral-100">
        Made by tokyoprikol
        <Heart fill="red" strokeWidth={0} />
      </div>
    </footer>
  );
}
