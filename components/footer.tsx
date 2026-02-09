import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="jus flex items-center justify-center border-t-2 px-15 py-5">
      <div className="flex items-center gap-2">
        Made by tokyoprikol
        <Heart fill="red" strokeWidth={0} />
      </div>
    </footer>
  );
}
