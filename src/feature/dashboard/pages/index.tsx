import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import Loaders from "@/components/loading/loaders";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Empty from "@/components/empty";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const DashboardPages: React.FC = () => {
  const { dashboard, isLoadingDashboard } = useDashboard();

  if (isLoadingDashboard) {
    return (
      <div>
        <Loaders />
      </div>
    );
  }

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = month.map((name, index) => {
    const match = dashboard?.countBlogs.find((item) => item.title === index);
    return {
      month: name,
      count: match ? match.count : 0,
    };
  });

  const chartConfig = {
    count: {
      label: "Count",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3 h-[400px]">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold">Leaderboard</h2>
              <p className="text-sm text-gray-500">
                This is leaderboard of user blogs
              </p>
            </CardHeader>
            <CardContent className="overflow-y-auto h-full">
              <div className="flex flex-col divide-y-[1px]">
                {(dashboard?.leaderboard || [])?.length > 0 ? (
                  dashboard?.leaderboard?.map((item, idx) => (
                    <div key={idx} className="py-2">
                      <Link to={`/author/${item.username}`}>
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-2">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarImage
                                src={item?.profileUrl || ""}
                                alt={item?.name}
                                className="object-cover"
                              />
                              <AvatarFallback className="rounded-lg">
                                {item?.name
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-sm font-bold">
                                {item?.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {item?.email}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-bold">{item?.blogs}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <Empty />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 flex flex-col gap-5 h-[400px]">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold">Today's Blog</h2>
              <p className="text-sm text-gray-500">
                Latest blogs from your blog
              </p>
            </CardHeader>
            <CardContent className="overflow-y-auto h-full divide-y-[1px]">
              {(dashboard?.blogs?.length || 0) > 0 ? (
                (dashboard?.blogs || []).map((item, ix) => (
                  <div className="py-2" key={ix}>
                    <Link to={`/blog/${item?.slugs}`}>
                      <h3 className="text-sm font-bold">{item?.title}</h3>
                      <p className="text-xs text-gray-500">
                        {dayjs(item?.createdAt).format("MMM DD, YYYY")}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Today's User</h2>
            </CardHeader>
            <CardContent>
              {(dashboard?.blogs?.length || 0) > 0 ? (
                (dashboard?.blogs || []).map((item, ix) => <>a</>)
              ) : (
                <>
                  <Empty />
                </>
              )}
            </CardContent>
          </Card> */}
        </div>
        <div className="col-span-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Blogs Count</h2>
                <p className="text-sm text-gray-500">
                  This is the blogs count per month
                </p>
              </div>
              <h5 className="text-xl font-semibold">
                {dayjs().format("YYYY")}
              </h5>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <Bar dataKey={"count"} radius={4} fill="var(--color-count)" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text)" }}
                    tickFormatter={(value) => {
                      const monthIndex = month.indexOf(value);
                      return month[monthIndex];
                    }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                    wrapperStyle={{ outline: "none" }}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
