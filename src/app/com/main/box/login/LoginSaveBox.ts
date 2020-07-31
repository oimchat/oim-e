import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseCache from '@/app/common/cache/BaseCache';
import LoginUser from '@/app/com/data/LoginUser';
import SecurityUtil from '@/app/com/main/util/SecurityUtil';
import LoginSaveInfo from '@/app/com/main/box/login/LoginSaveInfo';

export default class LoginSaveBox extends AbstractMaterial {

    private cache: BaseCache = new BaseCache('loginCache');
    private loginSaveListKey = 'loginSaveListKey';
    private _loginSaveSupport: boolean = false;
    private loginSaveMaxSize: number = 5;

    get loginSaveSupport(): boolean {
        return this._loginSaveSupport;
    }

    set loginSaveSupport(value: boolean) {
        this._loginSaveSupport = value;
    }

    public getFirst(): LoginSaveInfo {
        let o: any;
        const map: Map<string, LoginSaveInfo> = this.getLoginSaveInfoMap();
        if (map.size > 0) {
            o = map.values().next();
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
            data.password = SecurityUtil.en(password);
            map.set(account, data);

            this.cache.put(this.loginSaveListKey, map);
        }
    }

    private getLoginSaveInfoMap(): Map<string, LoginSaveInfo> {
        const map: Map<string, LoginSaveInfo> = new Map<string, LoginSaveInfo>();
        const saveMap: Map<string, LoginSaveInfo> = this.getSaveMap();
        for (const key of saveMap.keys()) {
            const data = saveMap.get(key);
            if (data) {
                const password: string = data.password;
                data.password = SecurityUtil.un(password);
            }
        }
        return map;
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
}
