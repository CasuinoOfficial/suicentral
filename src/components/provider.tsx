"use client";

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";
import { createInMemoryStorage, createLocalStorage } from "@mysten/enoki";
import { provider } from "@/client/suiClient";
import AmplitudeContextProvider from "@/context/AmplitudeContext";

type Network = "mainnet" | "testnet" | undefined;

// if pnpm testnet, make provider testnet
// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  let defaultNetName: Network;
  if (process.env.NEXT_PUBLIC_ENV === "test") {
    defaultNetName = "testnet";
  } else {
    defaultNetName = "mainnet";
  }

  const store = useMemo(
    () =>
      typeof window === "undefined"
        ? createInMemoryStorage()
        : createLocalStorage(),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        defaultNetwork={defaultNetName}
        networks={networkConfig}
      >
        <WalletProvider
          autoConnect
          stashedWallet={{
            name: "Sui Central",
          }}
        >
          <AmplitudeContextProvider>
            {children}
          </AmplitudeContextProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Provider;
