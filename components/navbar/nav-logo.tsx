import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2">
        <Image src={"/film.png"} alt="Logo" width={48} height={48} />
        <span className="text-3xl font-bold">MovieTime</span>
      </div>
    </Link>
  );
}
