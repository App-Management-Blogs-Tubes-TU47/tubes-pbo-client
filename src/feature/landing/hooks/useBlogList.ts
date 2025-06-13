import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import {
    BlogListResponse,
    BlogListResponseData,
    BlogListResponseItem,
} from "../../blogs/types/blog-list.types";
import { useSearchBlogList } from "./useSearchBlogList";
import { Pagination } from "@/types";
import unauth from "@/api/unauth";
import { LandingPageProps } from "../pages/blog-list";
import { BlogCategoryResponse, BlogCategoryResponseData } from "../../blogs-category/types/blog-category.types";
import { useSearchParams } from "react-router-dom";

export const fetchBlogList = async (
  page: number,
  limit: number,
  search: string,
  category?: string,
  author?: string
): Promise<BlogListResponseData> => {
  const { data } = await unauth.get<BlogListResponse>(
    // `/public/blogs?page=${page}&size=${limit}&search=${search}`
    "/public/blogs",
    {
      params: {
        page,
        size: limit,
        search,
        category,
        author,
        status: "PUBLISH"
      },
    }
  );
  return data.data;
};


export const fetchBlogCategoryList = async (
  page: number,
  limit: number,
  search: string,
  
): Promise<BlogCategoryResponseData> => {
  const { data } = await unauth.get<BlogCategoryResponse>(
    // `/public/blogs?page=${page}&size=${limit}&search=${search}`
    "/public/blog-categories",
    {
      params: {
        page,
        size: limit,
        search,
      },
    }
  );
  return data.data;
};

export const useBlogList = (props: LandingPageProps) => {
  const { search } = useSearchBlogList();
  const [searchparams] = useSearchParams()
  const ctg = searchparams.get("ctg") || "";

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
  });
  const [dataPagination, setDataPagination] = useState<Pagination>({
    page: 1,
    size: 9,
    totalPages: 0,
    totalRecords: 0,
  });
  const [blogs, setBlogs] = useState<BlogListResponseItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const {
    data: blogList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "blog",
      pagination.page,
      pagination.limit,
      search,
      ctg,
      props.isChildrenFromAuthor ? props.isChildrenFromAuthorUsername : "",
    ],
    queryFn: () =>
      fetchBlogList(
        pagination.page,
        pagination.limit,
        search,
        ctg,
        props.isChildrenFromAuthor
          ? props.isChildrenFromAuthorUsername
          : ""
      ),
    enabled: pagination.page === 1,
  });

  const {
    data: blogCategoryList,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: [
      "blog-category",
      1,
      10,
      search,
    ],
    queryFn: () =>
      fetchBlogCategoryList(
        1,
        10,
        search
      ),
    enabled: pagination.page === 1,
  });


  useEffect(() => {
    setBlogs([]);
    setPagination((prev) => ({ ...prev, page: 1 }));
    refetch();
  }, [search, ctg, props.isChildrenFromAuthor, props.isChildrenFromAuthorUsername]);


  useEffect(() => {
    if (blogList) {
      setDataPagination(blogList?.pagination);

      setBlogs((prev) => {
        const newData = blogList?.item.filter(
          (item: { id: string }) =>
            !prev.some((existing) => existing?.id === item?.id)
        );
        return [...prev, ...newData];
      });
    }
  }, [blogList]);

  const loadMore = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const newPage = pagination.page + 1;
      const newBlogs = await fetchBlogList(
        newPage,
        pagination.limit,
        search,
        ctg,
        props.isChildrenFromAuthor
          ? props.isChildrenFromAuthorUsername
          : ""
      );

      setBlogs((prev) => {
        const uniqueBlogs = newBlogs?.item?.filter(
          (item: { id: string }) =>
            !prev.some((existing) => existing?.id === item?.id)
        );
        return [...prev, ...uniqueBlogs];
      });
      setDataPagination(newBlogs?.pagination);
      setPagination((prev) => ({ ...prev, page: newPage }));
    } finally {
      setIsFetching(false);
    }
  }, [pagination, isFetching, search, ctg]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return {
    blogs,
    isLoading,
    isFetching,
    refetch,
    pagination,
    setPagination,
    loadMore,
    setBlogs,
    dataPagination,
    blogCategoryList,
    isLoadingCategory,
    refetchCategory,
    categoryParams: ctg
  };
};
