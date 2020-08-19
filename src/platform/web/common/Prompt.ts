import Vue from 'vue';
import {Notify} from 'quasar';
import InfoUtil from '@/app/base/message/util/InfoUtil';
import PromptType from '@/app/com/client/define/prompt/PromptType';

export default class Prompt {

    public static message(info: any, successText: string, warningText: string) {
        let message = '';
        if (info) {
            if (info.success) {
                message = InfoUtil.getDefaultPromptText(info);
                if (!message || '' === message) {
                    message = successText;
                }
                if (message) {
                    Prompt.success(message, '成功');
                }
            } else {
                message = InfoUtil.getDefaultErrorText(info);
                if (!message || '' === message) {
                    message = warningText;
                }
                if (message) {
                    Prompt.warning(message, '警告');
                }
            }
        } else {
            if (warningText) {
                Prompt.error(message, '错误');
            }
        }
    }

    public static notice(message: string, title?: string, type?: string) {
        Prompt.notify(message, title, type);


        // type = type ? type : 'info';
        // if ('info' === type) {
        //     Vue.prototype.$Notice.info({
        //         title: title || '信息',
        //         desc: message,
        //     });
        // }
        // if ('success' === type) {
        //     Vue.prototype.$Notice.success({
        //         title: title || '成功',
        //         desc: message,
        //     });
        // }
        // if ('warn' === type) {
        //     Vue.prototype.$Notice.warning({
        //         title: title || '警告',
        //         desc: message,
        //     });
        // }
        // if ('error' === type) {
        //     Vue.prototype.$Notice.error({
        //         title: title || '错误',
        //         desc: message,
        //     });
        // }
    }

    public static info(message: string, title?: string) {
        Prompt.notice(message, title, PromptType.info);
        // Vue.prototype.$Notice.info({
        //     title: title || '信息',
        //     desc: message,
        // });
    }

    public static success(message: string, title?: string) {
        Prompt.notice(message, title, PromptType.success);
        // Vue.prototype.$Notice.success({
        //     title: title || '成功',
        //     desc: message,
        // });
    }

    public static warning(message: string, title?: string) {
        Prompt.notice(message, title, PromptType.warn);
        // Vue.prototype.$Notice.warning({
        //     title: title || '警告',
        //     desc: message,
        // });
    }

    public static error(message: string, title?: string) {
        Prompt.notice(message, title, PromptType.error);
        // Vue.prototype.$Notice.error({
        //     title: title || '错误',
        //     desc: message,
        // });
    }


    public static notify(message: string, title?: string, type?: string) {
        type = type ? type : 'info';
        title = title || '信息';
        let icon = 'tag_faces';
        let color = 'info';
        if ('info' === type) {
            title = title || '信息';
            color = 'info';
            icon = 'fas fa-info-circle';
        }
        if ('success' === type) {
            title = title || '成功';
            color = 'teal';
            icon = 'tag_faces';
        }
        if ('warn' === type || 'warning' === type) {
            title = title || '警告';
            color = 'warning';
            icon = 'fas fa-exclamation-circle';
        }
        if ('error' === type) {
            title = title || '错误';
            color = 'red';
            icon = 'fas fa-exclamation-circle';
        }
        const head = '<h6>' + title + '</h6>';
        const m = '<div>' + message + '</div>';
        const data = head + m;
        Notify.create({
            color,
            textColor: 'white',
            icon,
            message: data,
            position: 'top-right',
            // avatar,
            multiLine: true,
            timeout: 5000,
            html: true,
            closeBtn: 'X',
        });
    }
}
