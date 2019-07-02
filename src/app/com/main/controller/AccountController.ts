import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/AbstractMaterial';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import AccountClient from '@/app/com/main/http/main/AccountClient';

export default class AccountController extends AbstractMaterial {


    public getSecurityQuestionList(account: string, back: (data: any) => void): void {
        AccountClient.getSecurityQuestionList(account, back);
    }


    public updatePassword(userId: string, password: string, answers: SecurityQuestion[], back: (success: boolean) => void): void {
        if (password) {
            password = Md5.init(password);
        }
        AccountClient.updatePassword(userId, password, answers, back);
    }
}
