"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DEFI_APP_LIST,
  GAMING_APP_LIST,
  SOCIAL_APP_LIST,
  MEMECOINS_APP_LIST,
} from "@/constants";
import Header from "@/components/header";
import { ExternalLink } from "lucide-react";
import AppCarousel from "@/components/appCarousel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useMediaSize from "@/hooks/useMediaSize";
import { Dialog } from "@/components/ui/dialog";

export default function Home() {
  const screenWidth = useMediaSize();
  const defiList = Object.values(DEFI_APP_LIST);
  const gamingList = Object.values(GAMING_APP_LIST);
  const defaultAppCarouselStatus = [false, false];
  const [appCarouselStatus, setAppCarouselStatus] = useState(
    defaultAppCarouselStatus
  );

  return (
    <div className="relative w-full h-svh flex flex-col">
      {/* Hidden H1 */}
      <div className="w-full flex items-center">
        <h1 className="visually-hidden">SuiCentral Home Page</h1>
        <Header />
      </div>

      {/* Absolute Jumbotron */}
      <div
        className="absolute left-0 top-0 z-0 w-full h-full aspect-[1280/720] bg-contain bg-top bg-no-repeat bg-black flex flex-col items-center justify-end"
        style={{
          backgroundImage: `url(${GAMING_APP_LIST.doubleup.jumbotron_image})`,
        }}
      >
        <div className="w-full bg-gradient-to-b from-transparent from-[20%] to-black to-[65%] h-[50%]" />
      </div>

      {/* Content */}
      <div className="relative top-0 mt-17 w-full flex flex-col z-[2] bg-transparent">
        {/* Jumbotron Content */}
        <div className="md:mt-[4%] lg:mt-[11%] 2xl:mt-[20%] px-[4%]">
          <div className="relative w-[60%] md:w-[50%] lg:w-[33%] xl:w-[33%] flex flex-col gap-3">
            <Image
              className="relative w-[80%] md:w-fit z-[5]"
              src="/gaming/doubleup-text-logo_380_120.png"
              alt="app logo"
              width={380}
              height={120}
            />
            {/* Description */}
            <div className="relative w-full flex flex-col gap-6 lg:pb-10 pr-2">
              {/* Content */}
              <span className="relative text-xs xl:text-lg 2xl:text-[30px] !leading-[130%] font-medium drop-shadow-jumbotron-text z-[5]">
                {GAMING_APP_LIST.doubleup.description}
              </span>
              {/* Buttons */}
              <div className="relative flex items-centergap-3 z-[5]">
                <Link
                  href={GAMING_APP_LIST.doubleup.url}
                  className="font-semibold h-8 xl:h-12 pl-3 pr-2.5 xl:pl-6 xl:pr-5 py-1 rounded-[4px] flex items-center gap-1 xl:gap-3 basic-component-statement-1"
                >
                  <span className="text-black text-xs xl:text-lg">
                    Launch App
                  </span>
                  <ExternalLink
                    className="text-black"
                    size={screenWidth < 1280 ? 16 : 24}
                  />
                </Link>
              </div>
            </div>

            {/* absolute */}
            <div className="absolute w-full h-full top-0 bg-gradient-to-r from-black to-transparent blur-[60px]" />
          </div>
        </div>

        {/* Apps */}
        <div className="relative w-full flex flex-col py-[10%] 2xl:pt-[6%] overflow-hidden">
          <AppCarousel
            appCarouselIndex={1}
            label="Gaming Apps"
            appList={gamingList}
            className={cn(
              appCarouselStatus[1] ? "pointer-events-none z-[2]" : "z-[5]"
            )}
            appCarouselStatus={appCarouselStatus}
            setAppCarouselStatus={setAppCarouselStatus}
            screenWidth={screenWidth}
          />
          <AppCarousel
            appCarouselIndex={0}
            label="DeFi Apps"
            appList={defiList}
            className={cn(
              appCarouselStatus[0] ? "pointer-events-none z-[2]" : "z-[5]"
            )}
            appCarouselStatus={appCarouselStatus}
            setAppCarouselStatus={setAppCarouselStatus}
            screenWidth={screenWidth}
          />
        </div>
      </div>
    </div>
  );
}
