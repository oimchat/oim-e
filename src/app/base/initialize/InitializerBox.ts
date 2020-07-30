import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';

export default class InitializerBox {

    private map: Map<any, Initializer> = new Map<any, Initializer>();

    public put(data: Initializer): void {
        if (data) {
            this.map.set(data.getKey(), data);
        }
    }

    public initialize(appContext: AppContext) {
        const values: IterableIterator<Initializer> = this.map.values();

        const array: Initializer[] = [];
        for (const v of values) {
            array.push(v);
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
            v.initialize(appContext);
        }
    }

    public clear() {
        this.map.clear();
    }
}
