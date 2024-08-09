import { useEffect } from "react";
import Link from "next/link";
import { useBoundStore } from "@admin/store/store";
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

import { LoginSchema, loginSchema } from "../../schema";

export function Login({
  handleContinue,
}: {
  handleContinue: (data: LoginSchema) => void;
}) {
  const [[loginStatus, updateLoginStatus], boundStore] = useBoundStore(
    (state) => [state.loginStatus, state.updateLoginStatus],
  );

  useEffect(() => {
    boundStore.persist.rehydrate();
  }, [boundStore.persist]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    handleContinue(values);
  }

  const isLoggingIn = loginStatus.status === "LOGGING_IN" ? true : false;

  return (
    <Card className="border-border bg-background mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your username or email below to login to your account
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
                  <FormLabel>Username or email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe or johndoe@example.com"
                      {...field}
                      disabled={isLoggingIn}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/reset-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoggingIn} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-full"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoggingIn ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
