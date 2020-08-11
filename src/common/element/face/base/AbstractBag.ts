import BaseBag from '@/app/com/main/module/support/face/base/BaseBag';
import FaceCategory from '@/app/com/main/module/support/face/data/FaceCategory';
import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

export default abstract class AbstractBag implements BaseBag {

    private faceCategory: FaceCategory = new FaceCategory();

    public constructor() {
        this.initialize(this.faceCategory);
        this.setPath(this.faceCategory);
    }

    public getFaceCategory(): FaceCategory {
        return this.faceCategory;
    }

    private setPath(faceCategory: FaceCategory): void {
        if (faceCategory) {
            const categoryId = faceCategory.id;
            const basePath = this.getBasePath(categoryId);

            const faces: FaceItem[] = faceCategory.faces;
            if (faces) {
                for (const f of faces) {
                    const key = f.key;
                    const extension = this.getExtension(categoryId, f.key);
                    if (!f.path) {
                        const path = this.createPath(key, extension, basePath);
                        f.path = path;
                    }
                }
            }
        }
    }

    public createPath(key: string, extension: string, basePath: string): string {
        const path = basePath + key + extension;
        return path;
    }

    public abstract getBasePath(categoryId: string): string;

    public abstract getExtension(categoryId: string, key: string): string;

    public abstract initialize(faceCategory: FaceCategory): void;
}
