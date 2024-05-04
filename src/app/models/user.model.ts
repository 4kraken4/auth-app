export default class User {
    private id: number;
    private email: string;
    private firstName: string;
    private lastName: string;
    private phone: string;

    constructor(id: number, email: string, firstName: string, lastName: string, phone: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    toString(): string {
        return `User{id=${this.id}, email='${this.email}', firstName='${this.firstName}', lastName='${this.lastName}', phone='${this.phone}}`;
    }

    equals(o: User): boolean {
        if (this === o) return true;
        if (o == null || this.constructor !== o.constructor) return false;

        const that = o as User;
        return this.id === that.id
            && this.email === that.email
            && this.firstName === that.firstName
            && this.lastName === that.lastName
            && this.phone === that.phone;
    }

    hashCode(): number {
        let result = this.hashString(this.email);
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

    clone(): User {
        return new User(this.id, this.email, this.firstName, this.lastName, this.phone);
    }

    static fromJson(json: Record<string, unknown>): User {
        return new User(json["id"] as number, json["email"] as string, json["firstName"] as string, json["lastName"] as string, json["phone"] as string);
    }

    static toJson(value: User): object {
        const json: Record<string, unknown> = {};
        json["id"] = value.id;
        json["email"] = value.email;
        json["firstName"] = value.firstName;
        json["lastName"] = value.lastName;
        json["phone"] = value.phone;
        return json;
    }

}