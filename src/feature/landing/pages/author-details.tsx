import React from "react";
import LandingPages from "./blog-list";
import { useAuthorDetails } from "../hooks/useAuthorDetails";
import Loaders from "@/components/loading/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";

const AuthorDetails: React.FC = () => {
  const { authorDetails, isError, isLoading, username } = useAuthorDetails();
  return (
    <div>
      <div>
        {isLoading && <Loaders />}
        {isError && <p>Error loading author details</p>}
        {authorDetails && (
          <div className="flex flex-row gap-3 my-10 items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={authorDetails?.profileUrl || ""}
                className="object-cover"
              />
              <AvatarFallback>
                {authorDetails?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {/* Header */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{authorDetails.name}</h1>
              <p className="text-base text-gray-500">
                @{authorDetails.username}
              </p>
              <p className="text-base text-gray-500">
                Joined on{" "}
                {dayjs(authorDetails.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        )}
      </div>

      <LandingPages
        isChildrenFromAuthor
        isChildrenFromAuthorUsername={username}
      />
    </div>
  );
};

export default AuthorDetails;
