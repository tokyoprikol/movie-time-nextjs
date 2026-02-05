import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectSort() {
  return (
    <Select>
      <SelectTrigger className="border-neutral-700 bg-neutral-800 focus-visible:ring-0">
        <SelectValue className="" placeholder="Choose sort method" />
      </SelectTrigger>
      <SelectContent
        className="border-neutral-700 bg-neutral-800 text-neutral-200"
        position="popper"
      >
        <SelectItem value="title">Sort by Title</SelectItem>
        <SelectItem value="date">Sort by Date</SelectItem>
        <SelectItem value="default">Default</SelectItem>
      </SelectContent>
    </Select>
  );
}
