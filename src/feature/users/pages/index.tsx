import { DataTable } from "@/components/data-table";
import React from "react";
import { columns, UsersTypes, useUsers } from "../hooks/useUsers";

const UserPages: React.FC = () => {
  // const { getData } = useUsers();
  // const [data, setData] = React.useState<UsersTypes[]>([]);
  // const [pagination, setPagination] = React.useState({
  //   page: 1,
  //   limit: 10,
  //   totalRecords: 0,
  //   totalPages: 0,
  // });

  // React.useEffect(() => {
  //   const result = getData();
  //   setData(result.items);
  //   setPagination(result.pagination);
  // }, []);
  return (
    <div>
      {/* <DataTable
        columns={columns}
        data={data}
        page={pagination.page}
        limit={pagination.limit}
        totalRecords={pagination.totalRecords}
        totalPages={pagination.totalPages}
        onChangePage={() => {}}
        onChangeLimit={() => {}}
      /> */}
    </div>
  );
};

export default UserPages;
