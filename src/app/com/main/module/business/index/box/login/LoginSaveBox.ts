import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseCache from '@/app/common/cache/BaseCache';
import SecurityUtil from '@/app/com/main/common/util/SecurityUtil';
import LoginSaveInfo from '@/app/com/main/module/business/index/box/login/LoginSaveInfo';

export default class LoginSaveBox extends AbstractMaterial {

    private cache: BaseCache = new BaseCache('loginCache');
    private loginSaveListKey = 'loginSaveListKey';
    private isLoginSaveSupport: boolean = false;
    private loginSaveMaxSize: number = 5;

    get loginSaveSupport(): boolean {
        return this.isLoginSaveSupport;
    }

    set loginSaveSupport(value: boolean) {
        this.isLoginSaveSupport = value;
    }

    public getFirst(): LoginSaveInfo {
        let o: any;
        const array: LoginSaveInfo[] = this.getList();
        if (array.length > 0) {
            this.sort(array);
            o = array[0];
        }
        return o;
    }

    public has(): boolean {
        const map: Map<string, LoginSaveInfo> = this.getSaveMap();
        const has = map.size > 0;
        return has;
    }

    public save(data: LoginSaveInfo) {
        if (data && this.loginSaveSupport) {
            const savePassword = data.savePassword;
            const map: Map<string, LoginSaveInfo> = this.getSaveMap();
            const size = map.size;
            if (size >= this.loginSaveMaxSize) {
                if (size > 0) {
                    const info: any = map.values().next();
                    if (info) {
                        map.delete(info.account);
                    }
                }
            }
            const account: string = data.account;
            const password: string = data.password;
            data.password = savePassword ? SecurityUtil.en(password) : '';
            data.lastTimestamp = new Date().getTime();
            map.set(account, data);

            this.cache.put(this.loginSaveListKey, map);
        }
    }

    public getLoginSaveInfoMap(): Map<string, LoginSaveInfo> {
        const map: Map<string, LoginSaveInfo> = new Map<string, LoginSaveInfo>();
        const saveMap: Map<string, LoginSaveInfo> = this.getSaveMap();
        for (const key of saveMap.keys()) {
            const data = saveMap.get(key);
            if (data) {
                const savePassword = data.savePassword;
                const password: string = data.password;
                data.password = savePassword ? SecurityUtil.un(password) : '';

                map.set(key, data);
            }
        }
        return map;
    }

    public getList(): LoginSaveInfo[] {
        const map: Map<string, LoginSaveInfo> = this.getLoginSaveInfoMap();
        const array: LoginSaveInfo[] = [];
        for (const data of map.values()) {
            if (data) {
                array.push(data);
            }
        }
        return array;
    }

    private getSaveMap(): Map<string, LoginSaveInfo> {
        const map: Map<string, LoginSaveInfo> = new Map<string, LoginSaveInfo>();
        const o = this.cache.get(this.loginSaveListKey);
        if (o) {
            for (const k of Object.keys(o)) {
                map.set(k, o[k]);
            }
        }
        return map;
    }

    private sort(list: LoginSaveInfo[]) {
        if (list) {
            list.sort((a: LoginSaveInfo, b: LoginSaveInfo) => {
                const timestamp1: number = (a.lastTimestamp) ? a.lastTimestamp : 0;
                const timestamp2: number = (b.lastTimestamp) ? b.lastTimestamp : 0;
                return timestamp2 - timestamp1;
            });
        }
    }
}
