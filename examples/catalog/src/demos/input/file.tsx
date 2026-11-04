import { useState } from "react";
import { Badge, Field, FieldDescription, FieldLabel, Input } from "@robomous/ui-core";

/** `type="file"` keeps the native picker; the button inside is restyled to match the form, and the chosen file is read back from `onChange`. */
export default function FileInput() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="in-file">Calibration file for cam-b07</FieldLabel>
      <Input
        id="in-file"
        type="file"
        accept=".yaml,.json"
        aria-describedby="in-file-hint"
        className="cursor-pointer"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <FieldDescription id="in-file-hint" className="flex items-center justify-between gap-2">
        <span>YAML or JSON, up to 2 MB.</span>
        {file ? (
          <Badge variant="secondary" className="tabular-nums">
            {(file.size / 1024).toFixed(1)} KB
          </Badge>
        ) : null}
      </FieldDescription>
    </Field>
  );
}
