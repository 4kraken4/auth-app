import User from "./user.model";

export default class AuthResponse {
    private token: string;
    private refreshToken: string;
    private tokenExpiration: string;
    private refreshTokenExpiration: string;
    private user: User;

    constructor(token: string, refreshToken: string, tokenExpiration: string, refreshTokenExpiration: string, user: User) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenExpiration = tokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
        this.user = user;
    }

    toString(): string {
        return `AuthResponse{token='${this.token}', refreshToken='${this.refreshToken}', tokenExpiration='${this.tokenExpiration}', refreshTokenExpiration='${this.refreshTokenExpiration}', user=${this.user}}`;
    }

    equals(o: AuthResponse): boolean {
        if (this === o) return true;
        if (o == null || this.constructor !== o.constructor) return false;

        const that = o as AuthResponse;
        return this.token === that.token
            && this.refreshToken === that.refreshToken
            && this.tokenExpiration === that.tokenExpiration
            && this.refreshTokenExpiration === that.refreshTokenExpiration
            && this.user.equals(that.user);
    }

    hashCode(): number {
        let result = this.hashString(this.token);
        result = 31 * result + this.hashString(this.refreshToken);
        result = 31 * result + this.hashString(this.tokenExpiration);
        result = 31 * result + this.hashString(this.refreshTokenExpiration);
        result = 31 * result + this.user.hashCode();
        return result;
    }

    private hashString(value: string): number {
        let hash = 0;
        if (value.length === 0) {
            return hash;
        }
        for (let i = 0; i < value.length; i++) {
            const char = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    clone(): AuthResponse {
        return new AuthResponse(this.token, this.refreshToken, this.tokenExpiration, this.refreshTokenExpiration, this.user.clone());
    }

    static fromJson(json: Record<string, unknown>): AuthResponse {
        return new AuthResponse(json["token"] as string, json["refreshToken"] as string, json["tokenExpiration"] as string, json["refreshTokenExpiration"] as string, User.fromJson(json["user"] as Record<string, unknown>));
    }

    static toJson(value: AuthResponse): object {
        const json: Record<string, unknown> = {};
        json["token"] = value.token;
        json["refreshToken"] = value.refreshToken;
        json["tokenExpiration"] = value.tokenExpiration;
        json["refreshTokenExpiration"] = value.refreshTokenExpiration;
        json["user"] = User.toJson(value.user);
        return json;
    }
}