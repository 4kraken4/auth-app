export default class RegisterRequest {
    private email: string;
    private password: string;
    private firstName: string;
    private lastName: string;
    private phone: string;

    constructor(email: string, password: string, firstName: string, lastName: string, phone: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    toString(): string {
        return `RegisterRequest{email='${this.email}', password='${this.password}', firstName='${this.firstName}', lastName='${this.lastName}', phone='${this.phone}}`;
    }

    equals(o: RegisterRequest): boolean {
        if (this === o) return true;
        if (o == null || this.constructor !== o.constructor) return false;

        const that = o as RegisterRequest;
        return this.email === that.email
            && this.password === that.password
            && this.firstName === that.firstName
            && this.lastName === that.lastName
            && this.phone === that.phone;
    }

    hashCode(): number {
        let result = this.hashString(this.email);
        result = 31 * result + this.hashString(this.password);
        result = 31 * result + this.hashString(this.firstName);
        result = 31 * result + this.hashString(this.lastName);
        result = 31 * result + this.hashString(this.phone);
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

    clone(): RegisterRequest {
        return new RegisterRequest(this.email, this.password, this.firstName, this.lastName, this.phone);
    }

    static fromJson(json: Record<string, unknown>): RegisterRequest {
        return new RegisterRequest(json["email"] as string, json["password"] as string, json["firstName"] as string, json["lastName"] as string, json["phone"] as string);
    }

    static toJson(value: RegisterRequest): object {
        const json: Record<string, unknown> = {};
        json["email"] = value.email;
        json["password"] = value.password;
        json["firstName"] = value.firstName;
        json["lastName"] = value.lastName;
        json["phone"] = value.phone;
        return json;
    }

}