import axios from 'axios';
import Vue from 'vue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import auth from '@/app/common/auth/Auth';
import Message from '@/app/base/message/Message';
import ServerHead from '@/app/base/message/server/ServerHead';
import AppSetting from '@/app/base/config/AppSetting';
import LogHandler from '@/app/base/log/LogHandler';

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
                            const error = this.getDefaultErrorText(info);
                            Vue.prototype.$Notice.warning({
                                title: '错误',
                                desc: error,
                            });
                        }
                    }
                }
            }
        }).catch((error: any) => {
            const serverHead: ServerHead = ServerHead.buildResult('0', '请求失败！');
            const message: Message<ServerHead> = new Message<ServerHead>();
            message.head = serverHead;
            if (typeof (back) === 'function') {
                back(message);
            }
        });
    }


    public getDefaultErrorText(info: any): string {
        let text = '';
        if (!BaseUtil.isEmpty(info)) {
            const warnings = info.warnings;
            const errors = info.errors;
            if (warnings && warnings.length > 0) {
                for (const warning of warnings) {
                    text = text + warning.text + '\n';
                }
            } else if (errors && errors.length > 0) {
                for (const error of errors) {
                    text = text + error.text + '\n';
                }
            }
        }
        return text;
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
            Vue.prototype.$Notice.error({
                title: '错误',
                desc: message,
            });
        } else {
            let message = error.message;
            if (message === 'Network Error') {
                message = '网络连接超时请稍后重试！';
            } else {
                message = '网络连接超时请稍后重试！';
            }
            // 请求超时处理
            Vue.prototype.$Notice.error({
                title: '错误',
                desc: message,
            });
        }
        return Promise.reject(error);
    }

    private responseHandler = (response: any) => {
        const status = response.status;
        const headers = response.headers;
        if (200 === status) {
            const data = response.data;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (head && head.result) {
                    const result = head.result;
                    const code: string = result.code;
                    const message: string = result.message;
                    if ('1' !== code) {
                        if ('101' === code) {
                            // TODO
                        } else if ('0' === code) {
                            Vue.prototype.$Notice.warning({
                                title: '错误',
                                desc: message,
                            });
                        } else {
                            Vue.prototype.$Notice.warning({
                                title: '错误',
                                desc: message,
                            });
                        }
                    }
                }
            }
        }
        return response;
    }

    private init(): void {
        // 错误处理
        this.client.interceptors.response.use(this.responseHandler, this.responseError);
        this.client.interceptors.request.use((request) => {
            request.headers['X-Token'] = auth.getToken(); // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export default new HttpClient();
