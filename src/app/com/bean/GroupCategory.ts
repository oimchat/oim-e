export default class GroupCategory {

    public static SORT_DEFAULT: number = 1;
    public static SORT_CUSTOM: number = 2;

    public id: string = '';
    public userId: string = ''; // 所属用户id
    public rank: number = 0; // 排序
    public sort: number = 0; // 类型：1、系统默认生成的 2、用户自己新增的
    public name: string = ''; // 组名字
}
