import React from "react";
import { useSignUp, ValidationSchema } from "../hooks/useSignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginAssets } from "@/assets";
import { Link } from "react-router-dom";

const SignUpPages: React.FC = () => {
  const { SignUp } = useSignUp();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",

    },
  });

  // TODO: need move to hooks
  const onSubmit = async (data: z.infer<typeof ValidationSchema>) => {
    try {
      await SignUp(data.username, data.password);
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <img
        className="h-screen w-[50vw] object-cover grayscale-100"
        src={LoginAssets}
        alt=""
      />

      <div className="w-[50vw] h-screen flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <h1 className="text-4xl font-semibold">Sign Up</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="input name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="input username" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="input email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="input password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <div>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to={"/signin"} className="text-blue-500">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPages;
