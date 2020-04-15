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
import LoginData from '@/app/com/data/LoginData';

export default class PersonalClient extends AbstractMaterial {
    private action: string = '1.1.002';

    public login(loginData: LoginData, back: any): void {
        const body = loginData;
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        this.post(m, back, true);
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
        } else {
            http.post(address.address + '/v1/api', m, back, true);
        }
    }
}

