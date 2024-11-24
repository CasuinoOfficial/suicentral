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
import { MetaMaskProvider } from "@metamask/sdk-react";
import AmplitudeContextProvider from "@/context/AmplitudeContext";
import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import allConnections from "@/lib/connectors";

type Network = "mainnet" | "testnet" | undefined;

// if pnpm testnet, make provider testnet
// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});

const queryClient = new QueryClient();

const connections: [Connector, Web3ReactHooks][] = allConnections.map(
  ([connector, hooks]) => [connector, hooks],
);

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
    [],
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
            <MetaMaskProvider
              sdkOptions={{
                dappMetadata: {
                  name: "Example React Dapp",
                  url: "https:suicentral.xyz",
                },
              }}
            >
              <Web3ReactProvider connectors={connections}>
                {children}
              </Web3ReactProvider>
            </MetaMaskProvider>
          </AmplitudeContextProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Provider;
