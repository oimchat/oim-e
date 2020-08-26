export default class EmojiUtil {
    public static match(text: string): RegExpMatchArray | null {
        return (text) ?
            text.match(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig)
            : null;
    }


    public static getUnicode(emoji: string, separate?: string) {
        let text: any;
        if (emoji) {
            const array = EmojiUtil.match(emoji);

            if (array && array.length > 0) {
                const l = array.length;
                if (l > 1) {
                    text = '';
                    for (let i = 0; i < l; i++) {
                        const code = array[i].codePointAt(0);
                        if (code) {
                            if (i > 0) {
                                text = text + separate;
                            }
                            text = text + code.toString(16);
                        }
                    }
                } else {
                    const code = emoji.codePointAt(0);
                    if (code) {
                        text = code.toString(16);
                    }
                }
            }
        }
        return text;
    }
}
