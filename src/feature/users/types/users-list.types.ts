import { Pagination } from "@/types";
export interface UserResponse {
  message: string;
  status: number;
  data: UserResponseData;
}

export interface UserResponseData {
  item: UserResponseItem[];
  pagination: Pagination;
}

export interface UserResponseItem {
  id: string;
  name: null | string;
  username: string;
  email: null | string;
  role: string;
  profileUrl: null | string;
  createdAt: Date;
  updatedAt: null;
}
