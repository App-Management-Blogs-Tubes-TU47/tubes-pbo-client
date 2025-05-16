import { ColumnDef } from "@tanstack/react-table";
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
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";
import { confirmAPIForm } from "@/components/custom-alert";
import { getDetailsBlogsApi } from "./useBlogCategoryAuthAction";
import {
  BlogCategoryResponse,
  BlogCategoryResponseData,
  BlogCategoryResponseItem,
} from "../types/blog-category.types";

export const fetchBlogCategoryList = async (
  page: number,
  limit: number,
  search: string,
  category?: string,
  author?: string
): Promise<BlogCategoryResponseData> => {
  const { data } = await auth.get<BlogCategoryResponse>("/blog-categories", {
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

export const deleteBlogCategoryApi = async (slugs: string) => {
  const { data } = await auth.delete<BlogCategoryResponse>(
    `/blog-categories/${slugs}`
  );
  return data.data;
};

export const useBlogCategoryAuthList = () => {
  const { users } = useAuthStore();
  const [openDetail, setOpenDetail] = useState<{
    slugs: string;
    open: boolean;
  }>({
    slugs: "",
    open: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    search: "",
    category: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: blogCategoryList,
    isLoading: isLoadingBlogCategoryList,
    isError: isErrorBlogCategoryList,
    error: errorBlogCategoryList,
    refetch: refetchBlogCategoryList,
  } = useQuery({
    queryKey: [
      "blog-category-auth-list",
      pagination.page,
      pagination.limit,
      pagination.search,
      pagination.category,
    ],
    queryFn: () =>
      fetchBlogCategoryList(
        pagination.page,
        pagination.limit,
        pagination.search,
        pagination.category,
        users?.user?.username
      ),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (blogCategoryList?.pagination) {
      setTotalPages(blogCategoryList.pagination.totalPages);
    }
  }, [blogCategoryList]);

  const { data: blogCategoryDetail } = useQuery({
    queryKey: ["blog-category-auth-list", "category"],
    queryFn: () => getDetailsBlogsApi(openDetail.slugs),
    refetchOnWindowFocus: false,
    enabled: openDetail.open,
  });

  const columns: ColumnDef<BlogCategoryResponseItem>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => (
        <div>{row.index + 1 + (pagination.page - 1) * pagination.limit}</div>
      ),
    },
    ...blogcategorycolumnsdata,
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
                <Link to={`/blogs/categories/update/${row.getValue("slugs")}`}>
                  <DropdownMenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                {users.user?.role === "ADMIN" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        confirmAPIForm({
                          callAPI() {
                            return deleteBlogCategoryApi(row.getValue("slugs"));
                          },
                          onAlertSuccess() {
                            refetchBlogCategoryList();
                          },
                          message: "Are you sure to delete this blog?",
                          title: "Confirmation",
                        });
                      }}
                    >
                      <Trash2 />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return {
    blogCategoryList,
    isLoadingBlogCategoryList,
    isErrorBlogCategoryList,
    errorBlogCategoryList,
    refetchBlogCategoryList,
    pagination,
    setPagination,
    totalPages,
    columns,
    blogCategoryDetail,
    setOpenDetail,
    openDetail,
  };
};

const blogcategorycolumnsdata: ColumnDef<BlogCategoryResponseItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slugs",
    header: "Slugs",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
];
