import Vue from 'vue';
import Router, {RouterOptions, RouteConfig, Route, NavigationGuard, RawLocation} from 'vue-router';
import Home from '../views/Home.vue';
import {Dictionary} from 'vue-router/types/router';
import auth from '@/app/common/auth/Auth';
import BaseUtil from '@/app/lib/util/BaseUtil';
import routeConfigBox from '@/router/RouteConfigBox';

Vue.use(Router);

const routers: RouteConfig[] = [
    // {
    //     path: '/',
    //     redirect: '/login',
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
    },
    {
        path: '/reset.password',
        name: 'resetPassword',
        component: () => import('../views/ResetPassword.vue'),
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/Main.vue'),
    },
];

const routerOptions: RouterOptions = {
    // routes: routers,
    routes: routeConfigBox.getRouters(),
};

const skips: string[] = ['login', 'register', 'resetPassword'];
const router: Router = new Router(routerOptions);
router.beforeEach((to: Route, from: Route, next: any): void => {
    const isLogin = auth.isLogin();
    const name = to.name;
    let intercept: boolean = true;
    const isNullName = BaseUtil.isEmpty(name);
    for (const skip of skips) {
        if (skip === name) {
            intercept = false;
            break;
        }
    }
    if (!isNullName) {
        if (isLogin || !intercept) {
            next();
        } else {
            const data: Dictionary<string> = {to: to.name + '', from: from.name + ''};
            const route = {name: 'login', params: data};
            next(route);
        }
    } else {
        next({
            name: 'login',
        });
    }
});

export default router;


