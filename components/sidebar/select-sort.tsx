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
      <SelectTrigger size="sm" className="text-xs">
        <SelectValue placeholder="Sort method" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem className="text-xs" value="title">
          Sort by Title
        </SelectItem>
        <SelectItem className="text-xs" value="date">
          Sort by Date
        </SelectItem>
        <SelectItem className="text-xs" value="default">
          Default
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
