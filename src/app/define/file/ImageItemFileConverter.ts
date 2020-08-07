import Item from '@/app/com/common/chat/Item';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

abstract class ImageItemFileConverter extends AbstractMaterial {

    public abstract handleItems(items: Item[], back: (map: Map<string, File>) => void): void;
}

export default ImageItemFileConverter;
