"use client";
import { useEffect, createContext } from "react";
import { init, track } from "@amplitude/analytics-browser";

export const AmplitudeContext = createContext({});

const AmplitudeContextProvider = ({ children }: { children: any}) => {
  useEffect(() => {
    init("bffb8a7ee33d1b6767574c7eafb6da4", undefined, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
      },
    });
  }, []);
  
  const trackAmplitudeEvent = (eventName: any, eventProperties: any) => {
    track(eventName, eventProperties);
};

const value = { trackAmplitudeEvent };

return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;