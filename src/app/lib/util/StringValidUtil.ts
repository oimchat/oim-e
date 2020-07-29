
export default class StringValidUtil {

    /**
     * 是否包含特殊字符
     * @param value
     */
    public static hasSpecialCharacter(value: string): boolean {
        return /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/.test(value);
    }

    /**
     * 是否包含下划线
     * @param value
     */
    public static hasUnderline(value: string): boolean {
        return /(^_)|(__)|(_+$)/.test(value);
    }

    public static isNumber(value: string): boolean {
        return /^\d+\d+\d$/.test(value);
    }
}
