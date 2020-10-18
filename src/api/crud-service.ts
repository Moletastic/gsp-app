import { GSPObject } from "@/types/core/base";
import { $api } from ".";

export class CRUDService<T extends GSPObject> {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async create(object: T): Promise<T> {
        return (await $api.create(this.uri, object)) as T;
    }

    async get<T>(): Promise<T[]> {
        return await $api.get<T>(this.uri);
    }

    async fetch(id: string): Promise<T> {
        return await $api.fetch(this.uri, id);
    }

    async update(object: T): Promise<T> {
        return (await $api.update(this.uri, object)) as T;
    }

    async delete(object: T): Promise<T> {
        return (await $api.delete(this.uri, object)) as T;
    }
}
