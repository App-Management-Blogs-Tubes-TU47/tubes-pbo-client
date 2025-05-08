import React from "react";
import { useSignIn } from "../hooks/useSignIn";
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

const SignInPages: React.FC = () => {
  const { form, handleSignIn } = useSignIn();

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
            onSubmit={form.handleSubmit((val) => handleSignIn.mutateAsync(val))}
            className="w-2/3 space-y-6"
          >
            <h1 className="text-4xl font-semibold">Sign In</h1>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="input password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <div>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPages;
