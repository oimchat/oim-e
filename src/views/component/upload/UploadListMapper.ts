import UploadItemData from '@/views/component/upload/UploadItemData';
import ContentUploadFileService from '@/app/com/main/module/support/file/service/ContentUploadFileService';
import app from '@/app/App';
import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';

export default class UploadListMapper {

    public items: UploadItemData[] = [];

    public upload(file: File, back: (data: any, file: File) => void): void {
        const own = this;
        const item = new UploadItemData();
        const uploadFileService: ContentUploadFileService = app.appContext.getMaterial(ContentUploadFileService);

        item.file = file;
        item.name = file.name;
        item.size = file.size;
        own.addItem(item);
        uploadFileService.uploadFile(file, (success, uploadResult, message) => {
            if (uploadResult && uploadResult.result && uploadResult.result.body) {
                const data = uploadResult.result;
                if (typeof back === 'function') {
                    back(data, file);
                }
            }
            own.deleteItem(item);
        }, (percent) => {
            item.progress = ByteSizeUtil.toPercentageIntegerRate(percent);
        });
    }

    private addItem(item: UploadItemData) {
        const items = this.items;
        items.push(item);
    }

    private deleteItem(item: UploadItemData) {
        const items = this.items;
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
    }
}
