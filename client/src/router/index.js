import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {
            requiresToken: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
        meta: {
            requiresToken: false,
        },
    },
    {
        path: '*',
        redirect: '/login'
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresToken && !localStorage.getItem("token")) {
        next({ name: "Login" });
    } else if(!to.meta.requiresToken && localStorage.getItem("token")) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
