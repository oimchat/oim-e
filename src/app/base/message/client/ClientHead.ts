import BaseUtil from '@/app/lib/util/BaseUtil';
import Head from '@/app/base/message/Head';

export default class ClientHead extends Head {

    public static build(action: string, method: string): ClientHead {
        const key: string = BaseUtil.getUUID();
        const timestamp: number = BaseUtil.getTimestamp();
        const head: ClientHead = new ClientHead();
        head.key = key;
        head.timestamp = timestamp;
        head.action = action;
        head.method = method;
        return head;
    }
}
