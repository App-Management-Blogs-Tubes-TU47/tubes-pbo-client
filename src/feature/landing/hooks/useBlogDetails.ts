import unauth from "@/api/unauth";
import {
  BlogDetailsResponse,
  BlogDetailsResponseItem,
} from "../../blogs/types/blog-list.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CommentResponseType,
  CommentResponseTypeData,
} from "../types/comment.types";
import auth from "@/api/auth";
import { useAuthStore } from "@/hooks/useAuthStore";

export const fetchBlogDetail = async (
  slug: string
): Promise<BlogDetailsResponseItem> => {
  const { data } = await unauth.get<BlogDetailsResponse>(
    `/public/blogs/${slug}`
  );
  return data.data;
};

export const fetchBlogComments = async (
  slug: string
): Promise<CommentResponseTypeData> => {
  const { data } = await unauth.get<CommentResponseType>(
    `/public/comments/${slug}`
  );
  return data.data;
};

export const sendComment = async (
  comment: string,
  blogSlug: string,
  username: string
) => {
  const { data } = await auth.post<CommentResponseType>(`/comments`, {
    comment,
    blogSlug,
    username,
  });
  return data.data;
};

export const useBlogDetails = (slug: string) => {
  const {users} = useAuthStore()
  const { data, isLoading, isError } = useQuery<BlogDetailsResponseItem>({
    queryKey: ["blogDetails", slug],
    queryFn: () => fetchBlogDetail(slug),
    enabled: !!slug,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const { data: comments, isLoading: isLoadingComments, refetch } = useQuery({
    queryKey: ["blogComments", slug],
    queryFn: () => fetchBlogComments(slug),
    enabled: !!slug,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const sendComments = useMutation({
    mutationFn: (comment: string) =>
      sendComment(comment, slug, users.user.username),
    onSuccess: () => {
      refetch();
    },
  });

  return {
    blogDetails: data,
    isLoading,
    isError,
    comments,
    isLoadingComments,
    sendComments,
  };
};
