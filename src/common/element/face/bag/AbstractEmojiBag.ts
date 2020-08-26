import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

import FaceCategory from '@/app/com/main/module/support/face/data/FaceCategory';
import AbstractBag from '../base/AbstractBag';
import emojiImageBox from '@/app/lib/EmojiImageBox';
import emojiInfoBox from '@/app/lib/emoji/EmojiInfoBox';
import EmojiUtil from '@/app/lib/emoji/EmojiUtil';

export default abstract class AbstractEmojiBag extends AbstractBag {

    public put(face: { code: string, key: string, picture: string },
                     text: string,
                     visible: boolean) {
        if (face) {
            const faceCategory = this.getFaceCategory();
            const categoryId = faceCategory.id;
            const key = face.key;
            // const text = face.key;
            if (this.has(key)) {
                const faceValue: FaceItem = new FaceItem();
                faceValue.categoryId = categoryId;
                faceValue.key = key;
                faceValue.text = text;
                faceValue.visible = visible;
                faceValue.width = 24;
                faceValue.height = 24;
                faceCategory.faces.push(faceValue);
            }
        }
    }

    public initialize(faceCategory: FaceCategory): void {
        faceCategory.name = '字符表情';
        faceCategory.id = 'emoji';

        const array = emojiInfoBox.getList();
        for (const d of array) {
            const key = d.key;
            const text = d.text;
            const code = EmojiUtil.getUnicode(key, '-');
            const picture = code + '.png';
            const face = {code, key, picture};
            // const v = emojiImageBox.getByKey(key);
            if (face) {
                this.put(face, text, true);
            }
        }
        // const list: Array<{ code: string, key: string, picture: string }> = emojiImageBox.getList();
        // if (list) {
        //     for (const v of list) {
        //         this.put(v, v.key, true);
        //     }
        // }
    }
}
