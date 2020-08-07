export default class ContactCategory {

    public static TYPE_DEFAULT: number = 1;
    public static TYPE_CUSTOM: number = 2;

    public id: string = '';
    public userId: string = ''; // 拥有分组用户id
    public sort: number = 0;
    public type: number = 0;
    public name: string = '';
}
