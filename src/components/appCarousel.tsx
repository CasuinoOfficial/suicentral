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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ALL_APP_LIST } from "@/constants";
import { ExternalLink, X } from "lucide-react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string>("");
  const displayApp =
    ALL_APP_LIST[selectedApp && selectedApp !== "" ? selectedApp : "example"];
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

  useEffect(() => {
    if (selectedApp !== "") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [selectedApp]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
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
        <div className="relative h-24.5 xl:h-32 2xl:h-[13svh]"></div>
        <Carousel className="absolute w-full top-6 xl:top-12 2xl:top-17 z-[2]">
          <CarouselContent
            className={cn(
              "relative mx-auto pl-[4%] pb-[5%] h-fit",
              cardOpen && !appCarouselStatus[appCarouselIndex] && "z-[6]"
            )}
          >
            {batchedAppList.map((appList, index) => (
              <CarouselItem
                key={`${label}-batch-${index}`}
                className="relative w-full flex items-center h-fit lg:h-[40%]"
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
                    isMobile={screenWidth < 1280}
                    setSelectedApp={setSelectedApp}
                  />
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          {batchedAppList.length > 1 && (
            <>
              <CarouselPrevious className="left-0 top-0 bg-[#14141480] z-[5]" />
              <CarouselNext className="right-0 xl:-right-2 top-0 bg-[#14141480] z-[5]" />
            </>
          )}
        </Carousel>
        {/* Mobile Modal */}
        <DialogContent className="w-[90%] min-h-80 flex flex-col items-center rounded-md border-none !outline-none !ring-0 bg-[#141414] overflow-hidden gap-2 p-4 md:pt-12 md:px-6 !pb-6">
          <DialogHeader className="pt-2 w-full">
            <DialogTitle className="visually-hidden">
              {displayApp?.title ?? ""} modal
            </DialogTitle>
          </DialogHeader>

          <div className="relative w-full flex flex-col z-10">
            <span className="relative text-2xl font-bold drop-shadow-xl z-[6]">
              {displayApp?.title}
            </span>

            <Link
              href={displayApp?.url ?? ""}
              className="relative w-fit font-semibold h-7 md:h-8 pl-3 pr-2.5 py-1 rounded-[4px] flex items-center gap-1 basic-component-statement-1 z-[6] mt-10"
            >
              <span className="text-black text-[10px] md:text-xs">
                Launch App
              </span>
              <ExternalLink
                className="text-black"
                size={screenWidth < 768 ? 12 : 16}
              />
            </Link>
            {/* absolute */}
            <div className="absolute w-full h-full top-0 bg-gradient-to-r from-black to-transparent blur-[30px] z-[5]" />
          </div>

          <div className="relative w-full flex flex-col z-10 mt-8 md:mt-12 gap-3 md:text-lg text-white/80">
            <span>{displayApp?.description}</span>
            <span className="text-base">{displayApp?.tags.join(", ")}</span>
          </div>

          {/* Absolute Close button */}
          <button
            className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-9 aspect-square rounded-[50%] flex items-center justify-center bg-[#0c0c0c]"
            onClick={() => {
              setSelectedApp("");
              setModalOpen(false);
            }}
          >
            <X size={20} className="text-white/80" />
          </button>
          {/* Absolute App Image */}
          <div
            className="absolute left-0 top-0 z-0 w-full h-44 md:h-60 bg-cover bg-top bg-no-repeat bg-[#141414] flex flex-col items-center justify-end"
            style={{
              backgroundImage: `url(${
                displayApp?.jumbotron_image &&
                displayApp?.jumbotron_image !== ""
                  ? displayApp?.jumbotron_image
                  : "/defi/sui-app.png"
              })`,
            }}
          >
            <div className="w-full bg-gradient-to-b from-transparent from-[20%] to-[#141414] to-[65%] h-[30%]" />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AppCarousel;
