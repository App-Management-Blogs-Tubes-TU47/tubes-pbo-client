import { Pagination } from "@/types";

export interface BlogCategoryResponse {
    message: string;
    status:  number;
    data:    BlogCategoryResponseData;
}

export interface BlogCategoryResponseData {
    item:       BlogCategoryResponseItem[];
    pagination: Pagination;
}

export interface BlogCategoryResponseItem {
    id:        string;
    name:      string;
    slugs:     string;
    createdAt: Date;
    updatedAt: null;
}