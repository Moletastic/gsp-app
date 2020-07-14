import axios, { AxiosAdapter, AxiosInstance, AxiosResponse } from 'axios'
import { instance } from '@/axios';
import { $debug } from '@/utils';

interface TLObject {
    id: string
}

class TLAPI {
    client !: AxiosInstance

    constructor(axios: AxiosInstance){
        this.client = axios;
    }

    async get<T>(entity: string): Promise<T[]>{
        const res: AxiosResponse<T[]> = await this.client.get(entity);
        return res.data
    }

    async fetch<T>(entity: string, id: string): Promise<T>{
        const res: AxiosResponse<T> = await this.client.get(entity + "/" + id);
        return res.data;
    }

    async create(entity: string, partial: TLObject){
        const res = await this.client.post(entity,partial);
        return res.data;
    }

}

const $api = new TLAPI(axios.create({
    baseURL: "http://localhost:1323/",
}));

export {$api};
