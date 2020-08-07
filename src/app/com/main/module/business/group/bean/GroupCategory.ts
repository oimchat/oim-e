export default class GroupCategory {

    public static TYPE_DEFAULT: number = 1;
    public static TYPE_CUSTOM: number = 2;

    public id: string = '';
    public userId: string = ''; // 所属用户id
    public sort: number = 0; // 排序
    public type: number = 0; // 类型：1、系统默认生成的 2、用户自己新增的
    public name: string = ''; // 组名字
}
