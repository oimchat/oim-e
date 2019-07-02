import BaseUtil from '@/app/lib/util/BaseUtil';
import HandleData from '@/app/base/net/HandleData';
import DataBackAction from '@/app/base/net/DataBackAction';
import InvokeAction from '@/app/base/net/InvokeAction';

export default class MessageHandler {

    private timeOut: number = 6000;
    private dataMap: Map<string, HandleData> = new Map<string, HandleData>();
    private invokeAction: InvokeAction = {
        invoke(key: string, data: any): void {
            // no thing
        },
    } as InvokeAction;

    constructor() {
        this.initialize();
    }

    public setInvokeAction(invokeAction: InvokeAction): void {
        this.invokeAction = invokeAction;
    }

    public putHandleData(key: string, data: any, sendTimestamp: number, back?: DataBackAction, parallel?: boolean): void {
        if (key) {
            const hd = new HandleData();
            hd.sendTimestamp = (BaseUtil.isEmpty(sendTimestamp) || 0 === sendTimestamp) ? new Date().getTime() : sendTimestamp;
            hd.data = data;
            hd.back = back;
            hd.parallel = parallel || true;
            this.dataMap.set(key, hd);
        }
    }

    public backMessage(actionPath: string, key: string, data: any) {
        const object = this.dataMap.get(key);
        if (object) {
            const back: DataBackAction | any = object.back; // 信息发送后都回调
            const parallel: boolean = object.parallel;
            this.dataMap.delete(key);
            if (!BaseUtil.isEmpty(back)) {
                back.back(data);
            }
            if (parallel) {
                this.invokeAction.invoke(actionPath, data);
            }
        } else {
            this.invokeAction.invoke(actionPath, data);
        }
    }

    public handlerTimeOut(): void {
        const timeOut = this.timeOut;
        const keys: IterableIterator<string> = this.dataMap.keys();
        if (keys) {
            for (const key of keys) {
                const timestamp = new Date().getTime();
                const object = this.dataMap.get(key);
                if (object) {
                    const message = object.data;
                    const sendTime = object.sendTimestamp;
                    // var backExecute = object.backExecute; //信息发送后都回调
                    // var lostExecute = object.lostExecute;//发送失败执行
                    const back = object.back; // 发送超时执行
                    if (timestamp - sendTime >= timeOut) {
                        this.dataMap.delete(key);
                        if (back) {
                            if (typeof (back.timeOut) === 'function') {
                                back.timeOut(message);
                            }
                        }
                    }
                }
            }
        }
    }

    private initialize(): void {
        const own = this;
        window.setInterval(() => {
            own.handlerTimeOut();
        }, 2000);
    }
}
