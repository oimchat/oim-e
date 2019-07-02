export default class GroupInviteVerifyHandleData {
    public applyIds: string[] = []; // 请求记录id
    public verifyHandleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public verifyUserId: string = '';
    public message: string = ''; // 附加消息
}
