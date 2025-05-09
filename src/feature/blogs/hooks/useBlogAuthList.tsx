import { ColumnDef } from "@tanstack/react-table";
import {
  BlogListResponse,
  BlogListResponseData,
  BlogListResponseItem,
} from "../types/blog-list.types";
import auth from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

export const columns: ColumnDef<BlogListResponseItem>[] = [
  {
    accessorKey: "id",
    header: "NO",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("categoryName")}</div>,
  },
  {
    accessorKey: "countComments",
    header: "Count Comments",
    cell: ({ row }) => <div>{row.getValue("countComments")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            // Handle edit action
            console.log("Edit blog with ID:", row.getValue("id"));
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={() => {
            // Handle delete action
            console.log("Delete blog with ID:", row.getValue("id"));
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
];

export const fetchBlogList = async (
  page: number,
  limit: number,
  search: string,
  category?: string,
  author?: string
): Promise<BlogListResponseData> => {
  const { data } = await auth.get<BlogListResponse>("/blogs", {
    params: {
      page,
      size: limit,
      search,
      category,
      author,
    },
  });
  return data.data;
};

export const useBlogAuthList = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    search: "",
    category: "",
  });
  const {
    data: blogList,
    isLoading: isLoadingBlogList,
    isError: isErrorBlogList,
    error: errorBlogList,
    refetch: refetchBlogList,
  } = useQuery({
    queryKey: ["blog-auth-list"],
    queryFn: () =>
      fetchBlogList(
        pagination.page,
        pagination.limit,
        pagination.search,
        pagination.category
      ),
    refetchOnWindowFocus: false,
  });

  const handlePaginationChange = (page: number, limit: number) => {
    try {
      alert("Page: " + page + " Limit: " + limit);
      setPagination((prev) => ({
        ...prev,
        limit: limit,
        page: page + 1,
      }));
    } catch (error) {
      //
    } finally {
      refetchBlogList();
    }
  };

  return {
    blogList,
    isLoadingBlogList,
    isErrorBlogList,
    errorBlogList,
    refetchBlogList,
    pagination,
    setPagination,
    handlePaginationChange,
  };
};
