"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEFI_APP_LIST } from "@/constants";
import Header from "@/components/header";
import { ExternalLink } from "lucide-react";
import AppCarousel from "@/components/appCarousel";

export default function Home() {
  const defiList = Object.values(DEFI_APP_LIST);
  const [currentLink, setCurrentLink] = useState(defiList[0]);

  return (
    <div className="relative w-full h-svh flex flex-col">
      <Header />

      {/* Absolute Jumbotron */}
      <Image
        className="fixed z-0"
        src={currentLink.jumbotron_image}
        alt="Jumbotron"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-full bg-gradient-to-b from-transparent to-black to-[65%] h-[30%] fixed z-[1] bottom-0" />

      <div className="relative w-full flex flex-col z-[1] top-0 bg-transparent mt-17">
        {/* Hidden H1 */}
        <div className="w-full flex items-center">
          <h1 className="visually-hidden">SuiCentral Home Page</h1>
        </div>
        {/* Jumbotron Content */}
        <div className="mt-[4%] px-[4%]">
          <div className="w-104 flex flex-col gap-3">
            <Image
              className="w-[90%]"
              src="/gaming/doubleup-text-logo_380_120.png"
              alt="app logo"
              width={380}
              height={120}
            />
            {/* Description */}
            <div className="relative w-full flex flex-col gap-6 pb-10 pr-2">
              {/* Content */}
              <span className="relative text-lg font-medium drop-shadow-jumbotron-text z-[5]">
                {DEFI_APP_LIST.doubleup.description}
              </span>
              {/* Buttons */}
              <div className="relative flex items-center gap-3 z-[5]">
                <Link
                  href={DEFI_APP_LIST.doubleup.url}
                  className="font-semibold h-12 pl-6 pr-5 py-1 rounded-[4px] flex items-center gap-3 basic-component-statement-1"
                >
                  <span className="text-black text-lg">Launch App</span>
                  <ExternalLink className="text-black" />
                </Link>
              </div>
              {/* absolute */}
              <div className="absolute w-full h-full top-0 bg-gradient-to-b from-black to-transparent blur-[60px]" />
            </div>
          </div>
        </div>

        {/* Apps */}
        <div className="w-full flex flex-col mt-[9%] mb-[5%]">
          <AppCarousel label="The most popular dApp" appList={defiList} />
          <AppCarousel label="DeFi dApp" appList={defiList} />
        </div>
      </div>
    </div>
  );
}
