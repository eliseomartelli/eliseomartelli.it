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
import { Feedback, FeedbackType } from "@/types/feedback";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { ContactClient } from "@/lib/client/ContactClient";
import { toast } from "sonner";

export const FeedbackForm = () => {
  const form = useForm<FeedbackType>({
    resolver: zodResolver(Feedback),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: FeedbackType) => {
    const client = new ContactClient();
    try {
      await client.sendFeedback(values);
      form.reset();
      toast("Feedback sent!", {
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Textarea placeholder="Your message..." {...field} />
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
