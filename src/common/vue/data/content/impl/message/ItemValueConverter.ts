import FileItemValue from '@/common/vue/data/content/impl/message/item/FileItemValue';
import Item from '@/app/com/common/chat/Item';
import ImageItemValue from '@/common/vue/data/content/impl/message/item/ImageItemValue';
import AudioItemValue from '@/common/vue/data/content/impl/message/item/AudioItemValue';
import VideoItemValue from '@/common/vue/data/content/impl/message/item/VideoItemValue';
import BaseContentItemUtil from '@/app/com/common/chat/util/BaseContentItemUtil';
import ObjectUtil from '@/app/common/util/ObjectUtil';
import FileValue from '@/app/com/common/chat/item/FileValue';
import AudioValue from '@/app/com/common/chat/item/AudioValue';
import ImageValue from '@/app/com/common/chat/item/ImageValue';
import VideoValue from '@/app/com/common/chat/item/VideoValue';
import Content from '@/app/com/common/chat/Content';

type FileItemValueType<T extends FileItemValue> = new() => T;
type FileValueType<T extends FileValue> = new() => T;

class ItemValueConverter {


    private rateMap: Map<string, FileItemValueType<FileItemValue>> = new Map<string, FileItemValueType<FileItemValue>>();
    private baseMap: Map<string, FileValueType<FileValue>> = new Map<string, FileValueType<FileValue>>();

    public constructor() {
        this.initialize();
    }

    public convertToRate(content: Content) {
        if (null != content) {
            const sections = content.sections;
            if (null != sections) {
                for (const s of sections) {
                    const items = s.items;
                    if (items) {
                        for (const item of items) {
                            item.value = this.convertToRateValue(Item.TYPE_TEXT, item.value);
                        }
                    }
                }
            }
        }
    }

    public convertToRateValue(type: string, v: any): any {
        let value: any;
        const clazz = this.rateMap.get(type);
        v = BaseContentItemUtil.convertItemValue(type, v);
        if (clazz) {
            value = ObjectUtil.convert(clazz, v);
        } else {
            value = v;
        }
        return value;
    }

    public convertToBaseValue(type: string, v: any): any {
        let value: any;
        const clazz = this.baseMap.get(type);
        v = BaseContentItemUtil.convertItemValue(type, v);
        if (clazz) {
            value = ObjectUtil.convert(clazz, v);
        } else {
            value = v;
        }
        return value;
    }

    private initialize() {
        this.rateMap.set(Item.TYPE_FILE, FileItemValue);
        this.rateMap.set(Item.TYPE_IMAGE, ImageItemValue);
        this.rateMap.set(Item.TYPE_AUDIO, AudioItemValue);
        this.rateMap.set(Item.TYPE_VIDEO, VideoItemValue);

        // base
        this.baseMap.set(Item.TYPE_FILE, FileValue);
        this.baseMap.set(Item.TYPE_IMAGE, ImageValue);
        this.baseMap.set(Item.TYPE_AUDIO, AudioValue);
        this.baseMap.set(Item.TYPE_VIDEO, VideoValue);
    }
}
