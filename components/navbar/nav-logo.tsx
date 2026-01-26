import Image from "next/image";

export default function NavLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={"/film.png"} alt="Logo" width={48} height={48} />
      <span className="text-3xl font-bold text-white">MovieTime</span>
    </div>
  );
}
