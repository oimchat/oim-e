import WriteExtend from '@/views/common/chat/extend/WriteExtend';
import WriteMapper from '@/views/common/chat/WriteMapper';
import WindowsScreenShotInvoke from '@/platform/e/os/windows/screenshot/WindowsScreenShotInvoke';
import ImageToFileUtil from '@/common/web/util/ImageToFileUtil';

export class WindowsScreenshotExtend implements WriteExtend {
    public invoke(writeMapper: WriteMapper): void {
        WindowsScreenShotInvoke.shot((file) => {
            ImageToFileUtil.imageFile2Base64(file, (base64) => {
                const html = '<img style="max-width: 60%" src="' + base64 + '"  />';
                writeMapper.insertHtmlAtCursor(html);
            });
        });
    }
}
