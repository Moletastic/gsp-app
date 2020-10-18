export type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L];
};

export interface DatedObject {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface IGSPObject extends DatedObject {
    id: number | null;
    entity: string;
    uid: string;
    is_valid: boolean;
}

export class GSPObject implements IGSPObject {
    id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    entity: string;
    uid: string;
    is_valid: boolean;

    constructor(partial: Partial<IGSPObject>) {
        this.id = partial.id || null;
        this.created_at = partial.created_at || new Date().toISOString();
        this.updated_at = partial.updated_at || new Date().toISOString();
        this.deleted_at = partial.deleted_at || null;
        this.entity = partial.entity || "";
        this.uid = partial.uid || "";
        this.is_valid = partial.is_valid || true;
    }
}
