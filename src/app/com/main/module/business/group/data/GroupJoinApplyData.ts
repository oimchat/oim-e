export default class GroupJoinApplyData {
    public applyUserId: string = ''; // 添加联系人的请求用户
    public groupId: string = ''; // 被申请的群id
    public question: string = ''; //
    public answer: string = ''; // 答案(当验证方式为回答问题时)
    public message: string = ''; // 附加消息
    public categoryId: string = ''; // 分组id
    public remark: string = ''; // 备注名
}
