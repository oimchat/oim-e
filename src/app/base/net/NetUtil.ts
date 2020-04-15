class NetUtil {
    public static isEmpty(value: any): boolean {
        let empty = false;
        if (value instanceof Array) {
            empty = value.length <= 0;
        } else {
            empty = NetUtil.trim(value) === '' || value === undefined || value === null || value === 'undefined' || value === 'null' || value === '&nbsp;';
        }
        return empty;
    }

    public static trim(text: string): string {
        const exp = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text === null ? '' : (text + '').replace(exp, '');
    }

    /**
     * 对象转成json字符串
     * @param {type} value
     * @returns {String}
     */
    public static objectToJson(value: object): string {
        if (NetUtil.isEmpty(value)) {
            return '';
        }
        const json = JSON.stringify(value);
        return json;
    }

    /**
     * 将json字符串转成json对象
     * @param {type} json
     * @returns {undefined|Function}
     */
    public static jsonToObject<T>(json: string): T {
        let value;
        if (!NetUtil.isEmpty(json)) {
            try {
                value = (new Function('return ' + json))();
            } catch (e) {
                // do something
            }
        }
        return value;
    }
}

export default NetUtil;
