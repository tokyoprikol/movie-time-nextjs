import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";

export default function NavSearchBar() {
  return (
    <InputGroup className="max-w-100 border-neutral-700 bg-neutral-800 text-neutral-300">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  );
}
