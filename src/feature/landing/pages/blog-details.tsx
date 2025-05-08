import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogDetails } from "../hooks/useBlogDetails";
import Loaders from "@/components/loading/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiCircleSmall, mdiSend } from "@mdi/js";
import dayjs from "dayjs";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';

const BlogDetailsPages: React.FC = () => {
  const params = useParams();
  const {
    blogDetails,
    isError,
    isLoading,
    comments,
    isLoadingComments,
    sendComments,
  } = useBlogDetails(params.slug as string);
  const [comment, setComment] = React.useState<string>("");
  const { users } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        {isLoading && <Loaders />}
        {isError && <p>Error loading blog details</p>}
        {blogDetails && (
          <div className="flex flex-col gap-3 my-16">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-2">
              <div
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 cursor-pointer"
              >
                <Icon path={mdiChevronLeft} size={1} className="rounded-full" />
                <span className="text-sm">Back</span>
              </div>
              <h1 className="text-3xl font-bold">{blogDetails.title}</h1>
              <div className="flex items-center gap-2">
                <div
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() =>
                    navigate("/author/" + blogDetails.author.username)
                  }
                >
                  <Avatar>
                    <AvatarImage
                      sizes="sm"
                      src={blogDetails?.author?.profileUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {blogDetails?.author?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-base text-gray-500">
                    {blogDetails?.author?.name}
                  </p>
                </div>
                <Icon
                  path={mdiCircleSmall}
                  size={1}
                  className="text-gray-500"
                />
                <p className="text-base text-gray-500">
                  {dayjs(blogDetails.createdAt).format("MMM D, YYYY")}
                </p>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4 items-center">
              <img
                src={blogDetails.tumbnailUrl}
                alt={blogDetails.title}
                className="w-1/2"
              />
              {/* <ReactQuill theme="" value={blogDetails.article} />; */}
              <div dangerouslySetInnerHTML={{ __html: blogDetails.article }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-10 mb-3">Comments</h2>
              {users?.token && (
                <form>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      prefix=""
                      placeholder="Write comments"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        sendComments.mutateAsync(comment).then(() => {
                          setComment("");
                        });
                      }}
                    >
                      <Icon path={mdiSend} />
                    </Button>
                  </div>
                </form>
              )}
              {isLoadingComments && <Loaders />}
              <div className="flex flex-col gap-2 divide-y py-5">
                {(comments?.item || [])?.length > 0 ? (
                  comments?.item
                    ?.sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    ?.map((comment) => (
                      <>
                        <div
                          key={comment.id}
                          className="flex flex-col gap-2 py-5"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src={comment?.userProfile}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {comment.userName
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold">
                                {comment.userName}
                              </p>
                              <p>
                                <span className="text-sm text-gray-500">
                                  {dayjs(comment.createdAt).format(
                                    "MMM D, YYYY"
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                          <p className="text-base text-foreground/80">
                            {comment.comment}
                          </p>
                        </div>
                      </>
                    ))
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-foreground/80">
                      No comments yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPages;
