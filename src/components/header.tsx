"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ConnectButton from "./buttons/connectButton";
import { Button } from "./ui/button";
import SwapModal from "./modals/swapModal";
import { Dialog } from "@/components/ui/dialog";
import { Connect3rdPartyButton } from "@/components/buttons/connect3rdPartybutton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full h-17 flex items-center justify-between px-[4%] z-[30] duration-500 ease-in-out",
        isScrolled
          ? "bg-[#141414]"
          : "bg-gradient-to-b from-[#141414] to-transparent"
      )}
    >
      <span className="text-white text-3xl xl:text-4xl font-bold relative">
        SuiCentral
      </span>
      <div className="flex flex-row gap-4">
        <Connect3rdPartyButton />
        <ConnectButton />
      <SwapModal
        trigger={
          <button
          className={cn(
            "rounded h-8 2xl:h-10 py-1 px-2 md:px-4 2xl:py-2 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2",
          )}
          >Buy Crypto</button>
        }
      />
      </div>

    </header>
  );
};

export default Header;
