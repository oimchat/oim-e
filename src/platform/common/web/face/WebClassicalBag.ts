import AbstractClassicalBag from '@/common/element/face/bag/AbstractClassicalBag';

export default class WebClassicalBag extends AbstractClassicalBag {

    public getBasePath(): string {
        return 'assets/general/common/images/common/face/classical/gif/';
    }

    public getExtension(key: string): string {
        return '.gif';
    }

    public has(key: string): boolean {
        return true;
    }
}
