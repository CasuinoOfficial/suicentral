"use client";
import { create } from "zustand";

type ExternalWalletStore = {
  metamaskAddress: string | null;
  phantomAddress: string | null;
  setMetamaskAddress: (address: string | null) => void;
  setPhantomAddress: (address: string | null) => void;
};

const useExternalWalletStore = create<ExternalWalletStore>()(set => ({
  metamaskAddress: null,
  phantomAddress: null,
  setMetamaskAddress: (address: string | null) =>
    set(state => ({
      metamaskAddress: address,
    })),
  setPhantomAddress: (address: string | null) =>
    set(state => ({
      phantomAddress: address,
    })),
}));

export { useExternalWalletStore };
