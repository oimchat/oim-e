import {RouteConfig} from 'vue-router';

class RouteConfigBox {
    public routers: RouteConfig[] = [];

    public constructor() {
        this.routers = [
            {
                path: '/',
                redirect: '/login',
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/Login.vue'),
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: '/reset.password',
                name: 'resetPassword',
                component: () => import('@/views/ResetPassword.vue'),
            },
            {
                path: '/main',
                name: 'main',
                component: () => import('@/views/Main.vue'),
            },
        ];
        this.initialize();
    }

    public add(route: RouteConfig): void {
        this.routers.push(route);
    }

    public getRouters(): RouteConfig[] {
        return this.routers;
    }

    private initialize(): void {
        const routeConfig: RouteConfig = {
            path: '/module',
            name: 'module',
            component: () => import('@/views/Main.vue'),
            children: [
                {
                    path: 'find.user',
                    name: 'module.findUser',
                    component: () => import('@/views/module/user/find/UserFind.vue'),
                },
                {
                    path: 'find.group',
                    name: 'module.findGroup',
                    component: () => import('@/views/module/group/find/GroupFind.vue'),
                },
                {
                    path: 'notice',
                    name: 'module.notice',
                    component: () => import('@/views/notice/ApplyHandleNotice.vue'),
                },
            ],
        } as RouteConfig;
        this.add(routeConfig);
    }
}

export default new RouteConfigBox();
