import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import BaseUtil from '@/app/lib/util/BaseUtil';

class AccountClient {

    public static getSecurityQuestionList(value: string, back: (data: any) => void): void {
        const body: object = {
            account: value,
        };
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        http.post('/main/v1/web/api', m, back, true);
    }


    public static updatePassword(id: string, value: string, list: SecurityQuestion[], back: (success: boolean) => void): void {

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
        const m = Message.build(this.action, '1.1.0002');
        m.body = body;
        http.post('/main/v1/web/api', m, updateBack, true);
    }

    public static isExistAccount(value: string, back: (exist: boolean) => void): void {
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
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        http.post('/main/v1/web/api', m, existBack, true);
    }

    public static isExistEmail(value: string, back: (exist: boolean) => void): void {
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
        const m = Message.build(this.action, '1.1.0006');
        m.body = body;
        http.post('/main/v1/web/api', m, existBack, true);
    }

    public static isExistMobile(value: string, back: (exist: boolean) => void): void {
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
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        http.post('/main/v1/web/api', m, existBack, true);
    }

    private static action: string = '1.1.000';
}

export default AccountClient;
