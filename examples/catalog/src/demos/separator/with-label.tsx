import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@robomous/ui-core";

/** A label between two rules: the Separators flex to fill, the text keeps its own width. */
export default function WithLabel() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Sign in to Robomous</CardTitle>
        <CardDescription>Use your team's identity provider or an emailed link.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button variant="outline">Continue with SSO</Button>
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        <Button variant="outline">Sign in with a magic link</Button>
      </CardContent>
    </Card>
  );
}
