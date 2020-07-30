import NetSocket from '@/app/base/net/NetSocket';
import Handler from '@/app/base/net/Handler';
import DataBackAction from '@/app/base/net/DataBackAction';
import MessageHandler from '@/app/base/net/MessageHandler';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import InvokeAction from '@/app/base/net/InvokeAction';
import LogHandler from '@/app/base/log/LogHandler';
import NetUtil from '@/app/base/net/NetUtil';
import ErrorPrompt from '@/app/base/net/ErrorPrompt';

export default class NetServer {

    /**
     * 记录打开页面后第几次成功连接
     */
    private connectCount = 0;

    private reconnectTryCount = 3;
    private reconnectWaitTimestamp = 1000 * 60 * 2;

    private reconnectCount = 0;
    private reconnectTimestamp = 0;

    /**
     * 是否提示过网络异常等待
     */
    private reconnectHasShowWait = false;

    private autoConnect = false;
    private autoConnecting = false;
    private connecting = false;

    /**
     * 是否已经连接过
     */
    private doConnected = false;
    private intervalTime: number = 0;
    private socketHost: string = '';
    private connectedTemp = false;
    /**
     * 记录客户端和服务端最后通信时间
     */
    private activeTimestamp = 0;
    private messageHandler = new MessageHandler();
    private messageKeyCount = 0;

    private readonly netSocket: NetSocket;
    private connectHandler: ConnectHandler = {} as ConnectHandler;
    private errorPrompt: ErrorPrompt = {} as ErrorPrompt;


    constructor() {
        const own = this;
        const handler = {
            onOpen(): void {
                own.connectCount++;
                own.connectHandler.onOpen();
            },
            onMessage(data: any): void {
                try {
                    own.onMessage(data);
                } catch (e) {
                    console.error(e);
                }
            },
            onClose(e: CloseEvent): void {
                own.connectHandler.onClose();
            },
            onError(): void {
                own.connectHandler.onError();
            },
        } as Handler;
        this.netSocket = new NetSocket(handler);
        const h = () => {
            own.handle();
        };
        own.intervalTime = window.setInterval(h, 1000);
        this.initialize();
    }


    // public invokeAction: ((key: string, data: any) => any) = () => {
    //     // TODO
    // };

    public setConnectHandler(connectHandler: ConnectHandler): void {
        this.connectHandler = connectHandler;
    }

    public setInvokeAction(invokeAction: InvokeAction): void {
        this.messageHandler.setInvokeAction(invokeAction);
    }

    public setErrorPrompt(errorPrompt: ErrorPrompt): void {
        this.errorPrompt = errorPrompt;
    }

    public setSocketHost(socketHost: string): void {
        this.socketHost = socketHost;
    }

    public setAutoConnect(autoConnect: boolean) {
        this.autoConnect = autoConnect;
    }

    public connect(host: string, onOpen?: () => void): boolean {
        this.connecting = true;
        const mark = this.netSocket.connect(host, onOpen);
        this.connecting = false;
        if (mark) {
            this.doConnected = true;
        }
        return mark;
    }

    public closeNetSocket(): void {
        if (this.netSocket) {
            this.netSocket.closeWebSocket();
        }
    }

    public send(data: any, back?: DataBackAction, parallel?: boolean): void {
        if (data && data.head) {
            const head = data.head;
            if (0 === head.timestamp || NetUtil.isEmpty(head.timestamp) || NetUtil.isEmpty(head.key)) {
                const timestamp = new Date().getTime();
                if (0 === head.timestamp || NetUtil.isEmpty(head.timestamp)) {
                    head.timestamp = timestamp;
                }
                if (NetUtil.isEmpty(head.key)) {
                    this.messageKeyCount++;
                    head.key = (this.messageKeyCount + timestamp) + '';
                }
            }
            this.messageHandler.putHandleData(head.key, data, head.timestamp, back, parallel);
            const lost: () => void = (): void => {
                if (back) {
                    back.lost(data);
                } else {
                    this.prompt('消息发送失败！');
                }
            };
            this.sendMessage(data, lost);
        }
    }


    public onMessage(value: any): void {

        let response = true;
        this.activeTimestamp = new Date().getTime();
        const data: any = NetUtil.jsonToObject(value);
        if (data) {
            const head = data.head;
            const action = head.action;
            const method = head.method;

            const actionPath = action + method;
            this.messageHandler.backMessage(actionPath, head.key, data);

            if (data.info) {
                response = false;
            }
        }

        if (response) {
            LogHandler.debug('response:' + value);
        } else {
            LogHandler.debug('push:' + value);
        }
    }

    public isConnected(): boolean {
        let isConnected = true;
        if (this.netSocket) {
            isConnected = this.netSocket.isConnected();
        } else {
            isConnected = false;
        }
        return isConnected;
    }

    public isConnecting(): boolean {
        return this.connecting;
    }

    /**
     * 获取连接次数
     * @returns {number}
     */
    public getConnectCount(): number {
        return this.connectCount;
    }

    public setReconnectWaitTimestamp(reconnectWaitTimestamp: number) {
        this.reconnectWaitTimestamp = reconnectWaitTimestamp;
    }

    private initialize(): void {
        // TODO
    }

    private sendMessage(message: any, lost: any): void {
        const json = NetUtil.objectToJson(message);
        LogHandler.debug('request:' + json);
        if (this.netSocket) {
            this.netSocket.send(json, lost);
            this.activeTimestamp = new Date().getTime();
        }
    }

    private handle(): void {
        this.handleAutoConnect();
        this.handleConnectStatusChange();
        this.handleIdle();
        this.handleBreak();
    }

    /**
     * 处理连接状态变化
     */
    private handleConnectStatusChange(): void {
        const isConnected = this.isConnected();
        if (isConnected !== this.connectedTemp) {
            this.connectedTemp = isConnected;
            this.onConnectStatusChange(isConnected);
        }
    }

    /**
     * 处理空闲
     */
    private handleIdle(): void {
        const isConnected = this.isConnected();
        if (isConnected) {
            // 网络处于连接状态，并且一段时间没发信息了
            const timestamp = new Date().getTime();
            if ((timestamp - this.activeTimestamp) > (40 * 1000)) {// 40秒发送一次心跳包
                this.onIdle();
            }
        }
    }

    /**
     * 处理断开连接的情况
     */
    private handleBreak(): void {
        const isConnected = this.isConnected();
        // 判断是否没有连接成功
        if (!isConnected) {
            const autoConnect: boolean = this.canAutoConnect();
            // 是否开启自动重试
            if (autoConnect) {
                // 当开启自动重试，并且已经连接过，重试失败了，并且不重试了，执行端口
                if (this.doConnected && !this.autoConnecting) {
                    this.doConnected = false;
                    this.onBreak();
                }
            } else {
                if (this.doConnected) {
                    this.doConnected = false;
                    this.onBreak();
                }
            }
        }
    }

    private handleAutoConnect(): void {
        const autoConnect: boolean = this.canAutoConnect();
        if (autoConnect) {
            if (this.reconnectCount < this.reconnectTryCount) {
                this.reconnectCount++;
                this.reconnectTimestamp = new Date().getTime();
                this.connect(this.socketHost);
                this.autoConnecting = true;
            } else {
                this.autoConnecting = false;
                const timestamp = new Date().getTime();
                // 2分钟尝试一次
                if ((timestamp - this.reconnectTimestamp) < this.reconnectWaitTimestamp) {
                    if (!this.reconnectHasShowWait) {
                        this.reconnectHasShowWait = true;
                        this.prompt('网络异常！');
                    }
                } else {
                    this.reconnectHasShowWait = false;
                    this.reconnectCount = 0;
                }
            }
        }
    }

    private canAutoConnect(): boolean {
        const can: boolean = (this.autoConnect && !NetUtil.isEmpty(this.socketHost) && !this.isConnected());
        return can && !this.connecting;
    }

    private prompt(message: string): void {
        if (typeof (this.errorMessage) === 'function') {
            this.errorMessage(message);
        }
    }

    // private showErrorMessage(data: any): void {
    //     if (data && data.head) {
    //         const head = data.head;
    //         const info = data.info;
    //         if (head && head.result) {
    //             const result = head.result;
    //             const code: string = result.code;
    //             const message: string = result.message;
    //             if ('1' !== code) {
    //                 this.prompt(message);
    //             }
    //         }
    //     }
    // }


    private errorMessage(message: string): void {
        this.errorPrompt.prompt(message);
    }

    private onIdle(): void {
        this.connectHandler.onIdle();
    }

    private onBreak(): void {
        this.connectHandler.onBreak();
    }

    private onConnectStatusChange(isConnected: boolean): void {
        this.connectHandler.onConnectStatusChange(isConnected);
    }
}
