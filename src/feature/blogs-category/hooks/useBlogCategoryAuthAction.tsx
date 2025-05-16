import auth from "@/api/auth";
import {
  BlogCategoryDetailResponse,
  BlogCategoryResponse,
} from "@/feature/blogs-category/types/blog-category.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { callAlert, confirmAPIForm } from "@/components/custom-alert";
import { useEffect } from "react";

const createBlogsApi = async (body: { name: string }) => {
  const { data } = await auth.post<BlogCategoryResponse>("/blog-categories", body);
  return data.data;
};

const updateBlogsApi = async (body: { slug: string; name: string }) => {
  const { data } = await auth.patch<BlogCategoryResponse>(
    `/blog-categories/${body.slug}`,
    {
      name: body.name,
    }
  );
  return data.data;
};

export const getDetailsBlogsApi = async (id: string) => {
  const { data } = await auth.get<BlogCategoryDetailResponse>(`/blog-categories/${id}`);
  return data.data;
};

export const useBlogAuthAction = () => {
  const nav = useNavigate();
  const { slug } = useParams();

  const submitBlog = useMutation({
    mutationFn: (data: { name: string }) =>
      slug ? updateBlogsApi({ ...data, slug }) : createBlogsApi(data),
    onSuccess: () => {
      callAlert({
        type: "success",
        title: "Success!",
        message: "Blog action successfully",
        onConfirm(result) {
          if (result.isConfirmed) {
            nav("/blogs/categories");
          }
        },
      });
    },
    onError: (error) => {
      console.error(error);
      //   Swal.fire({
      //     title: "Error!",
      //     text: "Failed to create blog",
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
    },
  });

  const handleSubmitBlog = (data: { name: string }) => {
    const newdata = {
      ...data,
    };
    confirmAPIForm({
      type: "question",
      title: "Confirmation",
      callAPI: () => submitBlog.mutate(newdata),
      onAlertSuccess: () => nav("/blogs/articles"),
    });
  };

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      name: "",
    },
  });

  // When edit blog
  const { setValue } = form;

  const { refetch: fetchBlogDetails } = useQuery({
    queryKey: ["blog-categories-details", slug],
    queryFn: () => getDetailsBlogsApi(slug as string),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (slug) {
      fetchBlogDetails().then((data) => {
        if (data) {
          const value = data?.data;
          setValue("name", value?.name ?? "");
        }
      });
    }
  }, [slug, fetchBlogDetails]);

  return {
    handleSubmitBlog,
    form,
  };
};

export const ValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
