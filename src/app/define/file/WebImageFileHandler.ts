import Item from '@/app/com/data/chat/content/Item';
import AbstractMaterial from '@/app/base/AbstractMaterial';

abstract class WebImageFileHandler extends AbstractMaterial {

    public abstract handleItems(items: Item[], back: (map: Map<string, File>) => void): void;
}

export default WebImageFileHandler;
