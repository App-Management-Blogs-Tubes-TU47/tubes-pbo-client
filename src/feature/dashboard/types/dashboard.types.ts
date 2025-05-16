import { BlogListResponseItem } from "@/feature/blogs/types/blog-list.types";
import { UserResponseItem } from "@/feature/users/types/users-list.types";

export interface DashboardResponse {
  message: string;
  status: number;
  data: DashboardResponseData;
}

export interface DashboardResponseData {
  blogs: BlogListResponseItem[];
  countBlogs: DashboardResponseCountBlog[];
  users: UserResponseItem[];
  leaderboard: DashboardResponseLeaderboard[];
}

export interface DashboardResponseCountBlog {
  title: number;
  count: number;
}

export interface DashboardResponseLeaderboard {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  email: string;
  createdAt: Date;
  blogs: number;
}
