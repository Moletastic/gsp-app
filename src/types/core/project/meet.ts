import { $debug, make_enum, generateID } from "@/utils";
import { Moment } from "moment";
import moment from "moment";
import { IGSPObject, GSPObject } from "../base";

export interface IChannel extends IGSPObject {
    name: string;
    icon: string;
    url: string;
    is_online: boolean;
}

export class Channel extends GSPObject implements IChannel {
    name!: string;
    icon!: string;
    url: string;
    is_online: boolean;

    constructor(partial: Partial<IChannel>) {
        super(partial);
        this.name = partial.name || "Canal";
        this.icon = partial.icon || "";
        this.url = partial.url || "";
        this.is_online = partial.is_online || false;
    }
}

export interface IMeet extends IGSPObject {
    name: string;
    date: string | null;
    channel_id: number;
    channel: Channel;
    done: boolean;
    project_id: number;
}

// Reunión
export class Meet extends GSPObject implements IMeet {
    name: string;
    date: string | null;
    channel_id: number;
    channel: Channel;
    done: boolean;
    project_id: number;

    constructor(partial: Partial<Meet>) {
        super(partial);
        this.name = partial.name || "Reunión #";
        this.date = partial.date || null;
        this.channel_id = partial.channel_id || 0;
        this.channel = partial.channel || new Channel({});
        this.done = Boolean(partial.done);
        this.project_id = partial.project_id || 0;
    }
}
