import { $debug } from ".";

export function checkEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function checkRut(rut: string): boolean {
    if (!rut || rut.trim().length < 3) return false;
    const cleaned_rut = rut.replace(/[^0-9kK-]/g, "");
    if (cleaned_rut.length < 3) return false;
    const splited = cleaned_rut.split("-");
    if (splited.length !== 2) return false;
    const num = parseInt(splited[0], 10);
    const dgv = splited[1];
    const dvCalc = calculateDV(num);
    return dgv === dvCalc;
}

export function calculateDV(rut: number): string {
    const body = `${rut}`;
    let sum = 0;
    let mult = 2;
    for (let i = 1; i <= body.length; i++) {
        const index = mult * parseInt(body.charAt(body.length - i));
        sum += index;
        if (mult < 7) {
            mult++;
        } else {
            mult = 2;
        }
    }
    const dv = 11 - (sum % 11);
    if (dv === 10) return "k";
    if (dv === 11) return "0";
    return `${dv}`;
}
