export default class GroupMember {
    public static   POSITION_OWNER: string = '1';
    public static   POSITION_ADMIN: string = '2';
    public static   POSITION_NORMAL: string = '3';

    public id: string = '';
    public groupId: string = ''; // 帐号
    public userId: string = ''; // 群成员id
    public position: string = ''; // 权限
    public nickname: string = ''; // 备注名

}
