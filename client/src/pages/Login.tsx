import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useRequestInfo } from "@/ssr/request-info";

export default function Login() {
    const { user, loading } = useAuth();
    const [, navigate] = useLocation();
    const requestInfo = useRequestInfo();

    useEffect(() => {
        if (user) {
            navigate("/admin/blog");
        }
    }, [user, navigate]);

    const handleLogin = () => {
        if (typeof window === "undefined") return;
        window.location.href = "/api/auth/google";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const search =
        typeof window !== "undefined" ? window.location.search : requestInfo.search;
    const params = new URLSearchParams(search);
    const error = params.get("error");
    const errorMessage = params.get("message");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                            <p className="font-semibold">Anmeldung fehlgeschlagen</p>
                            {errorMessage && <p className="mt-1 font-mono text-xs">{decodeURIComponent(errorMessage)}</p>}
                        </div>
                    )}
                    <CardTitle className="text-2xl font-bold">Willkommen zurück</CardTitle>
                    <CardDescription>
                        Melde dich an, um auf den Admin-Bereich zuzugreifen
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <Button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 h-12 text-base"
                        variant="outline"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                            <path
                                d="M12.0003 20.45c4.6593 0 8.3686-3.8829 8.3686-8.5686 0-.5807-.0637-1.1274-.1687-1.6669H12.0003v3.3332h4.6978c-.2016 1.0543-.8071 1.9547-1.6913 2.541l2.7483 2.1325c1.6096-1.4828 2.5298-3.6963 2.5298-6.1824 0-4.8601-3.7126-8.3129-8.0848-8.3129-4.2268 0-7.8596 3.1932-8.3813 7.8285l-2.6738-.2882c.6468-5.3409 5.0864-9.3663 10.5551-9.3663V11.8813z"
                                fill="currentColor"
                            />
                            <path
                                d="M12.0003 24c3.24 0 5.9567-1.0746 7.9407-2.908l-2.7483-2.1325c-1.0746.7203-2.4502 1.1465-4.1924 1.1465-3.2359 0-5.9768-2.1856-6.9546-5.1248l-2.7308 2.3831C4.8517 20.4883 8.1637 24 12.0003 24z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.0457 14.9812c-.2479-.7412-.39-1.5367-.39-2.3643 0-.8276.1421-1.6231.39-2.3643l-2.7308-2.383C1.0476 9.4239 0.2222 11.2329 0.2222 13.1169c0 1.884.8254 3.693 2.0927 5.2479l2.7308-2.3835z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0003 4.7501c1.7618 0 3.3486.606 4.5907 1.7925l3.4429-3.4429C17.9571 1.1963 15.2403 0 12.0003 0 7.6637 0 3.8568 2.3789 1.8239 5.8696l2.7308 2.383c.9778-2.9392 3.7187-5.1247 6.9546-5.1247z"
                                fill="#EA4335"
                            />
                        </svg>
                        Mit Google anmelden
                    </Button>
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Nur für Administratoren
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
