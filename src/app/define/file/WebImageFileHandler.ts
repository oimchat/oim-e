import Item from '@/app/com/data/chat/content/Item';
import AbstractMaterial from '@/app/base/AbstractMaterial';

abstract class WebImageFileHandler extends AbstractMaterial {

    public abstract getFileMapByItems(items: Item[]): Map<string, File>;
}

export default WebImageFileHandler;
