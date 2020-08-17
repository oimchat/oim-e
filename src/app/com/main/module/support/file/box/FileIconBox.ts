import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class FileIconBox extends AbstractMaterial {

    public iconPath: string = '';
    private map: Map<string, string> = new Map<string, string>();

    public putIcon(extension: string, path: string) {
        this.map.set(extension, path);
    }

    public getIcon(extension: string): string {
        let path: any;
        if (extension) {
            extension = extension.toLowerCase();
            path = this.map.get(extension);
            if (!path) {
                path = this.iconPath;
            }
        }
        return path;
    }
}
