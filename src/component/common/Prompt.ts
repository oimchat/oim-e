import Vue from 'vue';

export default class Prompt {

    public static message(info: any, successText: string, warningText: string) {
        let message = '';
        if (info) {
            if (info.success) {
                message = Prompt.getDefaultPromptText(info);
                if (!message || '' === message) {
                    message = successText;
                }
                Vue.prototype.$Notice.success({
                    title: '成功',
                    desc: message,
                });
            } else {
                message = Prompt.getDefaultErrorText(info);
                if (!message || '' === message) {
                    message = warningText;
                }
                Vue.prototype.$Notice.warning({
                    title: '警告',
                    desc: message,
                });
            }
        } else {
            Vue.prototype.$Notice.error({
                title: '错误',
                desc: warningText,
            });
        }
    }

    public static notice(message: string, title?: string, type?: string) {
        type = type ? type : 'info';

        if ('info' === type) {
            Vue.prototype.$Notice.info({
                title: title || '信息',
                desc: message,
            });
        }
        if ('success' === type) {
            Vue.prototype.$Notice.success({
                title: title || '成功',
                desc: message,
            });
        }
        if ('warn' === type) {

            Vue.prototype.$Notice.warning({
                title: title || '警告',
                desc: message,
            });
        }
        if ('error' === type) {
            Vue.prototype.$Notice.error({
                title: title || '错误',
                desc: message,
            });
        }
    }

    public static getDefaultErrorText(info: any) {
        let text = '';
        if (info) {
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

    public static getDefaultPromptText(info: any) {
        let text = '';
        if (info) {
            const prompts = info.prompts;
            if (prompts && prompts.length > 0) {
                for (const prompt of prompts) {
                    text = text + prompt.text + '\n';
                }
            }
        }
        return text;
    }
}
