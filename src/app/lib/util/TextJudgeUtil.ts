export default class TextJudgeUtil {

    public static isWord(text: string): boolean {
        const r = /<\w[^>]*(( class="?MsoNormal"?)|(="mso-))/gi;
        return r.test(text);
    }

    public static hasHtml(text: string): boolean {
        const reg = /<[^>]+>/g;
        return reg.test(text);
    }
}



