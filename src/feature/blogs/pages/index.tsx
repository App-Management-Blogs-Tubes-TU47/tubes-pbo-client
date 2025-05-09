import { DataTable } from "@/components/table";
import { columns, useBlogAuthList } from "../hooks/useBlogAuthList";

const BlogList = () => {
  const { blogList, pagination, handlePaginationChange } = useBlogAuthList();
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold">Blog List</h1>
      <p className="text-sm text-gray-500">List of all blogs</p>

      <DataTable
        columns={columns}
        data={blogList?.item ?? []}
        pageCount={blogList?.pagination?.totalPages ?? 0}
        pagination={pagination}
        onPaginationChange={(page: number, limit: number) => {
          handlePaginationChange(page, limit);
        }}
      />
    </div>
  );
};

export default BlogList;
