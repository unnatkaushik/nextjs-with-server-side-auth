"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  useGetAllUserQuery,
  useSigninMutation,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6).max(50),
});

export default function Login() {
  const router = useRouter();

  const auth = useSelector((state) => state.auth.token);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signin, { isLoading, data }] = useSigninMutation({});
  function onSubmit(values: z.infer<typeof formSchema>) {
    signin(values);
  }

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [data, isLoading, auth]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@test.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
