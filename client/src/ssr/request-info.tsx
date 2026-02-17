import type { RequestInfo } from "@shared/ssr";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const DEFAULT_REQUEST_INFO: RequestInfo = {
  origin: "",
  href: "",
  pathname: "/",
  search: "",
};

const RequestInfoContext = createContext<RequestInfo>(DEFAULT_REQUEST_INFO);

export function RequestInfoProvider({
  value,
  children,
}: {
  value: RequestInfo;
  children: ReactNode;
}) {
  return (
    <RequestInfoContext.Provider value={value}>
      {children}
    </RequestInfoContext.Provider>
  );
}

export function useRequestInfo() {
  return useContext(RequestInfoContext);
}

export function getBrowserRequestInfo(): RequestInfo {
  if (typeof window === "undefined") {
    return DEFAULT_REQUEST_INFO;
  }

  return {
    origin: window.location.origin,
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
  };
}
