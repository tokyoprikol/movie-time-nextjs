import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="jus flex items-center justify-center px-15 py-10">
      <div className="flex items-center gap-2">
        Made by tokyoprikol
        <Heart fill="red" strokeWidth={0} />
      </div>
    </footer>
  );
}
