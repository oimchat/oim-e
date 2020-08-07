export default class UserHead {
    public static TYPE_SYSTEM: string = '1';
    public static TYPE_CUSTOM: string = '2';

    public userId: string = '';
    public headId: string = '';
    public fileName: string = '';
    public type: string = UserHead.TYPE_CUSTOM;
    public url: string = '';
}
