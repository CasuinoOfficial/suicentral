"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ConnectButton from "./buttons/connectButton";

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

      <ConnectButton />
    </header>
  );
};

export default Header;
