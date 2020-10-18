import { generateID } from "@/utils";
import { GSPObject, IGSPObject } from "../base";

/* export enum LinkType {
    COMMON = "Normal",
    DRIVE = "Google Drive",
    ONEDRIVE = "OneDrive",
    GIT_REPO = "Repositorio Git"
} */

export interface ILinkType extends IGSPObject {
    name: string;
    icon: string;
}

export class LinkType extends GSPObject implements ILinkType {
    name!: string;
    icon!: string;

    constructor(partial: Partial<ILinkType>) {
        super(partial);
        this.name = partial.name || "";
        this.icon = partial.icon || "";
    }
}

export interface ILink extends IGSPObject {
    url: string;
    link_type_id: number | null;
    link_type: ILinkType | null;
    project_id: number;
}

export class Link extends GSPObject implements ILink {
    url: string;
    link_type_id: number | null;
    link_type: ILinkType | null;
    project_id: number;

    constructor(partial: Partial<ILink>) {
        super(partial);
        this.url = partial.url || "";
        this.link_type_id = partial.link_type_id || 0;
        this.link_type = partial.link_type || null;
        this.project_id = partial.project_id || 0;
    }
}
