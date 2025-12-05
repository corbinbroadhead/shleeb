import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface BuzzerContextValue {
  buzzEnabled: boolean;
  setBuzzEnabled: (value: boolean) => void;
}

const BuzzerContext = createContext<BuzzerContextValue | undefined>(undefined);

export const BuzzerProvider = ({ children }: { children: ReactNode }) => {
  const [buzzEnabled, setBuzzEnabledState] = useState(true); // default true
  const [hydrated, setHydrated] = useState(false);

  // Load stored preference
  useEffect(() => {
    AsyncStorage.getItem("buzzEnabled")
      .then(value => {
        if (value !== null) setBuzzEnabledState(value === "true");
      })
      .finally(() => setHydrated(true));
  }, []);

  // Persist changes
  const setBuzzEnabled = (value: boolean) => {
    setBuzzEnabledState(value);
    AsyncStorage.setItem("buzzEnabled", value.toString()).catch(console.warn);
  };

  // Wait until preference is loaded before rendering children
  if (!hydrated) return null;

  return (
    <BuzzerContext.Provider value={{ buzzEnabled, setBuzzEnabled }}>
      {children}
    </BuzzerContext.Provider>
  );
};

export const useBuzzer = () => {
  const context = useContext(BuzzerContext);
  if (!context) throw new Error("useBuzzer must be used within a BuzzerProvider");
  return context;
};
