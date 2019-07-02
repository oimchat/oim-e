export default class ContactCategory {

    public static SORT_DEFAULT: number = 1;
    public static SORT_CUSTOM: number = 2;

    public id: string = '';
    public userId: string = ''; // 拥有分组用户id
    public rank: number = 0;
    public sort: number = 0;
    public name: string = '';
}
