import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';
import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';
import FaceBag from '@/app/com/main/module/support/face/base/FaceBag';
import FaceCategory from '@/app/com/main/module/support/face/data/FaceCategory';

export default class FaceBox extends AbstractMaterial {

    private map: Map<string, Map<string, FaceItem>> = new Map<string, Map<string, FaceItem>>();
    private categoryMap: Map<string, FaceCategory> = new Map<string, FaceCategory>();


    constructor(protected appContext: AppContext) {
        super(appContext);
    }


    public addBag(bag: FaceBag): void {
        if (bag) {
            const faceCategory: FaceCategory = bag.getFaceCategory();
            if (faceCategory) {
                this.addFaceCategory(faceCategory);
            }
        }
    }

    public addFaceCategory(category: FaceCategory): void {
        if (category) {
            const categoryMap = this.categoryMap;
            const id = category.id;
            const list: FaceItem[] = category.faces;
            if (list) {
                categoryMap.set(id, category);
                const map = this.getOrCreateMap(id);
                for (const f of list) {
                    map.set(f.key, f);
                }
            }
        }
    }

    public getFaceCategory(categoryId: string): FaceCategory {
        const categoryMap = this.categoryMap;
        const c: any = categoryMap.get(categoryId);
        return c;
    }

    public getFaceCategories(): FaceCategory[] {
        const list: FaceCategory[] = [];
        const categoryMap = this.categoryMap;
        for (const c of categoryMap.values()) {
            list.push(c);
        }
        return list;
    }

    public getFaces(categoryId: string): FaceItem[] {
        const map = this.map.get(categoryId);
        const list: FaceItem[] = [];
        if (map) {
            const allList = map.values();
            for (const ud of allList) {
                list.push(ud);
            }
        }
        return list;
    }

    public getFace(categoryId: string, key: string): FaceItem {
        const map = this.map.get(categoryId);
        let face: any;
        if (map) {
            face = map.get(key);
        }
        return face;
    }

    /*****************/

    public put(face: string) {
        if (face) {
            const array = face.split(',');
            if (array && array.length > 1) {
                const categoryId = array[0];
                const key = array[1];
                const text = (array.length > 2) ? array[2] : '';
                const faceValue: FaceItem = new FaceItem();
                faceValue.categoryId = categoryId;
                faceValue.key = key;
                faceValue.text = text;
                this.add(faceValue);
            }
        }
    }


    public add(faceValue: FaceItem) {
        const categoryId = faceValue.categoryId;
        const key = faceValue.key;
        const map = this.getOrCreateMap(categoryId);
        map.set(key, faceValue);
    }

    public getMap(categoryId: string): Map<string, FaceItem> {
        const map: any = this.map.get(categoryId);
        return map;
    }

    public getList(categoryId: string): FaceItem[] {
        const map = this.map.get(categoryId);
        const list: FaceItem[] = [];
        if (map) {
            const allList = map.values();
            for (const ud of allList) {
                list.push(ud);
            }
        }
        return list;
    }

    private getOrCreateMap(categoryId: string): Map<string, FaceItem> {
        let map = this.map.get(categoryId);
        if (!map) {
            map = new Map<string, FaceItem>();
            this.map.set(categoryId, map);
        }
        return map;
    }
}
