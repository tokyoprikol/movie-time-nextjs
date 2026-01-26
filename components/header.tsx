import NavMenu from "./navbar/nav-menu";
import NavLogo from "./navbar/nav-logo";
import NavSearchBar from "./navbar/nav-searchbar";
import NavAuth from "./navbar/nav-auth";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-900 px-15 py-5">
      <div className="flex items-center gap-15">
        <NavLogo />
        <NavMenu />
      </div>

      <NavSearchBar />

      <NavAuth />
    </header>
  );
}
