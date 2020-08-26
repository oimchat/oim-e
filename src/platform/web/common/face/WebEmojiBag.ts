import emojiImageBox from '@/app/lib/EmojiImageBox';
import AbstractEmojiBag from '@/common/element/face/bag/AbstractEmojiBag';
import EmojiUtil from '@/app/lib/emoji/EmojiUtil';

export default class WebEmojiBag extends AbstractEmojiBag {

    public createPath(key: string, extension: string, basePath: string): string {
        // const p = emojiImageBox.getPictureByKey(key);
        const code = EmojiUtil.getUnicode(key, '-');
        const picture = code + '.png';
        const path = basePath + picture;
        return path;
    }

    public getBasePath(categoryId: string): string {
        return 'assets/images/common/face/emoji/72x72/';
    }

    public getExtension(categoryId: string, key: string): string {
        return '';
    }
}
