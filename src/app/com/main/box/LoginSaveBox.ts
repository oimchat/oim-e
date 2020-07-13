import AbstractMaterial from '@/app/base/AbstractMaterial';
import BaseCache from '@/app/common/cache/BaseCache';
import LoginUser from '@/app/com/data/LoginUser';

export default class LoginSaveBox extends AbstractMaterial {

    private cache: BaseCache = new BaseCache('loginCache');
    private loginUserKey = 'loginUserKey';

    public getLoginUser(): LoginUser {
        const o = this.cache.get(this.loginUserKey);
        return o;
    }

    public has(): boolean {
        let has = false;
        const o = this.getLoginUser();
        has = !!o;
        return has;
    }

    public save(data: LoginUser) {
        if (data) {
            this.cache.put(this.loginUserKey, data);
        }
    }
}
