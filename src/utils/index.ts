export function generateID(prefix: string): string {
    const rand = Math.floor(Math.random() * 9999 + 1000);
    return `${prefix}-${rand}`;
}

type LoggerType = "log" | "table" | "warn" | "error" | "api";

export function $debug(type: LoggerType, ...content: any | any[]): void {
    const msg = {
        color:
            "background: #3F51B5; color: #ffffff; font-weight: bold; font-size: 16px<"
    };

    if (process.env.NODE_ENV === "development") {
        switch (type) {
            case "log":
                console.log("%c 📔[DEBUG] ", msg.color, ...content);
                break;
            case "api":
                msg.color =
                    "background: #5e35b1; color: #ffffff; font-weight: bold; font-size:16px<";
                console.log("%c ⚡️[API] ", msg.color, ...content);
                break;
            case "table":
                console.table(...content);
                break;
            case "error":
                console.error(...content);
                break;
            case "warn":
                console.warn(...content);
                break;
        }
    }
}

export function make_enum<T extends string>(o: T[]): { [K in T]: K } {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
