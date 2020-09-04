import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import Content from '@/app/com/common/chat/Content';
import FaceBox from '@/app/com/main/module/support/face/box/FaceBox';
import FaceValue from '@/app/com/common/chat/item/FaceValue';
import Item from '@/app/com/common/chat/Item';
import BaseContentItemUtil from '@/app/com/common/chat/util/BaseContentItemUtil';

export default class ContentSendBeforeHandleService extends AbstractMaterial {

    public convertContent(content: Content): Content {
        content = BaseContentItemUtil.convert(content);
        this.handleAllItems(content);
        this.handleFaceItems(content);
        return content;
    }

    private handleAllItems(content: Content) {
        const items = CoreContentUtil.getItemList(content, '');
        if (items) {
            for (const item of items) {
                // no
                for (const item of items) {
                    item.data = null;
                }
            }
        }
    }

    private handleFaceItems(content: Content) {
        const items = CoreContentUtil.getItemList(content, Item.TYPE_FACE);
        if (items) {
            const faceBox: FaceBox = this.appContext.getMaterial(FaceBox);
            for (const item of items) {
                const value = item.value;
                if (value instanceof FaceValue) {
                    const faceValue = value as FaceValue;
                    if (!this.isUrl(faceValue.path)) {
                        faceValue.path = '';
                    }
                }
            }
        }
    }

    private isUrl(path: string): boolean {
        let isNetFace = false;
        if (path) {
            const u = path.toString().toLowerCase();
            isNetFace = ((u.startsWith('http://') || u.startsWith('https://')));
        }
        return isNetFace;
    }
}
