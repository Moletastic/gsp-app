import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/app/Home/index.vue";
import { userModule } from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "",
        redirect: "login"
    },
    {
        path: "/login",
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
        component: () => import("@/layouts/app/index.vue"),
        children: [
            {
                path: "/",
                name: "Home",
                component: Home
            },
            {
                path:"about",
                name: "about",
                component: () => import("@/views/app/About/index.vue")
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
            },
            {
                path: "admin",
                name: "admin",
                component: () => import("@/views/app/Admin/index.vue"),
                beforeEnter(to, from, next) {
                    if (userModule.isAdmin) {
                        next();
                    } else {
                        next({ name: "not-found" });
                    }
                }
            },
            {
                path: "*",
                name: "not-found",
                component: () => import("@/views/error/index.vue")
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
