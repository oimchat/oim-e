class Auth {
    public account: string = '';
    public password: string = '';

    private map: Map<string, string> = new Map<string, string>();
    private login: boolean = false;
    private tokenKey = 'auth.token';

    public isLogin(): boolean {
        return this.login;
    }

    public setLogin(isLogin: boolean): void {
        this.login = isLogin;
    }

    public setToken(token: string): void {
        this.map.set(this.tokenKey, token);
    }

    public getToken(): string {
        let token: any = this.map.get(this.tokenKey);
        if (!token) {
            token = '';
        }
        return token;
    }

    public removeToken(): void {
        this.map.delete(this.tokenKey);
    }
}

export default new Auth();
