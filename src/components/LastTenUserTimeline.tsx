import { TimelineFormInputs } from "@/types";
import formatDateString from "@/utils/formatDateString";
import { CldImage } from "next-cloudinary";
import { FunctionComponent, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface LastTenUserTimelineProps {
  username: string;
}

const LastTenUserTimeline: FunctionComponent<LastTenUserTimelineProps> = ({
  username,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchUserTimelines = async () => {
    const response = await fetch(
      `/api/user/timelines/?username=${encodeURIComponent(username)}&page=0`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  };

  const { data, isLoading, isError } = useQuery(
    [username, "userTimelines"],
    fetchUserTimelines
  );

  if (isLoading) {
    return (
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md animate-pulse">
        <ul className="divide-y divide-gray-200">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="py-4 space-y-4"
            >
              <div className="h-4 bg-gray-300 w-1/3"></div>

              <div className="h-6 bg-gray-300 w-2/3 my-2"></div>

              <div className="flex gap-2">
                <div className="w-32 h-32 bg-gray-300 rounded"></div>
                <div className="w-32 h-32 bg-gray-300 rounded"></div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-4 bg-gray-300 rounded-lg"></div>
                <div className="p-4 bg-gray-300 rounded-lg"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleNextPhoto = () => {
    console.log(containerRef.current);
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400;
    }
  };

  return (
    <>
      <style>{`
                @media (min-width: 1024px) {
                  .scrollbarstyle::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                  }

                  .scrollbarstyle::-webkit-scrollbar-thumb {
                    background-color: rgba(155, 155, 155, 0.7);
                    border-radius: 4px;
                  }
                }
            `}</style>

      <div className="bg-black">
        {data && data.length > 0 ? (
          <ul className="lg:flex lg:flex-wrap lg:px-2 lg:gap-2 lg:justify-center">
            {data.map((e: TimelineFormInputs, idx: number) => (
              <li
                key={idx}
                className="py-4 space-y-2 lg:w-[29%] lg:h-max relative"
              >
                {e.photo && e.photo.length > 0 && (
                  <div
                    ref={containerRef}
                    className={`flex flex-col w-full h-full lg:flex-row gap-2 lg:overflow-x-auto ${
                      e.photo.length > 1 ? "scrollbarstyle" : ""
                    }`}
                  >
                    {e.photo.map((media: any, mediaIdx: number) => {
                      const isVideo =
                        media.url.includes("/dahu3rii0/video/upload/") &&
                        media.url.endsWith(".mp4");
                      return (
                        <div
                          key={mediaIdx}
                          className="w-full h-auto lg:contents lg:w-max"
                        >
                          {isVideo ? (
                            <video
                              controls
                              width="1024"
                              height="1024"
                              className="object-cover"
                            >
                              <source
                                src={media.url}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <CldImage
                              src={media.url}
                              alt={media.caption || "Timeline Image"}
                              width={1024}
                              height={1024}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {e.links && e.links.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {e.links.map((link: any) => {
                      const isStringLink = typeof link === "string";
                      const linkValue = isStringLink ? link : link.value;
                      const linkCaption =
                        typeof link === "object" && link.caption;

                      return (
                        <div
                          key={linkValue}
                          className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                        >
                          <a
                            href={linkValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" text-blue-600 hover:text-blue-800 font-medium break-words"
                          >
                            {linkValue}
                          </a>
                          <p className="text-base text-gray-500 mt-2">
                            {linkCaption}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="px-2">
                  {e.mainText && (
                    <p className="text-xl text-white mb-2 font-semibold">
                      {e.mainText}
                    </p>
                  )}
                  <p className="text-lg text-gray-300 flex">
                    <span>{formatDateString(e.createdAt)}</span>
                    <Link
                      href={`/nota/${e.urlSlug}`}
                      className="hidden lg:flex w-8 h-8 rounded-full text-white justify-center items-center"
                    >
                      &gt;
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No has realizado tu primer Timeline
          </p>
        )}
      </div>
    </>
  );
};

export default LastTenUserTimeline;
