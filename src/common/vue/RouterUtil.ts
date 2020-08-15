import routerManager from '@/router/RouterManager';

const router = routerManager.getRouter();

class RouterUtil {

    public static back() {
        const length = window.history.length;
        const hasHistory = length > 1;
        hasHistory ? router.go(-1) : router.push('/');
    }

    public static toByName(name: string) {
        const routeName = (router.app && router.app.$route) ? router.app.$route.name : '';
        if (routeName !== name) {
            const route = {name};
            router.push(route).then((r) => {
                // no
            });
        }
    }

    public static toByPath(path: string) {
        const fullPath = (router.app && router.app.$route) ? router.app.$route.fullPath : '';
        if (fullPath !== path) {
            const route = {path};
            router.push(route).then((r) => {
                // no
            });
        }
    }
}

export default RouterUtil;
