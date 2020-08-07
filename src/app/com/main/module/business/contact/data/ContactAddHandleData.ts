export default class ContactAddHandleData {
    public applyIds: string[] = []; // 请求记录id
    public applyUserId: string = ''; // 添加联系人的请求用户
    public categoryId: string = ''; // 分组id
    public remark: string = ''; // 备注名
    public handleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public message: string = ''; // 附加消息
}
