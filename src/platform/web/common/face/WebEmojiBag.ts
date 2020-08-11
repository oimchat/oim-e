import emojiImageBox from '@/app/lib/EmojiImageBox';
import AbstractEmojiBag from '@/common/element/face/bag/AbstractEmojiBag';

export default class WebEmojiBag extends AbstractEmojiBag {

    public createPath(key: string, extension: string, basePath: string): string {
        const p = emojiImageBox.getPictureByKey(key);
        const path = basePath + p;
        return path;
    }

    public getBasePath(categoryId: string): string {
        return 'assets/images/common/face/emoji/';
    }

    public getExtension(categoryId: string, key: string): string {
        return '';
    }
}
