export default class EmojiUtil {
    public static match(text: string): RegExpMatchArray | null {
        // const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        return (text) ?
            text.match(reg)
            : null;
    }

    public static isEmoji(text: string): boolean {
        for (let i = 0; i < text.length; i++) {
            const hs = text.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (text.length > 1) {
                    const ls = text.charCodeAt(i + 1);
                    const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (text.length > 1) {
                const ls = text.charCodeAt(i + 1);
                if (ls === 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs === 0xa9
                    || hs === 0xae
                    || hs === 0x303d
                    || hs === 0x3030
                    || hs === 0x2b55
                    || hs === 0x2b1c
                    || hs === 0x2b1b
                    || hs === 0x2b50) {
                    return true;
                }
            }
        }
        return false;
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
            } else {
                const code = emoji.codePointAt(0);
                if (code) {
                    text = code.toString(16);
                }
            }
        }
        return text;
    }
}
