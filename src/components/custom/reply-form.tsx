"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Reply, ReplyType } from "@/types/contact";
import { Input } from "../ui/input";
import { ContactClient } from "@/lib/client/ContactClient";
import { toast } from "sonner";

export const ReplyForm = ({ postName }: { postName: string }) => {
  const form = useForm<ReplyType>({
    resolver: zodResolver(Reply),
    defaultValues: {
      postTitle: postName,
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ReplyType) => {
    const client = new ContactClient();
    try {
      await client.sendContact({
        ...values,
        message: `RE: ${values.postTitle}\n\n ${values.message}`,
      });
      form.reset();
      toast("Message sent!", {
        description: "Thank you for sending the message!",
      });
    } catch (error) {
      const message =
        (error as Partial<Error>).message ||
        "An error occurred. Please try again.";
      toast("Error Sending Message", {
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="john@doe.com" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Textarea
                    placeholder="Hi Eliseo, I'd like to tell you..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </Form>
  );
};
