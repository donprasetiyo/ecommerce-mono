import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next/types";
import { siteconfig } from "@admin/constants/siteconfig";
import { useBoundStore } from "@admin/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addHours,
  addMinutes,
  formatDistance,
  formatDuration,
  intervalToDuration,
  isWithinInterval,
  subHours,
} from "date-fns";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { emailConfiguration } from "@repo/business-config";
import { logout } from "@repo/next-lib/auth/logout";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

import {
  EmailVerificationCodeSchema,
  emailVerificationCodeSchema,
} from "../../schema";

export const metadata: Metadata = {
  title: `Create your ${siteconfig.name} account`,
  description: "See and manage your generations.",
};

export function VerifyAccount({
  handleContinue,
  handleResend,
}: {
  handleContinue: (data: EmailVerificationCodeSchema) => void;
  handleResend: () => void;
}) {
  const [[loginResponse, loginStatus], boundStore] = useBoundStore((state) => [
    state.loginResponse,
    state.loginStatus,
  ]);

  const lastSentVerificationCode = loginResponse.lastSentVerificationCode;

  const form = useForm<z.infer<typeof emailVerificationCodeSchema>>({
    resolver: zodResolver(emailVerificationCodeSchema),
  });

  async function onSubmit(values: z.infer<typeof emailVerificationCodeSchema>) {
    handleContinue(values);
  }

  const [withinInterval, setWithinInterval] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [lastSentInAgo, setLastSentInAgoe] = useState("");
  const [canResend, setCanResend] = useState(false);

  console.log("check", canResend);

  useEffect(() => {
    if (lastSentVerificationCode) {
      const updateTimer = () => {
        const now = Date.now();

        const getPastHour = subHours(
          now,
          emailConfiguration.requestNewEmailDelayInHour,
        );
        const isLastSentWithinPastHourAndNow = isWithinInterval(
          lastSentVerificationCode,
          {
            start: getPastHour,
            end: now,
          },
        );

        console.log(
          "is within",
          formatDistance(lastSentVerificationCode, Date.now()),
        );

        if (isLastSentWithinPastHourAndNow) {
          const addedHour = addHours(
            lastSentVerificationCode,
            emailConfiguration.requestNewEmailDelayInHour,
          );
          const added1MinuteDelay = addMinutes(addedHour, 1);

          const duration = intervalToDuration({
            start: now,
            end: added1MinuteDelay,
          });

          const remainingTime = formatDuration(duration);
          setRemainingTime(remainingTime);

          const isWithin = isWithinInterval(now, {
            start: now,
            end: added1MinuteDelay,
          });

          const ago = formatDistance(lastSentVerificationCode, now);
          setLastSentInAgoe(ago);

          setWithinInterval(isWithin);

          setCanResend(isWithin ? false : true);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [lastSentVerificationCode]);

  const router = useRouter();

  async function handleSwitch() {
    await logout();
    router.push("/login");
  }

  const isResending = loginStatus.status === "RESENDING" ? true : false;

  const isVerifying = loginStatus.status === "VERIFYING" ? true : false;

  return (
    <Card className="border-border bg-background mx-auto max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Verify your account</CardTitle>
        <CardDescription>
          {withinInterval
            ? `We have sent a verification code to your email ${lastSentInAgo} ago.`
            : "We have sent a verification code to your email, which can take up to a few minutes to arrive in your inbox."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input
                      className="numeric"
                      placeholder=""
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-between">
              <Button
                className="w-full"
                type="submit"
                disabled={
                  isVerifying ||
                  form.getValues("code") === undefined ||
                  (typeof form.getValues("code") === "number" &&
                    form.getValues("code").toString() === "")
                }
              >
                {isVerifying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"secondary"}
                      className="!pointer-events-auto mt-4 w-full"
                      type="button"
                      disabled={canResend === false}
                      onClick={() => handleResend()}
                    >
                      {isResending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {isResending ? "Resending..." : "Resend code"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[500px] bg-transparent">
                    {isResending === false && canResend === false ? (
                      <Alert
                        variant="default"
                        className="bg-popover border-border p-4"
                      >
                        <AlertCircle className="h-4 w-4" size={70} />
                        <AlertTitle>Resend code limit</AlertTitle>
                        <AlertDescription>
                          <p>
                            You have to wait for {remainingTime} before
                            requesting another verification code. Use the code
                            we already sent you {lastSentInAgo} ago instead.
                          </p>
                        </AlertDescription>
                      </Alert>
                    ) : null}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-col items-center justify-center space-y-4 px-8 text-center text-sm">
        <div className="flex flex-row items-center justify-between">
          <p>Wrong account to log in to?</p>
          <Button
            className=""
            variant={"link"}
            size={"sm"}
            onClick={() => handleSwitch()}
          >
            Switch account
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
