import { getLoginUrl } from "@/const";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  // Authentication removed
  return {
    user: null as any,
    loading: false,
    error: null,
    isAuthenticated: false,
    refresh: () => { },
    logout: async () => { },
  };
}
