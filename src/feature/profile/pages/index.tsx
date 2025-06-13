import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfiles } from "../hooks/useProfiles";
import { useRef } from "react";
import clsx from "clsx";

const ProfilePages = () => {
  const { data, form, handleSubmitUser, handleResetForm, isEdited, setIsEdited } = useProfiles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="px-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitUser)}
          className="grid grid-cols-2 space-y-6 gap-5"
        >
          <div className="col-span-2 flex items-center justify-center">
            <Avatar
              className={clsx("h-40 w-40", isEdited && "cursor-pointer")}
              onClick={() => isEdited && fileInputRef.current?.click()}
            >
              <AvatarImage
                // src={data?.profileUrl || ""}
                // src={form.getValues("profile") || ""}
                src={(() => {
                  const profileValue = form.watch("profile");
                  if (typeof profileValue === "string") return profileValue;
                  if (profileValue instanceof File)
                    return URL.createObjectURL(profileValue);
                  return "";
                })()}
                className="object-cover"
              />
              <AvatarFallback>
                {data?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="input name"
                    {...field}
                    disabled={!isEdited}
                  />
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
                  <Input
                    placeholder="input username"
                    {...field}
                    disabled={!isEdited}
                  />
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
                  <Input
                    placeholder="input email"
                    {...field}
                    disabled={!isEdited}
                  />
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
                    <SelectTrigger disabled className="w-full">
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
            name="password"
            render={({ field }) => (
              <FormItem className={clsx(!isEdited && "hidden")}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="input password"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Profile</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (!e.target.files || e.target.files.length === 0) {
                          return;
                        }
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      // ref={field.ref}
                      ref={(el) => {
                        field.ref(el);
                        fileInputRef.current = el;
                      }}
                    />
                  </FormControl>
                  {/* {field.value && (
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
                  )} */}
                </div>
              </FormItem>
            )}
          />
          <div
            className={clsx(
              "col-span-2 flex gap-2 justify-end mt-5 mb-10",
              !isEdited && "hidden"
            )}
          >
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                handleResetForm();
                setIsEdited(false);
              }}
            >
              Discard
            </Button>
            <Button type="submit">Submit</Button>
          </div>
          <div
            className={clsx(
              "col-span-2 flex gap-2 justify-end mt-5 mb-10",
              isEdited && "hidden"
            )}
          >
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsEdited(!isEdited)}
            >
              Edit Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePages;
