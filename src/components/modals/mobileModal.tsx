"use client";

import Link from "next/link";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TwitterIconLink from "../buttons/twitterIcon";
import { X } from "lucide-react";
import { MetricsTracker } from "@/lib/utils";
import { EVENTS } from "@/constants/metricsConstants";

interface IMobileModalProps {
  displayApp: APP_INFO;
  setSelectedApp: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileModal = ({
  displayApp,
  setSelectedApp,
  setModalOpen,
}: IMobileModalProps) => {
  return (
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

        <div className="relative w-full flex items-center gap-3 z-[6] mt-10">
          <Link
            href={displayApp?.url ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-fit font-semibold h-7 md:h-8 pl-3 pr-2.5 py-1 rounded-[4px] flex items-center gap-1 basic-component-statement-1"
            onClick={() => MetricsTracker.track(EVENTS.LINK_CLICKED, { link: displayApp.url })}
          >
            <span className="text-black text-[10px] md:text-xs">
              Launch App
            </span>
            {/* <ExternalLink
              className="text-black"
              size={screenWidth < 768 ? 12 : 16}
            /> */}
          </Link>
          {displayApp?.twitter && displayApp?.twitter !== "" && (
            <TwitterIconLink
              url={displayApp?.twitter}
              size={24}
              color="white"
            />
          )}
        </div>

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
            displayApp?.jumbotron_image && displayApp?.jumbotron_image !== ""
              ? displayApp?.jumbotron_image
              : "/defi/sui-app.png"
          })`,
        }}
      >
        <div className="w-full bg-gradient-to-b from-transparent from-[20%] to-[#141414] to-[65%] h-[30%]" />
      </div>
    </DialogContent>
  );
};

export default MobileModal;
