import ItemData from '@/views/common/list/ItemData';

export default class ItemBox {

    // @ts-ignore
    private property: ItemData = null;

    public select(property: ItemData): void {
        if (this.property) {
            this.property.active = false;
        }
        this.property = property;
        if (property) {
            property.active = true;
        }
    }
}
