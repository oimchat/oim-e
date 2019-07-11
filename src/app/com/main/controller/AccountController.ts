import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/AbstractMaterial';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import AccountClient from '@/app/com/main/http/main/AccountClient';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';

export default class AccountController extends AbstractMaterial {


    public getSecurityQuestionList(account: string, back: (data: any) => void): void {
        const client: AccountClient = this.appContext.getMaterial(AccountClient);
        client.getSecurityQuestionList(account, back);
    }


    public updatePassword(userId: string, password: string, answers: SecurityQuestion[], back: (success: boolean) => void): void {
        if (password) {
            password = Md5.init(password);
        }
        const client: AccountClient = this.appContext.getMaterial(AccountClient);
        client.updatePassword(userId, password, answers, back);
    }
}
