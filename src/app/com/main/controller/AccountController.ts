import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import AccountClient from '@/app/com/main/http/main/AccountClient';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import RegisterData from '@/app/com/bean/RegisterData';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ServerService from '@/app/com/main/service/ServerService';

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
                const client: AccountClient = this.appContext.getMaterial(AccountClient);
                client.register(u, list, registerBack);
            }
        };
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(addressBack);
    }

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
