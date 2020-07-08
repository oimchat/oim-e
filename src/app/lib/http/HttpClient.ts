import axios from 'axios';
import BaseUtil from '@/app/lib/util/BaseUtil';
import auth from '@/app/common/auth/Auth';
import AppSetting from '@/app/base/config/AppSetting';
import LogHandler from '@/app/base/log/LogHandler';
import Head from '@/app/base/message/Head';
import Info from '@/app/base/message/Info';
import InfoMessage from '@/app/base/message/InfoMessage';
import app from '@/app/App';
import PromptHandlerType from '@/app/base/PromptHandlerType';

class HttpClient {

    private client = axios.create({
        baseURL: AppSetting.SERVER_URL,
        timeout: 100000,
    });

    constructor() {
        this.init();
    }

    public setBaseURL(url: string) {
        this.client = axios.create({
            baseURL: url,
            timeout: 100000,
        });
        this.init();
    }

    public post(url: string, data: object, back?: (data: any) => void, prompt?: boolean | null): void {
        // url = AppSetting.SERVER_URL + url;
        // TODO
        // 同步方式 var res =  await axios.post('')// 这里的res就是你axios请求回来的结果了
        LogHandler.debug('request:' + BaseUtil.objectToJson(data));
        this.client.post(url, data).then((response) => {
            const value = response.data;
            LogHandler.debug('response:' + BaseUtil.objectToJson(value));
            if (typeof (back) === 'function') {
                back(value);
            }

            if (prompt) {
                if (!BaseUtil.isEmpty(value)) {
                    const head = value.head;
                    const info = value.info;
                    if (info && prompt) {
                        if (!info.success) {
                            app.appContext.promptData(value);
                        }
                    }
                }
            }
        }).catch((error: any) => {
            const serverHead: Head = new Head();
            const message: InfoMessage<Head> = new InfoMessage<Head>();
            message.head = serverHead;
            message.info = new Info();
            message.info.addError('1.000', '请求异常！');
            if (typeof (back) === 'function') {
                back(message);
            }
        });
    }


    private responseError = (error: any) => {
        if (error.response) {
            let message = error.message;
            const response = error.response;
            const status = response.status;

            switch (status) {
                case 400:
                    message = '404！';
                    break;
                case 401:

                    break;
                case 403:

                    break;
                case 404:

                    break;
                case 500:
                    message = '服务异常！';
                    break;
                default:

            }
            app.appContext.prompt(message, '错误', PromptHandlerType.error);
        } else {
            let message = error.message;
            if (message === 'Network Error') {
                message = '网络连接超时请稍后重试！';
            } else {
                message = '网络连接超时请稍后重试！';
            }
            // 请求超时处理
            app.appContext.prompt(message, '错误', PromptHandlerType.error);
        }
        return Promise.reject(error);
    };

    private responseHandler = (response: any) => {
        const status = response.status;
        const headers = response.headers;
        if (200 === status) {
            // const data = response.data;
            // if (!BaseUtil.isEmpty(data)) {
            //     const head = data.head;
            //     const info = data.info;
            //     if (head && head.result) {
            //         const result = head.result;
            //         const code: string = result.code;
            //         const message: string = result.message;
            //         if ('1' !== code) {
            //             if ('101' === code) {
            //                 // TODO
            //             } else if ('0' === code) {
            //                 Vue.prototype.$Notice.warning({
            //                     title: '错误',
            //                     desc: message,
            //                 });
            //             } else {
            //                 Vue.prototype.$Notice.warning({
            //                     title: '错误',
            //                     desc: message,
            //                 });
            //             }
            //         }
            //     }
            // }
        }
        return response;
    };

    private init(): void {
        // 错误处理
        this.client.interceptors.response.use(this.responseHandler, this.responseError);
        this.client.interceptors.request.use((request) => {
            request.headers.token = auth.getToken(); // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            request.headers.key = auth.getUserId();
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export default new HttpClient();
