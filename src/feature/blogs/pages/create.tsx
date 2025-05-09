import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { useBlogAuthCreate } from "../hooks/useBlogAuthCreate";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill-new";

const CreateBlogAuth: React.FC = () => {
  const { form, handleSubmitBlog, blogCategoryList } = useBlogAuthCreate();

  return (
    <div className="px-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Create Blog</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitBlog)}
          className="grid grid-cols-2 space-y-6 gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="input title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <>
                      {blogCategoryList?.item.map((category) => (
                        <SelectItem key={category.id} value={category.slugs}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISH">Publish</SelectItem>
                    <SelectItem value="ARCHIVE">Archive</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem className="col-span-2 ">
                <FormLabel>Article</FormLabel>
                <FormControl>
                  <ReactQuill
                    className="h-80"
                    theme="snow"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-2 flex gap-2 justify-end mt-5 mb-10">
            <Button type="button" variant={"destructive"}>
              Discard
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlogAuth;
