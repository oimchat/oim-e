import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SecurityQuestion from '@/app/com/main/module/business/user/bean/SecurityQuestion';
import AccountCall from '@/app/com/main/module/business/account/call/AccountCall';
import PersonalCall from '@/app/com/main/module/business/personal/call/PersonalCall';
import RegisterData from '@/app/com/main/module/business/account/data/RegisterData';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ServerService from '@/app/com/main/module/business/server/service/ServerService';

export default class AccountController extends AbstractMaterial {

    public register(u: RegisterData, list: SecurityQuestion[], back: (success: boolean) => void) {
        if (u && u.tempPassword) {
            u.password = Md5.init(u.tempPassword);
        }
        const registerBack = (data: any) => {
            let mark = false;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (info) {
                    mark = (info.success);
                }
            }
            back(mark);
        };

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                back(success);
            } else {
                const client: AccountCall = this.appContext.getMaterial(AccountCall);
                client.register(u, list, registerBack);
            }
        };
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(addressBack);
    }

    public getSecurityQuestionList(account: string, back: (data: any) => void): void {
        const client: AccountCall = this.appContext.getMaterial(AccountCall);
        client.getSecurityQuestionList(account, back);
    }


    public updatePassword(userId: string, password: string, answers: SecurityQuestion[], back: (success: boolean) => void): void {
        if (password) {
            password = Md5.init(password);
        }
        const client: AccountCall = this.appContext.getMaterial(AccountCall);
        client.updatePassword(userId, password, answers, back);
    }
}
