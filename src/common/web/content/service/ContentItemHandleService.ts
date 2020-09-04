import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import Content from '@/app/com/common/chat/Content';
import FaceBox from '@/app/com/main/module/support/face/box/FaceBox';
import FaceValue from '@/app/com/common/chat/item/FaceValue';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Item from '@/app/com/common/chat/Item';
import FaceImageUtil from '@/common/web/common/face/FaceImageUtil';
import TextJudgeUtil from '@/app/lib/util/TextJudgeUtil';
import WebStringHandleUtil from '@/common/web/util/WebStringHandleUtil';
import EmojiUtil from '@/app/lib/emoji/EmojiUtil';
import BaseContentItemUtil from '@/app/com/common/chat/util/BaseContentItemUtil';

export default class ContentItemHandleService extends AbstractMaterial {

    public convertContent(content: Content): Content {
        content = BaseContentItemUtil.convert(content);
        this.handleFaceItems(content);
        this.handleTextItems(content);
        return content;
    }

    public handleContent(content: Content): void {
        BaseContentItemUtil.handle(content);
        this.handleFaceItems(content);
        this.handleTextItems(content);
    }

    private handleFaceItems(content: Content) {
        const items = CoreContentUtil.getItemList(content, Item.TYPE_FACE);
        if (items) {
            const faceBox: FaceBox = this.appContext.getMaterial(FaceBox);
            for (const item of items) {
                const value = item.value;
                if (value instanceof FaceValue) {
                    const faceValue = value as FaceValue;
                    const face = faceBox.getFace(faceValue.categoryId, faceValue.key);
                    if (face) {
                        value.path = face.path;
                        value.width = face.width;
                        value.height = face.height;
                    }
                    // if (BaseUtil.isEmpty(faceValue.path)) {
                    // }
                }
            }
        }
    }

    private handleTextItems(content: Content) {
        const items = CoreContentUtil.getItemList(content, Item.TYPE_TEXT);
        if (items) {
            const faceBox: FaceBox = this.appContext.getMaterial(FaceBox);
            for (const item of items) {
                this.handleTextItem(item);
            }
        }
    }

    private handleTextItem(item: Item) {

        if (item && item.value && item.type === Item.TYPE_TEXT) {
            const faceBox: FaceBox = this.appContext.getMaterial(FaceBox);
            const value = item.value;
            let text = '';

            if (TextJudgeUtil.hasHtml(value)) {
                text = WebStringHandleUtil.htmlEncode(value);
            } else {
                text = value;
            }
            const array = EmojiUtil.match(text);

            if (array && array.length > 0) {
                const map: Map<string, string> = new Map<string, string>();
                for (const code of array) {
                    map.set(code, code);
                }
                for (const code of map.keys()) {
                    const face = faceBox.getFace('emoji', code);
                    if (face) {
                        const html = FaceImageUtil.createFaceImageHtml(face);
                        text = text.replace(code, html);
                    }
                }
            }
            item.data = text;
        }
    }
}
