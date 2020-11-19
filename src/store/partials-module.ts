import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { ISnackBar } from "@/types/vuetify";
import { timeout } from "@/utils";

@Module
export default class PartialsModule extends VuexModule {
    sidebar = false;
    snack: ISnackBar & { show: boolean } = {
        close: false,
        color: "success",
        message: "",
        show: false
    };

    @Mutation
    setSnack(snack: Partial<ISnackBar>): void {
        this.snack.message = snack.message || "";
        this.snack.color = snack.color || "primary";
        this.snack.close = snack.close || false;
        this.snack.show = false;
    }

    @Action
    async showSnack(snack: Partial<ISnackBar>): Promise<void> {
        this.setSnack(snack);
        this.snack.show = true;
        await timeout(2000);
        this.snack.show = false;
    }

    @Action
    async showSuccess(msg: string): Promise<void> {
        this.showSnack({
            message: msg,
            color: "success"
        });
        this.snack.show = true;
        await timeout(2000);
        this.snack.show = false;
    }

    @Action
    async showError(err: string): Promise<void> {
        this.showSnack({
            message: err,
            color: "error"
        });
        this.snack.show = true;
        await timeout(2000);
        this.snack.show = false;
    }

    @Action
    toggleSidebar(): void {
        this.sidebar = !this.sidebar;
    }
}
