import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="jus flex items-center justify-center border-t-2 px-15 py-5">
      <div className="flex items-center gap-2">
        Made by
        <a
          href="https://github.com/tokyoprikol"
          className="font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          tokyoprikol
        </a>
        <Heart fill="red" strokeWidth={0} />
      </div>
    </footer>
  );
}
