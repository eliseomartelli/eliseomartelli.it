"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewsletterEntry, NewsletterEntryType } from "@/types/newsletterentry";
import { NewsletterClient } from "@/lib/client/NewsletterClient";
import { toast } from "sonner";

export const NewsletterSignup = () => {
  const form = useForm<NewsletterEntryType>({
    resolver: zodResolver(NewsletterEntry),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: NewsletterEntryType) => {
    const client = new NewsletterClient();
    try {
      await client.subscribe(values);
      form.reset();
      toast("Successfully subscribed!", {
        description: "Thank you for subscribing to our newsletter.",
      });
    } catch (error) {
      const message =
        (error as Partial<Error>).message ||
        "An error occurred. Please try again.";
      toast("Subscription Failed", {
        description: message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button type="submit">Subscribe</Button>
              </div>
              <FormDescription>
                This is the email I will use to send you some news!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
