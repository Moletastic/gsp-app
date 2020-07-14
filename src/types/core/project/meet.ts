import { $debug, make_enum, generateID } from '@/utils'
import { Moment } from 'moment';
import moment from 'moment';

export enum OnlineChannel {
    TEAMS = "Microsoft Teams",
    ZOOM = "ZOOM",
    MEET = "Google Meet",
    //DISCORD = "Discord",
    HANGOUT = "Google Hangout",
    //SKYPE = "Microsoft Skype",
    GENERIC = "Otro"
}

export enum OnlineChannelIcon {
    TEAMS = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bemidjistate.edu%2Foffices%2Fits%2Fwp-content%2Fuploads%2Fsites%2F60%2F2018%2F03%2Ficon-microsoft-teams.png&f=1&nofb=1",
    ZOOM = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.macupdate.com%2Fimages%2Ficons512%2F52421.png&f=1&nofb=1",
    MEET = "https://www.gstatic.com/images/branding/product/2x/meet_96dp.png",
    HANGOUT = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hangouts_icon.svg/1200px-Hangouts_icon.svg.png",
    GENERIC = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F27%2F27130.png&f=1&nofb=1"
}

const channel = make_enum(["TEAMS", "ZOOM", "MEET", "HANGOUT", "OTHER"]);

type channel = keyof typeof channel

export interface IChannel {
    id: string
    name: string
    icon: string
    url ?: string
    is_online : boolean
}

export class Channel implements IChannel {
    id !: string
    name !: string
    icon !: string
    url ?: string
    is_online : boolean = false

    constructor(data?:{online_channel ?: OnlineChannel, icon?: OnlineChannelIcon}){
        if(data){
            $debug('log', data.online_channel);
            if(data.online_channel){
                this.id = data.online_channel
                this.name = data.online_channel
                this.is_online = true;
            }
            if(data.icon) this.icon = data.icon
        }
    }

}

export interface IMeet {
    id: string
    name: string
    date: Moment
    channel : Channel
    done : boolean
}

// Reunión
export class Meet implements IMeet {
    id !: string
    name !: string
    date !: Moment
    channel = new Channel()
    done : boolean = false;
    

    constructor(partial: Partial<Meet>){
        this.id = partial.id || generateID("MEET");
        this.name = partial.name || "";
        this.date = partial.date || moment(new Date());
        this.channel = partial.channel || new Channel();
        this.done = Boolean(partial.done);
    }
}