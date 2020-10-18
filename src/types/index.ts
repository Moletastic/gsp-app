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
