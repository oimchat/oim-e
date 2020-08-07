import ContactAddApply from '@/app/com/main/module/business/contact/bean/ContactAddApply';
import ContactAddVerifyAnswer from '@/app/com/main/module/business/contact/bean/ContactAddVerifyAnswer';
import User from '@/app/com/main/module/business/user/bean/User';

export default class ContactAddApplyEntityCase {
    public apply: ContactAddApply = new ContactAddApply();
    public user: User = new User();
    public answers: ContactAddVerifyAnswer[] = [];
}
