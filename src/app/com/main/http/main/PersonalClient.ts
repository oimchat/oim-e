import {Md5} from 'md5-typescript';

import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';

class PersonalClient {

    public static login(a: string, p: string, back: any): void {
        const body: object = {
            account: a,
            password: p,
        };
        const m = Message.build(this.action, '1.1.0005');
        m.body = body;
        http.post('/main/v1/web/api', m, back, true);
    }

    public static register(u: User, list: SecurityQuestion[], back: (data: any) => void) {
        const body: object = {
            user: u,
            questions: list,
        };
        const m = Message.build(this.action, '1.1.0001');
        m.body = body;
        http.post('/main/v1/web/api', m, back, true);
    }

    private static action: string = '1.1.001';
}

export default PersonalClient;
