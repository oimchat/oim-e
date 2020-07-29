import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseInitializer from '@/app/com/main/initialize/BaseInitializer';

export default abstract class AbstractInitializerBox extends AbstractMaterial {

    private map: Map<any, BaseInitializer> = new Map<any, BaseInitializer>();

    public put(data: BaseInitializer): void {
        this.map.set(data, data);
    }

    public initialize() {
        const values: IterableIterator<BaseInitializer> = this.map.values();

        const array: BaseInitializer[] = [];
        for (const data of values) {
            array.push(data);
        }

        array.sort((a, b) => {
            let order1 = a.getOrder();
            let order2 = a.getOrder();
            if (!order1) {
                order1 = 0;
            }
            if (!order2) {
                order2 = 0;
            }
            return order1 - order2;
        });

        for (const v of array) {
            v.initialize();
        }
    }
}
