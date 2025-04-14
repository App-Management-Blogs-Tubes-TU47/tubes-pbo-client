import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  limit,
  totalRecords,
  totalPages,
  onChangePage,
  onChangeLimit,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>No</TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell>
                    {(page - 1) * limit + (row.index + 1)}
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, totalRecords)} of {totalRecords} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChangePage(page - 1)}
            disabled={page === 1}
            className="border rounded px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onChangePage(page + 1)}
            disabled={page >= totalPages}
            className="border rounded px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
          <select
            value={limit}
            onChange={(e) => onChangeLimit(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
