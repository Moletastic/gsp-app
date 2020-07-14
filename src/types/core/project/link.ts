import { generateID } from '@/utils'

/* export enum LinkType {
    COMMON = "Normal",
    DRIVE = "Google Drive",
    ONEDRIVE = "OneDrive",
    GIT_REPO = "Repositorio Git"
} */

export interface ILinkType {
    id: string
    name: string
    icon: string
}

export class LinkType implements ILinkType {
    id !: string
    name !: string
    icon !: string

    constructor(partial: Partial<ILinkType>){
        this.id = partial.id || generateID("ltype");
        this.name = partial.name || "";
        this.icon = partial.icon || "";
    }
}

export enum LinkIcon {
    COMMON = "https://image.flaticon.com/icons/svg/1077/1077180.svg",
    DRIVE = "https://image.flaticon.com/icons/svg/2111/2111436.svg",
    ONEDRIVE = "https://image.flaticon.com/icons/svg/873/873136.svg",
    GIT_REPO = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpapirus-team%2Fpapirus-apps%2F256%2Fgit-icon.png&f=1&nofb=1",
}

export interface ILink {
    id: string
    url: string
    type : ILinkType
}

export class Link implements ILink {
    id !: string
    url !: string
    type !: LinkType

    constructor(partial: Partial<ILink>){
        this.id = partial.id || generateID("l");
        this.url = partial.url || "";
        this.type = new LinkType({...partial.type}) || new LinkType({});
    }

}