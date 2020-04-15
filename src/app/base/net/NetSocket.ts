import Handler from '@/app/base/net/Handler';

export default class NetSocket {

    private socket: WebSocket | null = null; // = new WebSocket('');
    private openList: any[] = [];

    constructor(protected handler: Handler) {
        this.initialize();
    }

    public connect(host: string, onOpen?: () => void): boolean {
        this.closeWebSocket();
        let mark: boolean = true;
        if ('WebSocket' in window) {
            try {
                if (onOpen) {
                    this.openList.push(onOpen);
                }
                this.socket = new WebSocket(host);
                this.initializeSocket(this.socket);

            } catch (e) {
                mark = false;
            }
        } else if ('MozWebSocket' in window) {
            // this.socket = new MozWebSocket(host);
            mark = false;
        } else {
            mark = false;
        }
        return mark;
    }

    public send(message: any, lostExecute: any): void {
        if (this.socket && this.socket.readyState === 1) {
            try {
                this.socket.send(message);
            } catch (e) {
                if (typeof (lostExecute) === 'function') {
                    lostExecute(message);
                }
            }
        } else {
            if (typeof (lostExecute) === 'function') {
                lostExecute(message);
            }
        }
    }

    public isConnected(): boolean {
        let isConnected: boolean = true;
        if (this.socket) {
            if (this.socket.readyState !== 1) {
                isConnected = false;
            }
        } else {
            isConnected = false;
        }
        return isConnected;
    }

    public closeWebSocket(): boolean {
        let mark = true;
        try {
            if (this.socket) {
                this.socket.close();
            }
        } catch (e) {
            // do something
            mark = false;
        }
        return mark;
    }

    private initialize(): void {
        const netSocket = this.socket;
        window.onbeforeunload = () => {
            let isIE10 = false;
            const reg = /10\.0/;
            const text = navigator.userAgent;
            if (reg.test(text)) {
                isIE10 = true;
            }
            if (!isIE10 && netSocket) {
                netSocket.close();
            }
        };
    }

    private initializeSocket(socket: WebSocket): void {
        const own = this;
        // 连接发生错误的回调方法
        socket.onerror = (e: Event) => {
            own.handler.onError();
        };

        // 连接成功建立的回调方法
        socket.onopen = (e: Event) => {
            const openList = own.openList;
            if (openList && openList.length > 0) {
                const length = openList.length;
                for (const onOpen of openList) {
                    if (typeof (onOpen) === 'function') {
                        onOpen();
                    }
                }
                openList.splice(0, length);
            }
            own.handler.onOpen();
        };

        // 接收到消息的回调方法
        socket.onmessage = (e: MessageEvent) => {
            own.handler.onMessage(e.data);
        };

        // 连接关闭的回调方法
        socket.onclose = (e: CloseEvent) => {
            own.handler.onClose(e);
        };
    }
}
