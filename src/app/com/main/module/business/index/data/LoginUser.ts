export default class LoginUser {

    /**
     * 头像
     */
    public avatar: string = 'assets/general/common/logo/logo_128.png';

    /**
     * 帐号
     */
    public account: string = '';

    /**
     * 密码
     */
    public password: string = '';

    /**
     * 验证码
     */
    public verifyCode: string = '';

    /**
     * 在线状态
     */
    public status: string = '';

    /**
     * 自动登录
     */
    public autoLogin: boolean = false;

    /**
     * 记住密码
     */
    public savePassword: boolean = false;
}
