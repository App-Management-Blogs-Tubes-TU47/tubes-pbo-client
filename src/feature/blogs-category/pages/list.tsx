import { DataTable } from "@/components/table";
import { useBlogCategoryAuthList } from "../hooks/useBlogCategoryAuthList";
import InputSearchDebounce from "@/components/input/input-search-debounce";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogCategoryList = () => {
  const {
    blogCategoryList,
    pagination,
    setPagination,
    isLoadingBlogCategoryList,
    totalPages,
    columns,
  } = useBlogCategoryAuthList();
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Blog Category List</h1>
          <p className="text-sm text-gray-500">List of all blog categories</p>
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
          <Button onClick={() => navigate("/blogs/categories/create")}>
            <Plus />
            <span>Create</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={blogCategoryList?.item ?? []}
        pageCount={totalPages}
        pagination={pagination}
        isLoading={isLoadingBlogCategoryList}
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
    </div>
  );
};

export default BlogCategoryList;
