export default class FileValue {

    // public static TYPE_LOCAL: string = '1';
    // public static TYPE_NET: string = '2';

    public type: string = ''; // 1:local upload 2:net
    public id: string = '';
    public name: string = '';
    public url: string = '';
    public size: number = 0;
    public extension: string = '';
}
