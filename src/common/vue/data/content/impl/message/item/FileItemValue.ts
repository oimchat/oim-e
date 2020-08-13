import FileValue from '@/app/com/common/chat/item/FileValue';

export default class FileItemValue extends FileValue {

    public static operationUpload: number = 0;
    public static operationDownload: number = 1;

    public operation: number = 0;
    public done: boolean = false;
    public rate: number = 1;
}
