"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DEFI_APP_LIST,
  GAMING_APP_LIST,
  SOCIAL_APP_LIST,
  MEMECOINS_APP_LIST,
  ETC_APP_LIST,
} from "@/constants";
import Header from "@/components/header";
import { ExternalLink } from "lucide-react";
import AppCarousel from "@/components/appCarousel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useMediaSize from "@/hooks/useMediaSize";
import { FaTelegram } from "react-icons/fa";
import TwitterIconLink from "@/components/buttons/twitterIcon";

export default function Home() {
  const screenWidth = useMediaSize();
  const defiList = Object.values(DEFI_APP_LIST);
  const gamingList = Object.values(GAMING_APP_LIST);
  const memecoinsList = Object.values(MEMECOINS_APP_LIST);
  const socialList = Object.values(SOCIAL_APP_LIST);
  const etcList = Object.values(ETC_APP_LIST);
  const appList = [
    { label: "Gaming Apps", list: gamingList },
    { label: "DeFi Apps", list: defiList },
    { label: "Memecoins", list: memecoinsList },
    { label: "Socials", list: socialList },
    { label: "ETCs", list: etcList },
  ];
  const defaultAppCarouselStatus = appList.map(() => false);
  const [appCarouselStatus, setAppCarouselStatus] = useState(
    defaultAppCarouselStatus
  );
  const jumbotronApp = GAMING_APP_LIST.doubleup;

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

        {/* Apps */}
        <div className="relative w-full flex flex-col py-[10%] 2xl:pt-[6%] overflow-hidden">
          {appList.map((app, index) => (
            <AppCarousel
              key={`${app}-carousel-${index}`}
              appCarouselIndex={index}
              label={app.label}
              appList={app.list}
              className={cn(
                appCarouselStatus[index] ? "pointer-events-none z-[2]" : "z-[5]"
              )}
              appCarouselStatus={appCarouselStatus}
              setAppCarouselStatus={setAppCarouselStatus}
              screenWidth={screenWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
