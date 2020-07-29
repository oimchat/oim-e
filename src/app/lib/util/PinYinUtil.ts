import pinyin from 'pinyin-tool';

export default class PinYinUtil {

    public static getAcronym(text: string): string {
        let te = '';
        const py = pinyin.chineseToPinyin(text);
        if (py) {
            const l = py.length;
            if (l > 0) {
                te = py.substring(0, 1);
                te = te.toUpperCase();
            }
        }
        return te;
    }

    public static getFirstText(text: string): string {
        let te = '#';
        const py = PinYinUtil.getAcronym(text);
        if (PinYinUtil.isLetter(py)) {
            te = py;
        }
        return te;
    }

    public static isLetter(text: string) {
        let mark = false;
        if (text) {
            mark = /^[a-zA-Z]+$/.test(text);
        }
        return mark;
    }
}
