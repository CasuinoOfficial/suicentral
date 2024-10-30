import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

export const chain = "sui:testnet";

export const mainnetProvider = new SuiClient({
  url: getFullnodeUrl("mainnet"),
});
export const testnetProvider = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export const provider =
  process.env.NEXT_PUBLIC_ENV === "test" ? testnetProvider : mainnetProvider;
