import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

import { ResetPasswordSchema, resetPasswordSchema } from "../../schema";

export function Reset({
  handleContinue,
  isResetting,
}: {
  handleContinue: (data: ResetPasswordSchema) => void;
  isResetting: boolean;
}) {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    handleContinue(values);
  }

  const disabled =
    form.getValues("password") === undefined ||
    form.getValues("confirmPassword") === undefined ||
    (form.getValues("password") === "string" &&
      form.getValues("password").toString() === "") ||
    (form.getValues("confirmPassword") === "string" &&
      form.getValues("confirmPassword").toString() === "");

  return (
    <Card className="border-border bg-background mx-auto max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Reset your password</CardTitle>
        <CardDescription>
          For your safety, immediately change your password and do not leave
          your device opened/unlocked until you have successfully reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-between">
              <Button
                className="w-full"
                type="submit"
                disabled={isResetting || disabled}
              >
                {isResetting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isResetting ? "Resetting..." : "Reset"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
