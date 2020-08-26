export default class Item {

    public static TYPE_TEXT: string = 'text';
    public static TYPE_CODE: string = 'code';
    public static TYPE_HTML: string = 'html';

    public static TYPE_FILE: string = 'file';
    public static TYPE_IMAGE: string = 'image';
    public static TYPE_AUDIO: string = 'audio';
    public static TYPE_VIDEO: string = 'video';

    public static TYPE_FACE: string = 'face';
    public static TYPE_URL: string = 'url';
    public static TYPE_POSITION: string = 'position';
    public static TYPE_AT: string = 'at';

    public type: string = Item.TYPE_TEXT;
    public value: any = '';
    public data: any;

    public constructor() {
        Object.defineProperty(Item, 'data', {enumerable: false});
    }
}
