import { IUser } from "./user";
import { GSPObject } from "../base";

export interface ILoginForm {
    email: string;
    password: string;
}

export type ISignupForm = Omit<
    IUser,
    | "id"
    | "entity"
    | "uid"
    | "is_valid"
    | "created_at"
    | "updated_at"
    | "deleted_at"
>;
