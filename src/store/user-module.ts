import {
    VuexModule,
    Module,
    Mutation,
    Action,
    RegisterOptions
} from "vuex-class-modules";
import { Account, User } from "@/types/core/access/user";
import { $debug } from "@/utils";
import { $api } from "@/api";

export interface UserModuleStore {
    user: User | null;
}

@Module
export default class UserModule extends VuexModule {
    user: User | null = null;
    token = "";

    constructor(options: RegisterOptions) {
        super(options);
        this.init();
    }

    async init(): Promise<void> {
        if (!this.user) {
            await this.fetchUser();
        }
    }

    get isTeacher(): boolean {
        return this.user?.account.account_type === "Teacher";
    }

    get isAdmin(): boolean {
        return this.user?.account.account_type === "Admin";
    }

    @Mutation
    setToken(token: string): void {
        this.token = token;
        localStorage.setItem("gsp:token", token);
    }

    @Mutation
    setUser(user: User): void {
        this.user = user;
        this.user.account = new Account(user.account);
    }

    @Action
    async fetchUser(): Promise<void> {
        const user = await $api.me();
        user.account = new Account(user.account);
        this.setUser(user);
    }

    @Action
    async saveAccount(account: Account): Promise<void> {
        $debug("log", account);
        throw new Error("Not implemented yet");
    }

    @Action
    async loadUser(): Promise<void> {
        const promise = new Promise<User>((resolve, reject) => {
            const user_str = localStorage.getItem("gsp:user");
            if (!user_str) {
                return reject("User not found in Localstorage");
            }
            const user: User = JSON.parse(user_str);
            user.account = new Account(user.account);
            return resolve(user);
        });
        try {
            const user = await promise;
            this.setUser(user);
        } catch (err) {
            $debug("error", err);
        }
    }
}
