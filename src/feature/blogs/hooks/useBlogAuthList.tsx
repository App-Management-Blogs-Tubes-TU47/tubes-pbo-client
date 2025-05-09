import { ColumnDef } from "@tanstack/react-table";
import {
  BlogListResponse,
  BlogListResponseData,
  BlogListResponseItem,
} from "../types/blog-list.types";
import auth from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, ListCollapse, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/hooks/useAuthStore";

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
  const { users } = useAuthStore();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    search: "",
    category: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: blogList,
    isLoading: isLoadingBlogList,
    isError: isErrorBlogList,
    error: errorBlogList,
    refetch: refetchBlogList,
  } = useQuery({
    queryKey: [
      "blog-auth-list",
      pagination.page,
      pagination.limit,
      pagination.search,
      pagination.category,
    ],
    queryFn: () =>
      fetchBlogList(
        pagination.page,
        pagination.limit,
        pagination.search,
        pagination.category,
        users?.user?.username
      ),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (blogList?.pagination) {
      setTotalPages(blogList.pagination.totalPages);
    }
  }, [blogList]);

  const columns: ColumnDef<BlogListResponseItem>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => (
        <div>{row.index + 1 + (pagination.page - 1) * pagination.limit}</div>
      ),
    },
    ...blogcolumnsdata,
  ];

  return {
    blogList,
    isLoadingBlogList,
    isErrorBlogList,
    errorBlogList,
    refetchBlogList,
    pagination,
    setPagination,
    totalPages,
    columns,
  };
};

const blogcolumnsdata: ColumnDef<BlogListResponseItem>[] = [
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("status") === "DRAFT" ? (
          <Badge variant={"secondary"}>Draft</Badge>
        ) : row.getValue("status") === "PUBLISH" ? (
          <Badge>Publish</Badge>
        ) : (
          <Badge variant={"destructive"}>Archive</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size={"icon"} variant={"outline"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={`/blogs/articles/${row.getValue("id")}`}>
                <DropdownMenuItem>
                  <ListCollapse />
                  <span>Detail</span>
                </DropdownMenuItem>
              </Link>
              <Link to={`/blogs/articles/${row.getValue("id")}`}>
                <DropdownMenuItem>
                  <Pencil />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>
              <Link to={`/blogs/articles/${row.getValue("id")}`}>
                <DropdownMenuItem>
                  <Trash2 />
                  <span>Delete</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
