"use client";

import { cn, MetricsTracker, shortenAddress } from "@/lib/utils";
import "@mysten/dapp-kit/dist/index.css";
import { ConnectModal, useCurrentWallet } from "@mysten/dapp-kit";
import { Wallet } from "lucide-react";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { EVENTS } from "@/constants/metricsConstants";
import { useEffect } from "react";

const ConnectButton = () => {
  const currentAccount = useCurrentAccount();
  const disconnect = useDisconnectWallet();
  const wallet = useCurrentWallet().currentWallet;

  useEffect(() => {
    if (currentAccount) {
      MetricsTracker.track(EVENTS.WALLET_CONNECTED, { address: currentAccount?.address, wallet_type: wallet?.name });
    }
  }, [currentAccount, wallet]);

  if (currentAccount) {
    return (
      <button
        className={cn(
          "rounded h-8 2xl:h-10 py-1 px-2 md:px-4 2xl:py-2 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2"
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
            "rounded h-8 2xl:h-10 py-1 px-2 md:px-4 2xl:py-2 bg-[#4DA2FF] text-white flex items-center text-sm font-medium gap-2"
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
