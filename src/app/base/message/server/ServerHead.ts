import BaseUtil from '@/app/lib/util/BaseUtil';
import Head from '@/app/base/message/Head';
import Server from './Server';
import Result from './Result';

export default class ServerHead extends Head {

    public static build(action: string, method: string): ServerHead {
        const key: string = BaseUtil.getUUID();
        const timestamp: number = BaseUtil.getTimestamp();
        const head: ServerHead = new ServerHead();
        head.key = key;
        head.timestamp = timestamp;
        head.action = action;
        head.method = method;
        return head;
    }

    public static buildResult(code: string, message: string): ServerHead {
        const key: string = BaseUtil.getUUID();
        const timestamp: number = BaseUtil.getTimestamp();
        const result: Result = new Result();
        result.code = code;
        result.message = message;

        const head: ServerHead = new ServerHead();
        head.key = key;
        head.timestamp = timestamp;
        head.result = result;
        return head;
    }

    public server: Server = new Server();
    public result: Result = new Result();
}
