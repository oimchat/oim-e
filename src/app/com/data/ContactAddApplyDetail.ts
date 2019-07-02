import ContactAddApply from '@/app/com/bean/ContactAddApply';
import ContactAddVerifyAnswer from '@/app/com/bean/ContactAddVerifyAnswer';
import User from '@/app/com/bean/User';

export default class ContactAddApplyDetail {
    public apply: ContactAddApply = new ContactAddApply();
    public user: User = new User();
    public answerList: ContactAddVerifyAnswer[] = [];
}
