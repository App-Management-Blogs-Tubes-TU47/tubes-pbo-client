import React from "react";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiChat } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useBlogList } from "../hooks/useBlogList";
import InputSearchDebounce from "@/components/input/input-search-debounce";
import { useSearchBlogList } from "../hooks/useSearchBlogList";
import Loaders from "@/components/loading/loaders";
import Empty from "@/components/empty";

export interface LandingPageProps {
  isChildrenFromAuthor?: boolean;
  isChildrenFromAuthorUsername?: string;
}

function stripHtmlTags(input: string) {
  return input.replace(/<[^>]*>/g, "");
}

const LandingPages: React.FC<LandingPageProps> = (props) => {
  const { blogs, blogCategoryList, isLoading } = useBlogList(props);
  const navigate = useNavigate();
  const { search, setSearch } = useSearchBlogList();
  return (
    <div className="flex flex-row">
      <div className="w-3/4 p-3 min-h-[90vh]">
        <InputSearchDebounce
          defaultValue={search}
          onChange={(val) => setSearch(val)}
          className="w-full border-support-100/30 focus:ring-blue-500"
        />
        <div>
          {isLoading ? (
            <Loaders />
          ) : blogs.length > 0 ? (
            blogs?.map((blog, i) => (
              <div
                key={i}
                className="py-4 border-b"
                onClick={() => navigate(`/blog/${blog?.slugs}`)}
              >
                <div>
                  <h1 className="text-sm text-foreground/50 ">
                    Created by{" "}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/author/${blog?.authorUsername}`);
                      }}
                      className="hover:text-foreground/80 cursor-pointer"
                    >
                      {blog?.authorName}
                    </span>
                  </h1>
                  <div className="flex flex-row gap-4 justify-between">
                    <div>
                      <h1 className="font-semibold text-2xl">{blog?.title}</h1>
                      <p className="line-clamp-2 opacity-60">
                        {stripHtmlTags(blog?.article)}
                      </p>
                    </div>
                    <img src={blog?.tumbnailUrl} className="h-24" alt="" />
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm opacity-60">
                      {dayjs(blog?.createdAt).format("MMM DD, YYYY")}
                    </p>
                    <div className="flex flex-row items-center gap-1 opacity-60">
                      <Icon path={mdiChat} size={0.8} className="" />
                      {blog?.countComments}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              {/* <h1 className="text-2xl font-semibold">No blogs found</h1> */}
              <Empty />
            </div>
          )}
        </div>
      </div>
      <div className="w-1/4 border-l p-4 sticky top-40">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex flex-row flex-wrap gap-2 mt-4">
          {blogCategoryList?.item?.map((category, i) => (
            <div
              key={i}
              className="p-2 border rounded-md cursor-pointer hover:bg-foreground/5 w-fit"
              onClick={() => navigate(`/category/${category.slugs}`)}
            >
              {category?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPages;
