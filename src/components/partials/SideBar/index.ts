import { Component, Vue } from "vue-property-decorator";
import { userModule } from "@/store";

interface SideLink {
    title: string;
    icon: string;
    to: string;
    active: boolean;
}

@Component
export default class SideBar extends Vue {
    links: Array<SideLink> = [
        {
            title: "Inicio",
            icon: "mdi-home",
            active: true,
            to: "Home"
        },
        {
            title: "Proyectos",
            icon: "mdi-school",
            active: true,
            to: "projects"
        },
        {
            title: "Mi Cuenta",
            icon: "mdi-account",
            active: true,
            to: "account"
        }
    ];

    mounted(): void {
        if (userModule.isAdmin) {
            this.links.push({
                title: "Opciones de Administrador",
                icon: "mdi-account",
                active: true,
                to: "admin"
            });
        }
        this.links.push({
            title: "Salir",
            icon: "mdi-logout",
            active: true,
            to: "login"
        });
    }

    goTo(link: string): void {
        if (link === "login") {
            localStorage.removeItem("gsp:token");
        }
        this.$router.push({ name: link });
    }

    get active(): boolean {
        return this.$store.state.sidebar;
    }
}
