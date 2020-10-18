import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/app/Home/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "",
        redirect: "login"
    },
    {
        path: "/login",
        name: "access",
        component: () => import("@/layouts/access/index.vue"),
        children: [
            {
                path: "/",
                name: "login",
                component: () => import("@/views/access/login/index.vue")
            }
        ]
    },
    {
        path: "/app",
        name: "app",
        component: () => import("@/layouts/app/index.vue"),
        children: [
            {
                path: "/",
                name: "Home",
                component: Home
            },
            {
                path: "account",
                name: "account",
                component: () => import("@/views/app/Account/index.vue")
            },
            {
                path: "projects",
                name: "projects",
                component: () => import("@/views/app/Projects/index.vue")
            },
            {
                path: "projects-add",
                name: "new-project",
                component: () => import("@/views/app/NewProject/index.vue")
            },
            {
                path: "projects/:id",
                name: "project",
                component: () => import("@/views/app/Project/index.vue")
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
