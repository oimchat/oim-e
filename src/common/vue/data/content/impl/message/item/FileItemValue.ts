import FileValue from '@/app/com/common/chat/item/FileValue';

export default class FileItemValue extends FileValue {

    public static operation_upload: number = 0;
    public static operation_download: number = 1;

    public operation: number = 0;
    public rateShow: boolean = false;
    public rate: number = 1;
}
