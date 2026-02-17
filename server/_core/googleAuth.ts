import { google } from "googleapis";
import { ENV } from "./env";

export class GoogleAuthService {
    private oauth2Client;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            ENV.googleClientId,
            ENV.googleClientSecret,
            `${ENV.baseUrl}/api/auth/google/callback`
        );
    }

    generateAuthUrl(state: string) {
        return this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            state,
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
            include_granted_scopes: true,
        });
    }

    async getToken(code: string) {
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
    }

    async getUserInfo(accessToken: string) {
        const oauth2 = google.oauth2({
            auth: this.oauth2Client,
            version: "v2",
        });

        this.oauth2Client.setCredentials({ access_token: accessToken });

        const { data } = await oauth2.userinfo.get();
        return data;
    }
}

export const googleAuthService = new GoogleAuthService();
