import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

import {
  ResetPasswordRequestSchema,
  resetPasswordRequestSchema,
} from "../schema";

export function ResetPasswordRequest({
  handleResend,
  isSending,
}: {
  handleResend: (values: ResetPasswordRequestSchema) => void;
  isSending: boolean;
}) {
  const form = useForm<z.infer<typeof resetPasswordRequestSchema>>({
    resolver: zodResolver(resetPasswordRequestSchema),
  });

  async function onSubmit(values: z.infer<typeof resetPasswordRequestSchema>) {
    handleResend(values);
  }

  const router = useRouter();

  async function handleSwitch() {
    router.push("/login");
  }

  return (
    <Card className="border-border bg-background mx-auto max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>
          You can request a reset password link if you forgot your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your email or username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-between">
              <Button
                type="submit"
                className="!pointer-events-auto mt-4 w-full"
                disabled={
                  isSending ||
                  form.getValues("usernameOrEmail") === undefined ||
                  (typeof form.getValues("usernameOrEmail") === "string" &&
                    form.getValues("usernameOrEmail").toString() === "")
                }
              >
                {isSending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-col items-center justify-center space-y-4 px-8 text-center text-sm">
        <div className="flex flex-row items-center justify-between">
          <p>Know your password?</p>
          <Button
            className=""
            variant={"link"}
            size={"sm"}
            onClick={() => handleSwitch()}
          >
            Log in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
