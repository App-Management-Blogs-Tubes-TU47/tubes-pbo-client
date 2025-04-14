import React from "react";
import { useListBlogs } from "../hooks/useListBlogs";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiChat } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const LandingPages: React.FC = () => {
  const { blogs } = useListBlogs();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row">
      <div className="w-3/4">
        {blogs?.map((blog, i) => (
          <div
            key={i}
            className="p-4 border-b"
            onClick={() => navigate(`/blog/${blog?.slugs}`)}
          >
            <div>
              <h1>Created by {blog?.user.name}</h1>
              <div className="flex flex-row gap-4">
                <div>
                  <h1 className="font-semibold text-2xl">{blog?.title}</h1>
                  <p className="line-clamp-2 opacity-60">{blog?.article}</p>
                </div>
                <img src={blog?.tumbnail} className="h-24" alt="" />
              </div>
              <div className="flex flex-row items-center gap-3">
                <p className="text-sm opacity-60">
                  {dayjs(blog?.created_at).format("MMM DD, YYYY")}
                </p>
                <div className="flex flex-row items-center gap-1 opacity-60">
                  <Icon path={mdiChat} size={0.8} className="" />

                  {blog?.commentslength}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/4 border-l p-4 sticky top-40">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
        voluptate.
      </div>
    </div>
  );
};

export default LandingPages;
