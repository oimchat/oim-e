import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Head from '@/app/base/message/Head';
import InfoMessage from '@/app/base/message/InfoMessage';
import httpClient from '@/app/lib/http/HttpClient';
import Info from '@/app/base/message/Info';
import auth from '@/app/common/auth/Auth';
import Prompter from '@/app/com/client/component/Prompter';

export default class HttpInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHttp(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHttp(appContext: AppContext) {
        const prompter: Prompter = appContext.getMaterial(Prompter);
        // no
        httpClient.setHttpHandler({
            handleRequest(request: AxiosRequestConfig): void {
                // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
                request.headers.token = auth.getToken();
                request.headers.key = auth.getUserId();
            },
            handleResponse(response: AxiosResponse, back?: (data: any) => void, prompt?: boolean): void {
                const value = response.data;
                if (typeof (back) === 'function') {
                    back(value);
                }
                const hasBack = (typeof back === 'function');
                if (prompt || !hasBack) {
                    // 需要提示
                    if (!BaseUtil.isEmpty(value)) {
                        const info = value.info;
                        if (info && !info.success) {
                            prompter.message(info, '', '失败！');
                        }
                    }
                }
            },
            handleError(error: any, back?: (data: any) => void, prompt?: boolean): void {
                let message = '网络异常';
                if (error.response) {
                    message = error.message;
                    const response = error.response;
                    const status = response.status;

                    switch (status) {
                        case 400:
                            message = '400！';
                            break;
                        case 401:
                            message = '401！';
                            break;
                        case 403:
                            message = '403！';
                            break;
                        case 404:
                            message = '404！';
                            break;
                        case 500:
                            message = '服务异常！';
                            break;
                        default:
                    }
                } else {
                    const m = error.message;
                    if (m === 'Network Error') {
                        message = '网络错误或者连接超时请稍后重试！';
                    } else {
                        message = m;
                    }
                }
                const hasBack = (typeof back === 'function');
                if (typeof (back) === 'function') {
                    const serverHead: Head = new Head();
                    const m: InfoMessage<Head> = new InfoMessage<Head>();
                    m.head = serverHead;
                    m.info = new Info();
                    m.info.addError('1.000', message);
                    back(m);
                }
                if (prompt || !hasBack) {
                    prompter.error(message);
                }
            },
            handlePrompt(message: string): void {
                prompter.error(message);
            },
        });
    }
}
