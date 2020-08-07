import {Md5} from 'md5-typescript';

import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';
import User from '@/app/com/main/module/business/user/bean/User';
import SecurityQuestion from '@/app/com/main/module/business/user/bean/SecurityQuestion';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ServerBox from '@/app/com/main/module/business/server/box/ServerBox';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import Info from '@/app/base/message/Info';
import LoginData from '@/app/com/main/module/business/index/data/LoginData';
import ServerAddressUtil from '@/app/com/main/common/util/ServerAddressUtil';

export default class PersonalCall extends AbstractMaterial {
    private action: string = '1.1.002';

    public login(loginData: LoginData, back: (data: any) => void): void {
        const body = loginData;
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        this.post(m, back, true);
    }


    private post(m: any, back: (data: any) => void, prompt?: boolean) {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        const address = serverBox.getAddress(ServerType.main, Protocol.HTTP);
        if (!address || !address.enabled) {
            const message: any = m;
            const info = new Info();
            info.addError('0001', '服务器不可用！');
            message.info = info;
            back(message);
        } else {
            const url = ServerAddressUtil.convertHttpUrl(address);
            http.post(url, m, back, prompt);
        }
    }
}

