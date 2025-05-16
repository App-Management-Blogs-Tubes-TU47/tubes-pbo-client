import { DataTable } from "@/components/table";
import { useBlogAuthList } from "../hooks/useBlogAuthList";
import InputSearchDebounce from "@/components/input/input-search-debounce";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import dayjs from "dayjs";
import ReactQuill from "react-quill-new";

const BlogList = () => {
  const {
    blogList,
    pagination,
    setPagination,
    isLoadingBlogList,
    totalPages,
    columns,
    blogDetail,
    setOpenDetail,
    openDetail,
  } = useBlogAuthList();
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Blog List</h1>
          <p className="text-sm text-gray-500">List of all blogs</p>
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
          <Button onClick={() => navigate("/blogs/articles/create")}>
            <Plus />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={blogList?.item ?? []}
        pageCount={totalPages}
        pagination={pagination}
        isLoading={isLoadingBlogList}
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
        onClose={() => setOpenDetail({ slugs: "", open: false })}
      >
        {blogDetail && (
          <DrawerContent className="overflow-y-auto overflow-x-hidden w-[50vw]">
            <DrawerHeader>
              <div className="mx-auto w-full max-w-sm">
                <DrawerTitle>{blogDetail?.title}</DrawerTitle>
              </div>
            </DrawerHeader>
            <div className="p-3">
              <div className="flex flex-col ">
                <img
                  src={blogDetail?.tumbnailUrl}
                  alt="blog"
                  className="w-full h-64 object-cover rounded-md"
                />
                <h1 className="text-sm text-gray-500 mt-4">
                  {blogDetail?.category?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Created : {dayjs(blogDetail?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <div className="border rounded-md bg-foreground/5 mt-4">
                <ReactQuill
                  theme="bubble"
                  value={String(blogDetail?.article)}
                  readOnly
                />
              </div>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
};

export default BlogList;
