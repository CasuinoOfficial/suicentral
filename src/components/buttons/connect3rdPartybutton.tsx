import { useExternalWalletStore } from "@/store/externalWalletStore";
import { Button } from "../ui/button";
import { ConnectExternalModal } from "@/components/modals/connectExternalModal";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const Connect3rdPartyButton = () => {
  const {
    metamaskAddress,
    phantomAddress,
    setMetamaskAddress,
    setPhantomAddress,
  } = useExternalWalletStore();

  const handleDisconnect = () => {
    setMetamaskAddress(null);
    setPhantomAddress(null);
  };

  if (metamaskAddress || phantomAddress) {
    return <Button className={cn(
      "rounded h-8 2xl:h-10 py-1 px-2 md:px-4 2xl:py-2 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2",
    )} onClick={handleDisconnect}>Disconnect</Button>;
  }

  return (
    <ConnectExternalModal
      trigger={
        <button
          className={cn(
            "rounded h-8 2xl:h-10 py-1 px-2 md:px-4 2xl:py-2 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2",
          )}
        >
          <Wallet size={16} />
          <h1 className='hidden md:inline-block'>Connect Non Sui Wallet</h1>
        </button>
      }
    />
  );
};

export { Connect3rdPartyButton };
