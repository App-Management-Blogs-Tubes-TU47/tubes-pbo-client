import { DataTable } from "@/components/table";
import { useUserAuthList } from "../hooks/useUserAuthList";
import InputSearchDebounce from "@/components/input/input-search-debounce";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserList = () => {
  const {
    userList,
    pagination,
    setPagination,
    isLoadingUserList,
    totalPages,
    columns,
    userDetail,
    setOpenDetail,
    openDetail,
  } = useUserAuthList();
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">User List</h1>
          <p className="text-sm text-gray-500">List of all users</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <InputSearchDebounce
            defaultValue=""
            onChange={(e) =>
              setPagination((prev) => {
                return {
                  ...prev,
                  search: e,
                  page: 1,
                };
              })
            }
          />
          <Button onClick={() => navigate("/users/create")}>
            <Plus />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={userList?.item ?? []}
        pageCount={totalPages}
        pagination={pagination}
        isLoading={isLoadingUserList}
        onPaginationChange={(page: number, limit: number) => {
          setPagination((prev) => {
            return {
              ...prev,
              page: page + 1,
              limit: limit,
            };
          });
        }}
      />
      <Drawer
        open={openDetail.open}
        direction="right"
        onClose={() => setOpenDetail({ username: "", open: false })}
      >
        {userDetail && (
          <DrawerContent className="overflow-y-auto overflow-x-hidden w-[50vw]">
            <div className="p-3 py-8">
              <div className="flex flex-col ">
                <Avatar className="h-20 w-20 rounded-lg self-center">
                  <AvatarImage
                    src={userDetail?.profileUrl || ""}
                    alt={userDetail?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {userDetail?.name
                      ? userDetail?.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                      : "Profile"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-base font-semibold mt-4 self-center">
                  {userDetail?.name || "-"}
                </h1>
                <div className="flex flex-col gap-2 mt-4">
                  <div>
                    <label className="text-sm text-foreground/50" htmlFor="">
                      Username
                    </label>
                    <p className="text-base">{userDetail?.username || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/50" htmlFor="">
                      Email
                    </label>

                    <p className="text-base">{userDetail?.email || "-"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-foreground/50" htmlFor="">
                      Created
                    </label>
                    <p className="text-base">
                      {dayjs(userDetail?.createdAt).format("MMM DD, YYYY")}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-foreground/50" htmlFor="">
                      Role
                    </label>
                    <p className="text-base">
                      <div>
                        {userDetail.role === "WRITTER" ? (
                          <Badge variant={"secondary"}>Writter</Badge>
                        ) : userDetail.role === "ADMIN" ? (
                          <Badge>Admin</Badge>
                        ) : (
                          <>-</>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
};

export default UserList;
