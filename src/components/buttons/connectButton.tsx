"use client";

import { cn, shortenAddress } from "@/lib/utils";
import "@mysten/dapp-kit/dist/index.css";
import { ConnectModal } from "@mysten/dapp-kit";
import { Wallet } from "lucide-react";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

const ConnectButton = () => {
  const currentAccount = useCurrentAccount();
  const disconnect = useDisconnectWallet();

  if (currentAccount) {
    return (
      <button
        className={cn(
          "rounded h-8 py-1 px-2 md:px-4 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2"
        )}
        onClick={() => {
          disconnect.mutate();
        }}
      >
        <Wallet size={16} />
        <h1 className="hidden md:inline-block">
          {shortenAddress(currentAccount?.address)}
        </h1>
      </button>
    );
  }

  return (
    <ConnectModal
      trigger={
        <button
          className={cn(
            "rounded h-8 py-1 px-2 md:px-4 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2"
          )}
        >
          <Wallet size={16} />
          <h1 className="hidden md:inline-block">Connect Wallet</h1>
        </button>
      }
    />
  );
};

export default ConnectButton;
