import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import BaseUtil from '@/app/lib/util/BaseUtil';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerBox from '@/app/com/main/box/ServerBox';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import Info from '@/app/base/message/Info';
import PromptHandlerType from '@/app/base/PromptHandlerType';
import ServerAddressUtil from '@/app/com/main/util/ServerAddressUtil';

export default class AccountClient extends AbstractMaterial {

    private action: string = '1.1.001';

    public register(u: User, list: SecurityQuestion[], back: (data: any) => void) {
        const body: object = {
            user: u,
            questions: list,
        };
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        this.post(m, back, true);
    }

    public getSecurityQuestionList(value: string, back: (data: any) => void): void {
        const body: object = {
            account: value,
        };
        const m = Message.build(this.action, '1.1.0002');
        m.body = body;

        this.post(m, back, true);
    }


    public updatePassword(id: string, value: string, list: SecurityQuestion[], back: (success: boolean) => void): void {

        const updateBack = (data: any) => {
            let mark = false;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (info && info.success) {
                    mark = true;
                }
            }
            back(mark);
        };
        const body: object = {
            userId: id,
            password: value,
            answers: list,
        };
        const m = Message.build(this.action, '1.1.0003');
        m.body = body;

        this.post(m, back, true);
    }

    public isExistAccount(value: string, back: (exist: boolean) => void): void {
        if (BaseUtil.isEmpty(value)) {
            back(false);
            return;
        }
        const existBack = (data: any) => {
            let mark = true;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (data.body && !BaseUtil.isEmpty(data.body.exist)) {
                    mark = data.body.exist;
                }
            }
            back(mark);
        };
        const body: object = {
            account: value,
        };
        const m = Message.build(this.action, '1.1.0006');
        m.body = body;
        this.post(m, existBack, true);
    }

    public isExistEmail(value: string, back: (exist: boolean) => void): void {
        if (BaseUtil.isEmpty(value)) {
            back(false);
            return;
        }
        const existBack = (data: any) => {
            let mark = true;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (data.body && !BaseUtil.isEmpty(data.body.exist)) {
                    mark = data.body.exist;
                }
            }
            back(mark);
        };
        const body: object = {
            email: value,
        };
        const m = Message.build(this.action, '1.1.0007');
        m.body = body;
        this.post(m, existBack, true);
    }

    public isExistMobile(value: string, back: (exist: boolean) => void): void {
        if (BaseUtil.isEmpty(value)) {
            back(false);
            return;
        }
        const existBack = (data: any) => {
            let mark = true;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (data.body && !BaseUtil.isEmpty(data.body.exist)) {
                    mark = data.body.exist;
                }
            }
            back(mark);
        };
        const body: object = {
            mobile: value,
        };
        const m = Message.build(this.action, '1.1.0008');
        m.body = body;
        this.post(m, existBack, true);
    }

    private post(m: any, back: (data: any) => void, prompt?: boolean | null) {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const address = serverBox.getAddress(ServerType.main, Protocol.HTTP);
        if (!address || !address.enabled) {
            const message: any = m;
            const info = new Info();
            info.addError('0001', '服务器不可用！');
            message.info = info;
            back(message);
            if (prompt) {
                this.appContext.prompt('服务器不可用！', '错误', PromptHandlerType.error);
            }
        } else {
            const url = ServerAddressUtil.convertHttpUrl(address);
            http.post(url, m, back, true);
        }
    }
}

