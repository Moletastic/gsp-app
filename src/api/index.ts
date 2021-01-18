import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as AxiosLogger from "axios-logger";
import { $debug } from "@/utils";
import {
    ISignupForm,
    TokenPayload,
    PasswordForm,
    UserUpdateResponse
} from "@/types/core/access";
import { IGSPObject } from "@/types/core/base";
import { Account, User, IAccount } from "@/types/core/access/user";

class TLAPI {
    client!: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.client = axios;
    }

    async get<T>(entity: string): Promise<T[]> {
        const res: AxiosResponse<T[]> = await this.client.get("gsp/" + entity);
        return res.data;
    }

    async fetch<T>(entity: string, id: string): Promise<T> {
        const res: AxiosResponse<T> = await this.client.get(
            "gsp/" + entity + "/" + id
        );
        return res.data;
    }

    async create(entity: string, partial: IGSPObject) {
        const res = await this.client.post("gsp/" + entity, { data: partial });
        return res.data;
    }

    async update(entity: string, partial: IGSPObject) {
        const res = await this.client.put("gsp/" + entity + "/" + partial.id, {
            data: partial
        });
        return res.data;
    }

    async delete(entity: string, partial: IGSPObject) {
        const res = await this.client.delete(
            "gsp/" + entity + "/" + partial.id
        );
        return res.data;
    }

    async patch(entity: string, id: number, data: any): Promise<void> {
        await this.client.patch("gsp/" + entity + "/" + id, {
            data
        });
    }

    async login(email: string, password: string) {
        const req: AxiosResponse<{
            user: User;
            token: string;
        }> = await this.client.post("access/login", {
            user: {
                email,
                password
            }
        });
        $debug("log", req.data);
        return req.data;
    }

    async me(): Promise<TokenPayload["user"]> {
        const res: AxiosResponse<TokenPayload["user"]> = await this.client.get(
            "gsp/account/me"
        );
        return res.data;
    }

    async updateAccount(account: Account): Promise<UserUpdateResponse> {
        const res: AxiosResponse<UserUpdateResponse> = await this.client.put(
            "gsp/account/me",
            {
                data: {
                    account
                }
            }
        );
        return res.data;
    }

    async changePassword(form: PasswordForm): Promise<UserUpdateResponse> {
        const res: AxiosResponse<UserUpdateResponse> = await this.client.put(
            "gsp/account/password",
            {
                data: form
            }
        );
        return res.data;
    }

    async signUp(form: ISignupForm): Promise<{ message: string }> {
        const req: AxiosResponse<{ message: string }> = await this.client.post(
            "access/signup",
            {
                user: form
            }
        );
        const response = req.data;
        return response;
    }
}

const url = {
    local: "http://localhost:1323",
    remote: "http://3.86.80.49"
};

const instance = axios.create({
    baseURL: `${url.local}/api/`
});
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("gsp:token");
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
});
AxiosLogger.setGlobalConfig({
    data: false,
    method: true,
    url: true,
    prefixText: "GSP API",
    code: true,
    status: true,
    logger: text => $debug("api", text)
});
instance.interceptors.response.use(AxiosLogger.responseLogger);

const $api = new TLAPI(instance);

export { $api };
