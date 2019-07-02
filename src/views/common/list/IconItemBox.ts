import IconItemData from '@/views/common/list/IconItemData';

export default class IconItemBox {

    // @ts-ignore
    private property: IconItemData = null;

    public select(property: IconItemData): void {
        if (this.property) {
            this.property.active = false;
        }
        this.property = property;
        if (property) {
            property.active = true;
        }
    }
}
