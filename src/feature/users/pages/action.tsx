import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { useUserAuthAction } from "../hooks/useUserAuthAction";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface ActionUserAuthProps {
  is_update?: boolean;
}

const ActionUserAuth: React.FC<ActionUserAuthProps> = (props) => {
  const { form, handleSubmitUser } = useUserAuthAction();
  const navigation = useNavigate();

  return (
    <div className="px-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          {props.is_update ? "Update" : "Create"} User
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitUser)}
          className="grid grid-cols-2 space-y-6 gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="input name" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WRITTER">Writter</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  {field.value && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline">
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Preview Profile</DialogHeader>
                          <img
                            src={
                              typeof field.value === "string"
                                ? field.value
                                : URL.createObjectURL(field.value)
                            }
                            alt="Preview"
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </FormItem>
            )}
          />
          <div className="col-span-2 flex gap-2 justify-end mt-5 mb-10">
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => navigation(-1)}
            >
              Discard
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionUserAuth;
