import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";

/** `SelectGroup` and `SelectLabel` split a long list of cameras into named sections. */
export default function Groups() {
  return (
    <Select defaultValue="front-left">
      <SelectTrigger className="w-56" aria-label="Camera">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Front</SelectLabel>
          <SelectItem value="front-left">front-left</SelectItem>
          <SelectItem value="front-right">front-right</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Rear</SelectLabel>
          <SelectItem value="rear-left">rear-left</SelectItem>
          <SelectItem value="rear-right">rear-right</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
