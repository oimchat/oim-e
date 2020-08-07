import app from '@/app/App';

import RegisterData from '@/app/com/main/module/business/account/data/RegisterData';
import QuestionData from '@/app/com/main/module/business/user/data/QuestionData';
import SecurityQuestion from '@/app/com/main/module/business/user/bean/SecurityQuestion';
import AccountController from '@/app/com/main/module/business/account/controller/AccountController';


class RegisterViewModel {

    private user: RegisterData = new RegisterData();
    private questionData: QuestionData = new QuestionData();

    public initialize() {
        // no
    }

    public register(back: (success: boolean) => void): void {
        const own = this;
        const controller: AccountController = app.appContext.getMaterial(AccountController);
        const user = this.user;
        const questions = this.questionData.questions;
        controller.register(user, questions, back);
    }


    public addQuestion(): void {
        const length = this.questionData.questions.length;
        if (length < 3) {
            this.questionData.questions.push(new SecurityQuestion());
        }
    }

    public removeQuestion(index: number): void {
        this.questionData.questions.splice(index, 1);
    }
}

export default new RegisterViewModel();
