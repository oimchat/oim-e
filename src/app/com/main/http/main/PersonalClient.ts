import {Md5} from 'md5-typescript';

import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerBox from '@/app/com/main/box/ServerBox';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import Info from '@/app/base/message/Info';

export default class PersonalClient extends AbstractMaterial {
    private action: string = '1.1.001';

    public login(a: string, p: string, back: any): void {
        const body: object = {
            account: a,
            password: p,
        };
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        this.post(m, back, true);
    }

    public register(u: User, list: SecurityQuestion[], back: (data: any) => void) {
        const body: object = {
            user: u,
            questions: list,
        };
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        this.post(m, back, true);
    }


    private post(m: any, back: (data: any) => void, prompt?: boolean | null) {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const address = serverBox.getAddress(ServerType.main, Protocol.HTTP);
        if (!address || '0' === address.isEnabled) {
            const message: any = m;
            const info = new Info();
            info.addError('0001', '服务器不可用！');
            message.info = info;
            back(message);
        } else {
            http.post(address.address + '/v1/api', m, back, true);
        }
    }
}

