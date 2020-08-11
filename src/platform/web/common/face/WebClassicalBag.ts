import AbstractClassicalBag from '@/common/element/face/bag/AbstractClassicalBag';

export default class WebClassicalBag extends AbstractClassicalBag {

    public getBasePath(categoryId: string): string {
        return 'assets/images/common/face/classical/gif/';
    }

    public getExtension(categoryId: string, key: string): string {
        return '.gif';
    }
}
