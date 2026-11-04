import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  Button,
  Spinner,
} from "@robomous/ui-core";
import { FileArchiveIcon, PlusIcon, RotateCcwIcon, XIcon } from "@robomous/ui-core/icons";
import { useEffect, useRef, useState } from "react";

type UploadState = "uploading" | "processing" | "done" | "error";

interface Upload {
  id: string;
  name: string;
  size: string;
  state: UploadState;
}

const NOTE: Record<UploadState, (upload: Upload) => string> = {
  uploading: () => "Uploading…",
  processing: () => "Extracting frames",
  done: (upload) => upload.size,
  error: () => "Upload failed",
};

/** A batch uploader: each file moves through `uploading`, `processing` and `done`, and one `state` prop restyles the whole card. */
export default function Overview() {
  const nextId = useRef(42);
  const [uploads, setUploads] = useState<Upload[]>([
    { id: "batch-0041", name: "batch-0041.zip", size: "311.9 MB", state: "done" },
    { id: "frames-02", name: "frames-02.tar", size: "1.2 GB", state: "error" },
  ]);

  // Advance the first file that is still in flight, one step at a time.
  useEffect(() => {
    const active = uploads.find((u) => u.state === "uploading" || u.state === "processing");
    if (!active) return;
    const timer = setTimeout(() => {
      setUploads((current) =>
        current.map((u) =>
          u.id === active.id ? { ...u, state: u.state === "uploading" ? "processing" : "done" } : u,
        ),
      );
    }, 1600);
    return () => clearTimeout(timer);
  }, [uploads]);

  function add() {
    const n = String(nextId.current++).padStart(4, "0");
    setUploads((current) => [
      ...current,
      { id: `batch-${n}`, name: `batch-${n}.zip`, size: "284.3 MB", state: "uploading" },
    ]);
  }

  function setState(id: string, state: UploadState) {
    setUploads((current) => current.map((u) => (u.id === id ? { ...u, state } : u)));
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <div className="flex w-full flex-col gap-2">
        {uploads.map((upload) => (
          <Attachment key={upload.id} state={upload.state} className="w-full">
            <AttachmentMedia>
              {upload.state === "uploading" ? <Spinner /> : <FileArchiveIcon />}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{upload.name}</AttachmentTitle>
              <AttachmentDescription>{NOTE[upload.state](upload)}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              {upload.state === "error" ? (
                <AttachmentAction
                  aria-label={`Retry ${upload.name}`}
                  onClick={() => setState(upload.id, "uploading")}
                >
                  <RotateCcwIcon />
                </AttachmentAction>
              ) : null}
              <AttachmentAction
                aria-label={`Remove ${upload.name}`}
                onClick={() => setUploads((current) => current.filter((u) => u.id !== upload.id))}
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={add}>
        <PlusIcon data-icon="inline-start" />
        Add batch
      </Button>
    </div>
  );
}
