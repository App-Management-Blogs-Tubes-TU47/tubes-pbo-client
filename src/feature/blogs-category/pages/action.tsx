import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { useBlogAuthAction } from "../hooks/useBlogCategoryAuthAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface ActionBlogAuth {
  is_update?: boolean;
}

const ActionBlogAuth: React.FC<ActionBlogAuth> = (props) => {
  const { form, handleSubmitBlog } = useBlogAuthAction();
  const navigation = useNavigate();

  return (
    <div className="px-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          {props.is_update ? "Update" : "Create"} Blog Category
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitBlog)}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="input name"
                    {...field}
                    disabled
                    value={form
                      .getValues("name")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  />
                </FormControl>
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

export default ActionBlogAuth;
