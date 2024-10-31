import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as amplitude from "@amplitude/analytics-browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkIsMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-5)}`;
};

export class MetricsTracker {
  static identify(userId: string) {
    amplitude.setUserId(userId);
  }

  static track(eventType: string, properties: any) {
    amplitude.track(eventType, properties);
  }
}
