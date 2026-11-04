import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
} from "@robomous/ui-core";
import { BotIcon } from "@robomous/ui-core/icons";

/** `type="single" collapsible`: one region open at a time, and the open one closes again. */
export default function Default() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback>
            <BotIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-sm font-medium">Atlas · rb-07</span>
          <span className="text-muted-foreground">AMR · Monterrey DC-2</span>
        </div>
        <Badge variant="success">online</Badge>
      </div>
      <Accordion type="single" collapsible defaultValue="firmware">
        <AccordionItem value="battery">
          <AccordionTrigger>Battery</AccordionTrigger>
          <AccordionContent>
            <p>
              82% charged, about five hours of runtime. Atlas returns to its dock at 20%, and a full
              charge takes 70 minutes.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="firmware">
          <AccordionTrigger>Firmware</AccordionTrigger>
          <AccordionContent>
            <p>
              Running <span className="font-mono">fw-2.8.1</span>. An update to{" "}
              <span className="font-mono">fw-2.9.0</span> is queued for the next maintenance window.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="maintenance">
          <AccordionTrigger>Maintenance</AccordionTrigger>
          <AccordionContent>
            <p>Next service on Nov 12. Wheel encoders were last calibrated on Oct 2.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
