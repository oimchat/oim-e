export default class LoginSaveInfo {

    /**
     * 帐号
     */
    public account: string = '';

    /**
     * 密码
     */
    public password: string = '';

    /**
     * 在线状态
     */
    public status: string = '';

    /**
     * 头像
     */
    public avatar: string = '';

    /**
     * 自动登录
     */
    public autoLogin: boolean = false;

    /**
     * 记住密码
     */
    public savePassword: boolean = false;

    /**
     * 最近登录时间
     */
    public lastTimestamp: number = 0;
}
