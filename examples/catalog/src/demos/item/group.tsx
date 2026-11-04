import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@robomous/ui-core";
import { BellIcon, DatabaseIcon, GitBranchIcon } from "@robomous/ui-core/icons";
import { Fragment } from "react";

const integrations = [
  {
    icon: DatabaseIcon,
    name: "S3 bucket",
    detail: "Exports land in s3://vision-exports",
    connected: true,
  },
  {
    icon: GitBranchIcon,
    name: "GitHub",
    detail: "Model cards sync to robomous/detectors",
    connected: true,
  },
  {
    icon: BellIcon,
    name: "Slack",
    detail: "Review alerts post to #vision-review",
    connected: false,
  },
];

/** `ItemGroup` is a list and each `Item` in it a list item; `ItemSeparator` sits between rows in place of each item's own border. */
export default function Group() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Where exports, model cards and alerts are sent.</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-0">
          {integrations.map(({ icon: Icon, name, detail, connected }, index) => (
            <Fragment key={name}>
              {index > 0 ? <ItemSeparator className="my-0" /> : null}
              <Item>
                <ItemMedia variant="icon">
                  <Icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>{detail}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant={connected ? "success" : "quiet"}>
                    {connected ? "connected" : "not connected"}
                  </Badge>
                </ItemActions>
              </Item>
            </Fragment>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
