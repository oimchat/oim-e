export default class ContactAddApply {

    /*** 0:未处理 **/
    public static HANDLE_TYPE_UNTREATED: string = '0';
    /*** 1:同意 **/
    public static HANDLE_TYPE_ACCEPT: string = '1';
    /*** 2:拒绝 **/
    public static HANDLE_TYPE_REJECT: string = '2';
    /*** 3:忽略 **/
    public static HANDLE_TYPE_IGNORE: string = '3';

    public id: string = '';
    public applyUserId: string = ''; // 添加联系人的请求用户
    public targetUserId: string = ''; // 被添加的用户
    public categoryId: string = ''; // 分组id
    public remark: string = ''; // 备注名
    public verifyType: string = ''; // 当时设定的验证方式
    public question: string = ''; // 问题(当验证方式为回答问题时)
    public answer: string = ''; // 答案(当验证方式为回答问题时)
    public handleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public handleDateTime: string = ''; // 处理时间
    public message: string = ''; // 附加消息
}
