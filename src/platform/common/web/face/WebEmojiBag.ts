import emojiImageBox from '@/app/lib/EmojiImageBox';
import AbstractEmojiBag from '@/common/element/face/bag/AbstractEmojiBag';
import EmojiUtil from '@/app/lib/emoji/EmojiUtil';
import webEmojiImageBox from '@/platform/common/web/face/WebEmojiImageBox';

export default class WebEmojiBag extends AbstractEmojiBag {

    public createPath(key: string, extension: string, basePath: string): string {
        // const p = emojiImageBox.getPictureByKey(key);
        const code = EmojiUtil.getUnicode(key, '-');
        const picture = code + '.png';
        const path = basePath + picture;
        return path;
    }

    public getBasePath(): string {
        return 'assets/general/common/images/common/face/emoji/72x72/';
    }

    public getExtension(key: string): string {
        return '';
    }

    public has(key: string): boolean {
        const code = EmojiUtil.getUnicode(key, '-');
        const picture = code + '.png';
        const has = webEmojiImageBox.has(picture);
        if (!has) {
            // console.log(picture + '/' + key);
        }
        return has;
    }
}
