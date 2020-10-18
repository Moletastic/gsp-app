import axios, { AxiosAdapter, AxiosInstance, AxiosResponse } from "axios";
import { $debug } from "@/utils";
import { ISignupForm } from "@/types/core/access";
import { IGSPObject } from "@/types/core/base";
import { User } from "@/types/core/access/user";

interface TLObject {
    id: string;
}

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
        }> = await this.client.post("users/login", {
            user: {
                email,
                password
            }
        });
        $debug("log", req.data);
        return req.data;
    }

    async signUp(form: ISignupForm) {
        const req: AxiosResponse<User> = await this.client.post("users/", {
            user: form
        });
        const user = req.data;
        return user;
    }
}

const local_url = "http://localhost:1323";
const server_url = "http://18.212.41.142";

const instance = axios.create({
    baseURL: `${local_url}/api/`
});
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("gsp:token");
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
});

const $api = new TLAPI(instance);

export { $api };
