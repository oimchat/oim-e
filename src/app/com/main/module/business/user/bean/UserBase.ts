export default class UserBase {
    public id: string = '';
    public account: string = ''; // 帐号
    // /基本信息
    public head: string = ''; // 照片
    public avatar: string = ''; // 自定义照片，（当用户选择系统头像时为空）
    public nickname: string = ''; // 昵称
    public name: string = ''; // 姓名
}
