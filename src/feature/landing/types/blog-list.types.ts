import { Pagination } from "@/types";

export interface BlogListResponse {
  message: string;
  status: number;
  data: BlogListResponseData;
}

export interface BlogListResponseData {
  item: BlogListResponseItem[];
  pagination: Pagination;
}

export interface BlogListResponseItem {
  id: string;
  title: string;
  slugs: string;
  article: string;
  status: string;
  tumbnailUrl: string;
  authorName: string;
  authorUsername: string;
  categoryName: string;
  categorySlugs: string;
  createdAt: Date;
  countComments: number;
}

/**
 * Get blog slugs
 *
 */

export interface BlogDetailsResponse {
  message: string;
  status: number;
  data: BlogDetailsResponseItem;
}

export interface BlogDetailsResponseItem {
  id: string;
  title: string;
  slugs: string;
  article: string;
  status: string;
  tumbnailUrl: string;
  author: BlogDetailsResponseItemAuthor;
  category: BlogDetailsResponseItemCategory;
  createdAt: Date;
  updatedAt: Date | null;
  countComments: number;
}

export interface BlogDetailsResponseItemAuthor {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profileUrl: string;
  createdAt: Date;
  updatedAt: null;
}

export interface BlogDetailsResponseItemCategory {
  id: string;
  name: string;
  slugs: string;
  createdAt: Date;
  updatedAt: null;
}
