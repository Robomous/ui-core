import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@robomous/ui-core";
import { Fragment } from "react";

const portrait = (slug: string) => `/assets/people/${slug}.svg`;

const members = [
  {
    initials: "HK",
    image: portrait("hannah-kim"),
    name: "Hannah Kim",
    email: "hannah.kim@robomous.ai",
    role: "Owner",
  },
  {
    initials: "DO",
    image: portrait("daniel-okafor"),
    name: "Daniel Okafor",
    email: "daniel.okafor@robomous.ai",
    role: "Admin",
  },
  {
    initials: "SB",
    image: portrait("sofia-brennan"),
    name: "Sofia Brennan",
    email: "sofia.brennan@robomous.ai",
    role: "Annotator",
  },
];

/** A team list: an avatar, a name and email that truncate before they push, and a role badge and action at the trailing edge. */
export default function Overview() {
  return (
    <ItemGroup className="w-full max-w-lg gap-0 rounded-lg border p-1">
      {members.map((member, index) => (
        <Fragment key={member.email}>
          {index > 0 ? <ItemSeparator className="my-0" /> : null}
          <Item>
            <ItemMedia>
              <Avatar>
                <AvatarImage src={member.image} alt="" />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{member.name}</ItemTitle>
              <ItemDescription>{member.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="quiet">{member.role}</Badge>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </ItemActions>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  );
}
