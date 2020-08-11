import Content from '@/app/com/common/chat/Content';
import Item from '@/app/com/common/chat/Item';
import BaseUtil from '@/app/lib/util/BaseUtil';

export default class BaseContentItemUtil {

    public static handle(content: Content) {
        if (null != content) {
            const sections = content.sections;
            if (null != sections) {
                for (const s of sections) {
                    const items = s.items;
                    if (items) {
                        for (const item of items) {
                            if (Item.TYPE_TEXT !== item.type) {
                                item.value = BaseContentItemUtil.convertItemValue(item.value);
                            }
                        }
                    }
                }
            }
        }
    }

    public static convertItemValue(data: any): any {
        let value: any;
        if (data instanceof String) {
            value = BaseUtil.jsonToObject(data.toString());
        } else {
            value = data;
        }
        return value;
    }
}
