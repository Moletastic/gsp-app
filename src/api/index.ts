import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as AxiosLogger from "axios-logger";
import { $debug } from "@/utils";
import { ISignupForm, TokenPayload } from "@/types/core/access";
import { IGSPObject } from "@/types/core/base";
import { Account, User } from "@/types/core/access/user";

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

    async me(): Promise<TokenPayload> {
        const res: AxiosResponse<TokenPayload> = await this.client.post(
            "gsp/account/me"
        );
        return res.data;
    }

    async signUp(form: ISignupForm) {
        const req: AxiosResponse<Account> = await this.client.post(
            "users/signup",
            {
                user: form
            }
        );
        const user = req.data;
        return user;
    }
}

const url = {
    local: "http://localhost:1323",
    remote: "http://18.212.41.142"
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
