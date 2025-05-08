import { create } from "zustand";

export interface SearchBlogListTypes {
  search: string;
  setSearch: (search: string) => void;
}

export const useSearchBlogList = create<SearchBlogListTypes>((set) => ({
  search: "",
  setSearch: (search: string) => set(() => ({ search })),
}));