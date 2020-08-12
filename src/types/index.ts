interface TlObject {
    id: string;
}

interface iRef<T> {
    _class: string;
    class: string;
    id: string;
}

class Ref<T> implements iRef<T> {
    _class!: string;
    class!: string;
    id!: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface Student extends User {
    career_code: string;
}

interface Teacher extends User {}

interface Agreement extends TlObject {
    title: string;
    desc: string;
    checked: boolean;
    creator: Ref<Teacher>;
    created_at: Date;
    checked_at: Date;
}

interface Progress extends TlObject {}

enum FileType {
    TEXT = "TXT",
    DOCUMENT = "DOC",
    SHEET = "SHEET",
    SLIDE = "SLIDE",
    PDF = "PDF"
}

enum ImgType {
    PNG = "PNG",
    GIF = "GIF",
    JPG = "JPG",
    JPEG = "JPEG"
}

interface TlFile extends TlObject {
    name: string;
    url: string;
    mime: string;
}

interface Media extends TlFile {
    name: string;
    url: string;
}

interface Platform extends TlObject {
    name: string;
    icon: Media;
}

interface Meet extends TlObject {
    date: Date;
    topics: Array<Topic>;
    tags: Array<Tag>;
}

interface Milestone extends TlObject {
    name: string;
    created_at: Date;
    date: Date;
}

interface Topic extends TlObject {
    name: string;
    desc: string;
}

interface Tag extends TlObject {
    name: string;
}

interface LinkIcon extends Media {}

interface ProjectLink extends TlObject {
    name: string;
    link: string;
    icon: LinkIcon;
}

interface Project extends TlObject {
    meets: Array<Meet>;
    milestones: Array<Milestone>;
    tags: Array<Tag>;
}
