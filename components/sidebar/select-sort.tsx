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
      <SelectTrigger>
        <SelectValue placeholder="Choose sort method" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="title">Sort by Title</SelectItem>
        <SelectItem value="date">Sort by Date</SelectItem>
        <SelectItem value="default">Default</SelectItem>
      </SelectContent>
    </Select>
  );
}
