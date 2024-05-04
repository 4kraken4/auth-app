export default class AuthRequest {
    private loginEmail: string;
    private loginPassword: string;
    private loginRememberMe: boolean;

    constructor(loginEmail: string, loginPassword: string, loginRememberMe: boolean) {
        this.loginEmail = loginEmail;
        this.loginPassword = loginPassword;
        this.loginRememberMe = loginRememberMe;
    }

    toString(): string {
        return `AuthRequest{loginEmail='${this.loginEmail}', loginPassword='${this.loginPassword}', loginRememberMe=${this.loginRememberMe}}`;
    }

    equals(o: AuthRequest): boolean {
        if (this === o) return true;
        if (o == null || this.constructor !== o.constructor) return false;

        const that = o as AuthRequest;
        return this.loginRememberMe === that.loginRememberMe && this.loginEmail === that.loginEmail && this.loginPassword === that.loginPassword;
    }

    hashCode(): number {
        let result = this.hashString(this.loginEmail);
        result = 31 * result + this.hashString(this.loginPassword);
        result = 31 * result + (this.loginRememberMe ? 1 : 0);
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

    clone(): AuthRequest {
        return new AuthRequest(this.loginEmail, this.loginPassword, this.loginRememberMe);
    }

    static fromJson(json: Record<string, unknown>): AuthRequest {
        return new AuthRequest(json["loginEmail"] as string, json["loginPassword"] as string, json["loginRememberMe"] as boolean);
    }

    static toJson(value: AuthRequest): object {
        const json: Record<string, unknown> = {};
        json["loginEmail"] = value.loginEmail;
        json["loginPassword"] = value.loginPassword;
        json["loginRememberMe"] = value.loginRememberMe;
        return json;
    }
}
