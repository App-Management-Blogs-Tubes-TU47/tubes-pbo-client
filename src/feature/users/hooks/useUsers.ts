import { ColumnDef } from "@tanstack/react-table";

export interface UsersTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export const useUsers = () => {
  // TODO: need to impl with API
  async function getData(): Promise<{
    items: UsersTypes[];
    pagination: {
      page: number;
      limit: number;
      totalRecords: number;
      totalPages: number;
    };
  }> {
    // Fetch data from your API here.
    return {
      items: [
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@gmail.com",
          role: "admin",
        },
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@gmail.com",
          role: "admin",
        },
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@gmail.com",
          role: "admin",
        },
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@gmail.com",
          role: "admin",
        },
        {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@gmail.com",
          role: "admin",
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        totalRecords: 100,
        totalPages: 10,
      },
    };
  }

  return {
    getData,
  };
};

export const columns: ColumnDef<UsersTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
