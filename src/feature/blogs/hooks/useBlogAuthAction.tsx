import auth from "@/api/auth";
import {
  BlogCategoryResponse,
  BlogCategoryResponseData,
} from "@/feature/blogs-category/types/blog-category.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BlogDetailsResponse } from "../types/blog-list.types";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/hooks/useAuthStore";
import { callAlert, confirmAPIForm } from "@/components/custom-alert";
import { useEffect } from "react";

export const fetchBlogCategoryList = async (
  page: number,
  limit: number,
  search: string
): Promise<BlogCategoryResponseData> => {
  const { data } = await auth.get<BlogCategoryResponse>("/blog-categories", {
    params: {
      page,
      size: limit,
      search,
    },
  });
  return data.data;
};

const createBlogsApi = async (body: {
  title: string;
  category: string;
  article: string;
  thumbnailFile?: File | string | null;
  status: string;
  author: string;
}) => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("category", body.category);
  formData.append("article", body.article);
  if (body.thumbnailFile && typeof body.thumbnailFile !== "string") {
    formData.append("thumbnailFile", body.thumbnailFile);
  }
  formData.append("status", body.status);
  formData.append("author", body.author);

  const { data } = await auth.post<BlogDetailsResponse>("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

const updateBlogsApi = async (body: {
  slug: string;
  title: string;
  category: string;
  article: string;
  thumbnailFile?: File | string | null;
  status: string;
  author: string;
}) => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("category", body.category);
  formData.append("article", body.article);
  if (body.thumbnailFile && typeof body.thumbnailFile !== "string") {
    formData.append("thumbnailFile", body.thumbnailFile);
  }
  formData.append("status", body.status);
  formData.append("author", body.author);

  const { data } = await auth.patch<BlogDetailsResponse>(
    `/blogs/${body.slug}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};

export const getDetailsBlogsApi = async (id: string) => {
  const { data } = await auth.get<BlogDetailsResponse>(`/blogs/${id}`);
  return data.data;
};

export const useBlogAuthAction = () => {
  const nav = useNavigate();
  const { slug } = useParams();
  const { users } = useAuthStore();
  const {
    data: blogCategoryList,
    isLoading: isLoadingBlogCategoryList,
    isError: isErrorBlogCategoryList,
    error: errorBlogCategoryList,
  } = useQuery({
    queryKey: ["blog-category-list", 1, 100, ""],
    queryFn: () => fetchBlogCategoryList(1, 100, ""),
    refetchOnWindowFocus: false,
  });

  const submitBlog = useMutation({
    mutationFn: (data: {
      title: string;
      category: string;
      article: string;
      thumbnailFile?: File | string | null;
      status: string;
      author: string;
    }) => (slug ? updateBlogsApi({ ...data, slug }) : createBlogsApi(data)),
    onSuccess: () => {
      callAlert({
        type: "success",
        title: "Success!",
        message: "Blog action successfully",
        onConfirm(result) {
          if (result.isConfirmed) {
            nav("/blogs/articles");
          }
        },
      })
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

  const handleSubmitBlog = (data: {
    title: string;
    category: string;
    article: string;
    thumbnailFile?: File | string | null;
    status: string;
  }) => {
    const newdata = {
      ...data,
      author: users?.user?.username,
    };
    confirmAPIForm({
      type: "question",
      title: "Confirmation",
      callAPI: () => submitBlog.mutate(newdata),
      onAlertSuccess: () => nav("/blogs/articles"),
    });
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Submit",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    // const newdata = {
    //   ...data,
    //   author: users?.user?.username,
    // };
    // submitBlog.mutate(newdata);
    //   }
    // });
  };

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      title: "",
      category: "",
      article: "",
      thumbnailFile: null,
      status: "",
    },
  });

  // When edit blog
  const { setValue } = form;

  const { refetch: fetchBlogDetails } = useQuery({
    queryKey: ["blog-details", slug],
    queryFn: () => getDetailsBlogsApi(slug as string),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (slug) {
      fetchBlogDetails().then((data) => {
        if (data) {
          const value = data?.data;
          setValue("title", value?.title ?? "");
          setValue("category", value?.category?.slugs ?? "");
          setValue("article", value?.article ?? "");
          setValue("status", value?.status ?? "");

          setValue("thumbnailFile", value?.tumbnailUrl);
        }
      });
    }
  }, [slug, fetchBlogDetails]);

  return {
    blogCategoryList,
    isLoadingBlogCategoryList,
    isErrorBlogCategoryList,
    errorBlogCategoryList,
    handleSubmitBlog,
    form,
  };
};

export const ValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  article: z.string().min(1, { message: "Article is required" }),
  thumbnailFile: z.any().nullable().optional(),
  // thumbnailFile: z
  //   .any()
  //   .refine(
  //     (file) =>
  //       file === null || (file instanceof File && file.size <= 1024 * 1024 * 2),
  //     { message: "Max file size is 2MB" }
  //   )
  //   .refine(
  //     (file) =>
  //       file === null ||
  //       ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
  //     { message: "Only .jpg, .jpeg, .png formats are supported" }
  //   ),
  status: z.string().min(1, { message: "Status is required" }),
});
