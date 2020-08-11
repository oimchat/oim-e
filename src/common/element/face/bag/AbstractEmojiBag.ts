import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

import FaceCategory from '@/app/com/main/module/support/face/data/FaceCategory';
import AbstractBag from '../base/AbstractBag';
import emojiImageBox from '@/app/lib/EmojiImageBox';

export default abstract class AbstractEmojiBag extends AbstractBag {

    public put(face: { code: string, key: string, picture: string }, visible: boolean) {
        if (face) {
            const faceCategory = this.getFaceCategory();
            const categoryId = faceCategory.id;
            const key = face.key;
            const text = face.key;
            const faceValue: FaceItem = new FaceItem();
            faceValue.categoryId = categoryId;
            faceValue.key = key;
            faceValue.text = text;
            faceValue.visible = visible;
            faceCategory.faces.push(faceValue);
        }
    }

    public initialize(faceCategory: FaceCategory): void {
        faceCategory.name = '字符表情';
        faceCategory.id = 'emoji';

        const list: Array<{ code: string, key: string, picture: string }> = emojiImageBox.getList();
        if (list) {
            for (const v of list) {
                this.put(v, true);
            }
        }
    }
}
