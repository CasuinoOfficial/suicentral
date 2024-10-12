import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
        "fixed top-0 w-full h-17 flex items-center px-[4%] z-[30] duration-500 ease-in-out",
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black to-transparent"
      )}
    >
      <span className="text-white text-4xl font-bold relative">SuiCentral</span>
    </header>
  );
};

export default Header;
