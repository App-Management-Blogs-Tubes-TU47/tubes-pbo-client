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
import { Ellipsis, ListCollapse, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/hooks/useAuthStore";
import { confirmAPIForm } from "@/components/custom-alert";
import { UserResponse, UserResponseData, UserResponseItem } from "../types/users-list.types";
import { getDetailsUsersApi } from "./useUserAuthAction";

export const fetchUserList = async (
  page: number,
  limit: number,
  search: string,
  category?: string,
  author?: string
): Promise<UserResponseData> => {
  const { data } = await auth.get<UserResponse>("/users", {
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

export const deleteUserApi = async (username: string) => {
  const { data } = await auth.delete<UserResponse>(`/users/${username}`);
  return data.data;
};

export const useUserAuthList = () => {
  const { users } = useAuthStore();
  const [openDetail, setOpenDetail] = useState<{
    username: string;
    open: boolean;
  }>({
    username: "",
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
    data: userList,
    isLoading: isLoadingUserList,
    isError: isErrorUserList,
    error: errorUserList,
    refetch: refeUser,
  } = useQuery({
    queryKey: [
      "user-auth-list",
      pagination.page,
      pagination.limit,
      pagination.search,
      pagination.category,
    ],
    queryFn: () =>
      fetchUserList(
        pagination.page,
        pagination.limit,
        pagination.search,
        pagination.category,
        users?.user?.username
      ),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userList?.pagination) {
      setTotalPages(userList.pagination.totalPages);
    }
  }, [userList]);

  const { data: userDetail } = useQuery({
    queryKey: ["user-auth-list"],
    queryFn: () => getDetailsUsersApi(openDetail.username),
    refetchOnWindowFocus: false,
    enabled: openDetail.open,
  });

  const columns: ColumnDef<UserResponseItem>[] = [
    {
      accessorKey: "id",
      header: "No",
      cell: ({ row }) => (
        <div>{row.index + 1 + (pagination.page - 1) * pagination.limit}</div>
      ),
    },
    ...userscolumnsdata,
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
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenDetail({
                        username: row.getValue("username"),
                        open: true,
                      });
                    }}
                  >
                    <ListCollapse />
                    <span>Detail</span>
                  </DropdownMenuItem>
                </>
                <Link to={`/users/update/${row.getValue("username")}`}>
                  <DropdownMenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      confirmAPIForm({
                        callAPI() {
                          return deleteUserApi(row.getValue("username"));
                        },
                        onAlertSuccess() {
                          refeUser();
                        },
                        message: "Are you sure to delete this user?",
                        title: "Confirmation",
                      });
                    }}
                  >
                    <Trash2 />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return {
    userList,
    isLoadingUserList,
    isErrorUserList,
    errorUserList,
    pagination,
    setPagination,
    totalPages,
    columns,
    userDetail,
    setOpenDetail,
    openDetail,
  };
};

const userscolumnsdata: ColumnDef<UserResponseItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("createdAt")).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div>
        {row.getValue("role") === "WRITTER" ? (
          <Badge variant={"secondary"}>Writter</Badge>
        ) : row.getValue("role") === "ADMIN" ? (
          <Badge>Admin</Badge>
        ) : (
          <>-</>
        )}
      </div>
    ),
  },
];
