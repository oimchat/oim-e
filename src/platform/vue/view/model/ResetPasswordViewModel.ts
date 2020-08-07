import app from '@/app/App';
import BaseUtil from '@/app/lib/util/BaseUtil';
import RegisterData from '@/app/com/main/module/business/account/data/RegisterData';
import QuestionData from '@/app/com/main/module/business/user/data/QuestionData';
import AccountController from '@/app/com/main/module/business/account/controller/AccountController';


class ResetPasswordViewModel {

    public account: string = '';
    public userId: string = '';
    public user: RegisterData = new RegisterData();
    public questionData: QuestionData = new QuestionData();


    public initialize() {
        this.account = '';
        this.userId = '';
        this.user = new RegisterData();
        this.questionData = new QuestionData();
    }

    public getQuestions(back: (success: boolean, message: string) => void): void {
        const own = this;
        const account = this.account;
        if (!account) {
            back(false, '请输入账号');
            return;
        }
        const getBack = (data: any) => {
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (info) {
                    if (info.success && data.body) {
                        const userId = data.body.userId;
                        const list = data.body.items;
                        own.userId = userId;
                        own.questionData.questions = list;
                        back(true, '');
                    }
                }
            }
        };
        const ac: AccountController = app.appContext.getMaterial(AccountController);
        ac.getSecurityQuestionList(account, getBack);
    }

    public updatePassword(back: (success: boolean) => void): void {
        const own = this;
        const ac: AccountController = app.appContext.getMaterial(AccountController);


        const user = this.user;
        const questions = this.questionData.questions;

        const size = questions.length;

        const userId = this.userId;
        const password = this.user.tempPassword;
        ac.updatePassword(userId, password, questions, back);
    }
}

export default new ResetPasswordViewModel();
