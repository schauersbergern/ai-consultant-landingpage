import type { AppSsrPayload } from "@shared/ssr";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const ServerDataContext = createContext<AppSsrPayload | null>(null);

export function ServerDataProvider({
  value,
  children,
}: {
  value: AppSsrPayload | null;
  children: ReactNode;
}) {
  return (
    <ServerDataContext.Provider value={value}>
      {children}
    </ServerDataContext.Provider>
  );
}

export function useServerData() {
  return useContext(ServerDataContext);
}
