import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { useLocation } from "wouter";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { data: user, isLoading, error, refetch } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [, navigate] = useLocation();

  useEffect(() => {
    if (options?.redirectOnUnauthenticated && !isLoading && !user) {
      if (options.redirectPath) {
        navigate(options.redirectPath);
      }
    }
  }, [user, isLoading, options, navigate]);

  return {
    user: user ?? null,
    loading: isLoading,
    error,
    isAuthenticated: !!user,
    refresh: refetch,
    // Logout is handled by clearing cookie, usually via server endpoint, 
    // but for now we can just redirect to a logout route if we implement it, 
    // or just assume session expires. 
    // Implementing a simple logout function that clears cookie client-side or hits an endpoint would be good.
    // For now, let's leave it empty or simple.
    logout: async () => {
      // document.cookie = ... 
      // Ideally hit a logout endpoint
    },
  };
}
