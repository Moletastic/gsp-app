export interface DataTableHeader<T> {
    text: string;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    value: keyof T | "" | "_actions";
}

export class DataTable<T> {
    dialog: boolean;
    search?: string;
    headers: DataTableHeader<T>[];
    pagination?: any;
    totalItems?: number;
    data: T[];
    selectedItem?: T | T[];
    rowsPerPageText?: string;
    noDataText?: string;
    mode?: "ADD" | "EDIT" | "DELETE";

    constructor({
        headers,
        noDataText,
        rowsPerPageText
    }: {
        headers: DataTableHeader<T>[];
        noDataText?: string;
        rowsPerPageText?: string;
    }) {
        this.dialog = false;
        this.search = "";
        this.headers = headers;
        this.pagination = null;
        this.totalItems = 0;
        this.data = [];
        this.selectedItem = undefined;
        this.noDataText = noDataText ? noDataText : "Sin Registros";
        this.rowsPerPageText = rowsPerPageText
            ? rowsPerPageText
            : "Registros por página";
    }
}

export interface ILoopBar {
    active: boolean;
    show: boolean;
    message: string;
    color: string;
}

export class LoopBar implements ILoopBar {
    active: boolean;
    show: boolean;
    message: string;
    color: string;

    constructor() {
        this.active = false;
        this.show = false;
        this.message = "";
        this.color = "primary";
    }

    load(message?: string, color?: string): void {
        this.message = message ? message : "Cargando...";
        this.color = color ? color : this.color;
        this.active = true;
        this.show = true;
    }

    unload(): void {
        this.show = false;
        this.active = false;
        this.message = "";
    }
}

export interface ITimeLineItem {
    title: string;
    date: string | null;
    icon: string;
    color: string;
}

export type Mode = "ADD" | "EDIT" | "CHECK" | "DELETE";
