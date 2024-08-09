"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import MutationDialog from "@web/components/mutation-dialog";
import { api } from "@web/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/ui/button";
import { CardContent, CardFooter } from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { CreateWaitlistUser, CreateWaitlistUserSchema } from "@repo/validators";

import { siteconfig } from "~/src/constants/siteconfig";

const MutationForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const defaultValues: Partial<CreateWaitlistUser> = {
    email: "",
    status: "PENDING",
  };

  const form = useForm<CreateWaitlistUser>({
    resolver: zodResolver(CreateWaitlistUserSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const utils = api.useUtils();
  const createWaitlistUser = api.waitlist.add.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.post.invalidate();
      setIsOpen(false);
      toast.success("You've joined our waitlist!");
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to add model"
          : err?.data?.code === "CONFLICT"
            ? "This email address already joined our waitlist!"
            : "Failed to add model",
      );
    },
  });

  async function onSubmit(values: CreateWaitlistUser) {
    createWaitlistUser.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative flex flex-row items-center justify-center">
                      <Input
                        className="border-border h-10 rounded-sm border pl-10"
                        {...field}
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={createWaitlistUser.isPending}
          >
            {createWaitlistUser.isPending
              ? "Joining waitlist..."
              : "Join the waitlist"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

const AddWaitListUser = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MutationDialog
      dialogState={{ isOpen: isOpen, setIsOpen: setIsOpen }}
      description={`Get email notification when ${siteconfig.name} launches!`}
      title="Join the waitlist"
      formComponent={<MutationForm setIsOpen={setIsOpen} />}
    >
      {children}
    </MutationDialog>
  );
};

export default AddWaitListUser;
