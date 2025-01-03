"use client";

import { useEffect, useRef, useState } from "react";
import { cn, MetricsTracker } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import TwitterIconLink from "../buttons/twitterIcon";
import { FaTelegram, FaTwitter, FaPlay } from "react-icons/fa";
import { EVENTS } from "@/constants/metricsConstants";

interface IAppCardProps {
  appIndex: number;
  cardIndex: number;
  app: APP_INFO;
  appCarouselStatus: boolean[];
  setAppCarouselStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  batch: number;
  isMobile: boolean;
  setSelectedApp: React.Dispatch<React.SetStateAction<string>>;
}

const AppCard = ({
  appIndex,
  cardIndex,
  app,
  appCarouselStatus,
  setAppCarouselStatus,
  batch,
  isMobile,
  setSelectedApp,
}: IAppCardProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHover = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpened(true);
    }, 500);
  };

  const handleLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsOpened(false);
  };

  useEffect(() => {
    if (isOpened) {
      const newStatus = appCarouselStatus.map(() => true);
      newStatus[appIndex] = false;
      setAppCarouselStatus(newStatus);
    } else {
      const newStatus = appCarouselStatus.map(() => false);
      setAppCarouselStatus(newStatus);
    }
  }, [isOpened]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleWidth = entry.intersectionRect.width;
            const totalWidth = entry.boundingClientRect.width;
            if (visibleWidth >= totalWidth / 10) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: [0.25], // Trigger callback when 25% of the element is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Card */}
      <div
        className={cn(
          "relative pl-1 xl:pl-2",
          batch === 2
            ? "basis-[60%]"
            : batch === 3
            ? "basis-[33.3333%]"
            : batch === 4
            ? "basis-[25%]"
            : batch === 5
            ? "basis-[20%]"
            : "basis-[16%]"
        )}
        ref={cardRef}
      >
        {/* Transparent Spot */}
        <div className="relative aspect-[16/9] bg-transparent" />
        {/* Real Content */}
        {isMobile ? (
          <button
            className={cn(
              "absolute pl-1 xl:pl-2 top-0 left-0 w-full z-[5] overflow-hidden"
            )}
            onClick={() =>
              setSelectedApp(app.title.toLowerCase().replaceAll(" ", ""))
            }
          >
            {/* Image */}
            <div
              className={cn(
                "aspect-[16/9] flex flex-col justify-between items-center overflow-hidden p-1 bg-contain bg-center bg-fixed bg-no-repeat bg-black",
                isOpened ? "rounded-t-[4px]" : "rounded-[4px]"
              )}
              style={{
                backgroundImage: `url(${
                  app.jumbotron_image !== ""
                    ? app.jumbotron_image
                    : "/defi/sui-app.png"
                })`,
              }}
            >
              {/* Upper region */}
              <div className="w-full flex items-center justify-between h-[14%]">
                {/* <span>test</span>
          <span>test</span> */}
              </div>
              {/* Lower region */}
              <div className="w-full flex items-center justify-center h-[10%]">
                {/* <span>test</span> */}
              </div>
            </div>
          </button>
        ) : (
          <Link
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "absolute pl-1 xl:pl-2 cursor-pointer duration-300 ease-in-out",
              isOpened
                ? cardIndex === 0
                  ? "-top-[90%] left-0 w-[150%] z-[50]"
                  : cardIndex === batch - 1
                  ? "-top-[90%] -left-[50%] w-[150%] z-[50]"
                  : "-top-[90%] -left-[20%] w-[150%] z-[50]"
                : "top-0 left-0 w-full z-[5] overflow-hidden"
            )}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => MetricsTracker.track(EVENTS.LINK_CLICKED, { link: app.url })}
          >
            {/* Image */}
            <div
              className={cn(
                "relative aspect-[16/9] overflow-hidden p-1 bg-black",
                isOpened ? "rounded-t-[4px]" : "rounded-[4px]"
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  "relative w-full h-full flex flex-col justify-between items-center overflow-hidden p-1 bg-contain bg-center bg-fixed bg-no-repeat bg-transparent z-[5]"
                )}
                style={{
                  backgroundImage: `url(${
                    app.jumbotron_image !== ""
                      ? app.jumbotron_image
                      : "/defi/sui-app.png"
                  })`,
                }}
              >
                {/* Upper region */}
                <div className="w-full flex items-center justify-between h-[14%]">
                  {/* <span>test</span>
                  <span>test</span> */}
                </div>
                {/* Lower region */}
                <div className="w-full flex items-center justify-center h-[10%]">
                  {/* <span>test</span> */}
                </div>
              </div>
              {/* Expands image */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-transparent scale-[3] blur-xl"
                style={{
                  backgroundImage: `url(${
                    app.jumbotron_image !== ""
                      ? app.jumbotron_image
                      : "/defi/sui-app.png"
                  })`,
                  filter: "blur(24px)",
                  WebkitFilter: "blur(24px)",
                }}
              />
            </div>

            {/* Content */}
            <div
              className={cn(
                "w-full p-4 flex flex-col gap-2 duration-300 ease-in-out shadow-lg shadow-slate-900/60 rounded-b-[4px]",
                isOpened ? "bg-black" : "opacity-0 h-[0px]"
              )}
            >
              <div className="w-full h-10 flex items-center gap-3">
                <div className="w-10 aspect-square rounded-[50%] bg-white flex items-center justify-center hover:opacity-80 active:opacity-60 aria-pressed:opacity-60 duration-300 ease-in-out">
                  <FaPlay className="text-black text-[18px] ml-1" />
                </div>
                {app.twitter && app.twitter !== "" && (
                  // <SocialMediaIcon
                  //   url={app.twitter}
                  //   Icon={FaTwitter}
                  //   color="#ffffff"
                  //   iconClass="text-[28px]"
                  // />
                  <TwitterIconLink url={app.twitter} size={28} color="white" />
                )}
              </div>

              <h3 className="text-lg font-semibold">{app.title}</h3>
              <span className="text-white/80">{app.tagline}</span>
              <span className="text-sm text-white/80">
                {app.tags.join(", ")}
              </span>
            </div>
          </Link>
        )}

        {/* Absolute */}
        <div
          className={cn(
            "absolute pl-1 xl:pl-2 top-0 left-0 w-full h-full rounded-[4px] duration-300 ease-in-out",
            isVisible
              ? "opacity-0 bg-transparent -z-10"
              : "opacity-40 bg-black z-[10]"
          )}
        />
      </div>
    </>
  );
};

export default AppCard;
