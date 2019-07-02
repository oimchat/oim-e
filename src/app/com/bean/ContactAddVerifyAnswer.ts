export default class ContactAddVerifyAnswer {
    public applyId: string = ''; // 请求消息的id(对应ContactAddApply中的id)
    public applyUserId: string = '';
    public targetUserId: string = ''; // 被添加的用户
    public questionId: string = ''; // 问题id(对应ContactAddVerifyQuestion中的id)
    public question: string = ''; // 问题
    public answer: string = ''; // 答案
}
