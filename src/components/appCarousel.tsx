"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AppCard from "./cards/appCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import { ALL_APP_LIST } from "@/constants";
import MobileModal from "./modals/mobileModal";
// import { checkIsMobileDevice } from "@/lib/utils";

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
  // const isMobileDevice = checkIsMobileDevice();
  const [isClient, setIsClient] = useState(false);
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

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }

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
        <MobileModal
          displayApp={displayApp}
          setSelectedApp={setSelectedApp}
          setModalOpen={setModalOpen}
        />
      </div>
    </Dialog>
  );
};

export default AppCarousel;
