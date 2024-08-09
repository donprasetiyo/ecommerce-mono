import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";
import { redirectToLoginIfUnauthorized, redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";

export default async function SettingsProfilePage() {
  const { session, user } = await validateRequestRegular();

  if (user && !user.email_verified) {
    return redirectToVerifyIfUnverified("/account");
  }

  if (!session) {
    return redirectToLoginIfUnauthorized("/account");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          This is what we know about you.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Connected Discord account</CardTitle>
          <CardDescription>
            You registered with below Discord account:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
