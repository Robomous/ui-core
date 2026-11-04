import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@robomous/ui-core";
import { RocketIcon } from "@robomous/ui-core/icons";

/** A first-run section: say what belongs here, why it is empty, and the single next step. */
export default function Overview() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Deployments</CardTitle>
        <CardDescription>Where your models are serving traffic.</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty className="border py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RocketIcon />
            </EmptyMedia>
            <EmptyTitle>Nothing deployed yet</EmptyTitle>
            <EmptyDescription>
              Deploy a model to a fleet and its traffic and health will show up here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Deploy detector-v3.2</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
}
