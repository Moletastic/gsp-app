import { IAccount, User } from "./user";

export interface ILoginForm {
    email: string;
    password: string;
}

export type ISignupForm = Omit<
    IAccount,
    | "id"
    | "entity"
    | "uid"
    | "is_valid"
    | "created_at"
    | "updated_at"
    | "deleted_at"
>;

export interface TokenPayload {
    exp: number;
    is_admin: boolean;
    user: User;
}
