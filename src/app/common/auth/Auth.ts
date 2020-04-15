class Auth {
    public account: string = '';
    public password: string = '';

    private map: Map<string, string> = new Map<string, string>();
    private login: boolean = false;
    private tokenKey = 'auth.token';
    private userIdKey = 'auth.userId';

    public isLogin(): boolean {
        return this.login;
    }

    public setLogin(isLogin: boolean): void {
        this.login = isLogin;
    }

    public setToken(token: string): void {
        this.map.set(this.tokenKey, token);
    }

    public setUserId(userId: string): void {
        this.map.set(this.userIdKey, userId);
    }

    public getToken(): string {
        let token: any = this.map.get(this.tokenKey);
        if (!token) {
            token = '';
        }
        return token;
    }

    public getUserId(): string {
        let userId: any = this.map.get(this.userIdKey);
        if (!userId) {
            userId = '';
        }
        return userId;
    }

    public removeToken(): void {
        this.map.delete(this.tokenKey);
    }

    public removeUserId(): void {
        this.map.delete(this.userIdKey);
    }
}

export default new Auth();
