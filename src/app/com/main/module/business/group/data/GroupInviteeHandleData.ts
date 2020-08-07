export default class GroupInviteeHandleData {
    public applyIds: string[] = []; // 请求记录id
    public inviteeHandleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public message: string = ''; // 附加消息
}
