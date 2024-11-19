"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ConnectButton from "./buttons/connectButton";
import { Button } from "./ui/button";
import SwapModal from "./modals/swapModal";
import { Dialog } from "@/components/ui/dialog";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

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
      <div className="flex flex-row">
        <Button onClick={() => {
          console.log("clicked")
          setIsSwapModalOpen((prev) => !prev);
        }
        }>Swap Cross-Chain</Button>
        <ConnectButton />
      </div>
      <Dialog
        open={isSwapModalOpen}
        onOpenChange={setIsSwapModalOpen}
      >
        <SwapModal setModalOpen={setIsSwapModalOpen}/>
      </Dialog>
    </header>
  );
};

export default Header;
