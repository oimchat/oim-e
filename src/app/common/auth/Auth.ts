import BaseCache from '@/app/common/cache/BaseCache';

class Auth {
    public isFirst: boolean = true;

    private cache: BaseCache = new BaseCache('authCache');
    private accountKey = 'auth.account';
    private passwordKey = 'auth.password';
    private loginKey = 'auth.login';
    private tokenKey = 'auth.token';
    private userIdKey = 'auth.userId';


    public isLogin(): boolean {
        const login: any = this.cache.get(this.loginKey);
        return login;
    }

    public setLogin(isLogin: boolean): void {
        this.cache.put(this.loginKey, isLogin);
        if (isLogin) {
            this.isFirst = false;
        }
    }

    public setToken(token: string): void {
        this.cache.set(this.tokenKey, token);
    }

    public getToken(): string {
        let token: any = this.cache.get(this.tokenKey);
        if (!token) {
            token = '';
        }
        return token;
    }


    public setUserId(userId: string): void {
        this.cache.set(this.userIdKey, userId);
    }

    public getUserId(): string {
        let userId: any = this.cache.get(this.userIdKey);
        if (!userId) {
            userId = '';
        }
        return userId;
    }

    public setAccount(account: string): void {
        this.cache.set(this.accountKey, account);
    }

    public getAccount(): string {
        let v: any = this.cache.get(this.accountKey);
        if (!v) {
            v = '';
        }
        return v;
    }


    public setPassword(password: string): void {
        this.cache.set(this.passwordKey, password);
    }

    public getPassword(): string {
        let v: any = this.cache.get(this.passwordKey);
        if (!v) {
            v = '';
        }
        return v;
    }


    public removeToken(): void {
        this.cache.delete(this.tokenKey);
    }

    public removeUserId(): void {
        this.cache.delete(this.userIdKey);
    }

    public removeAccount(): void {
        this.cache.delete(this.accountKey);
    }

    public removePassword(): void {
        this.cache.delete(this.passwordKey);
    }

    public removeLogin(): void {
        this.cache.delete(this.loginKey);
    }

    public clear(): void {
        // this.removeLogin();
        this.removeUserId();
        this.removeToken();
        this.removeAccount();
        this.removePassword();
    }
}

export default new Auth();
