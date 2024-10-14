"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import AppCard from "./cards/appCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IAppCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  appCarouselIndex: number;
  label: string;
  appList: APP_INFO[];
  appCarouselStatus: boolean[];
  setAppCarouselStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  screenWidth: number;
}

const AppCarousel = ({
  appCarouselIndex,
  label,
  appList,
  className,
  appCarouselStatus,
  setAppCarouselStatus,
  screenWidth,
}: IAppCarouselProps) => {
  const batch =
    screenWidth < 768
      ? 2
      : screenWidth < 1024
      ? 3
      : screenWidth < 1280
      ? 4
      : screenWidth < 1440
      ? 5
      : 6;

  const cardOpen = appCarouselStatus.some((status) => status);

  const batchedAppList = appList.reduce((acc, app, index) => {
    const batchIndex = Math.floor(index / batch);
    if (!acc[batchIndex]) {
      acc[batchIndex] = [];
    }
    acc[batchIndex].push(app);
    return acc;
  }, [] as APP_INFO[][]);

  return (
    <div
      className={cn(
        "relative w-full flex flex-col gap-3 2xl:gap-8 pb-[2.5%] group",
        className
      )}
    >
      <h2 className="w-full pl-[4%]">
        <span className=" lg:text-[1.4vw] font-medium drop-shadow-jumbotron-text">
          {label}
        </span>
      </h2>
      <div className="relative h-32 2xl:h-[15svh]"></div>
      <Carousel className="absolute w-full top-12 2xl:top-17 z-[2]">
        <CarouselContent
          className={cn(
            "relative mx-auto pl-[4%] pb-[5%]",
            cardOpen && !appCarouselStatus[appCarouselIndex] && "z-[6]"
          )}
        >
          {batchedAppList.map((appList, index) => (
            <CarouselItem
              key={`${label}-batch-${index}`}
              className="relative w-full flex items-center lg:h-[40%]"
            >
              {appList.map((app, index) => (
                <AppCard
                  key={`${label}-app-${index}`}
                  appIndex={appCarouselIndex}
                  cardIndex={index}
                  app={app}
                  appCarouselStatus={appCarouselStatus}
                  setAppCarouselStatus={setAppCarouselStatus}
                  batch={batch}
                />
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-0 bg-[#14141480] z-[5]" />
        <CarouselNext className="-right-2 top-0 bg-[#14141480] z-[5]" />
      </Carousel>
    </div>
  );
};

export default AppCarousel;
