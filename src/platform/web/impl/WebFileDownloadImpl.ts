import FileDownload from '@/app/define/file/FileDownload';
import FileProgressInfo from '@/app/com/client/module/file/FileProgressInfo';

export default class WebFileDownloadImpl extends FileDownload {

    public download(url: string,
                    fileName: string,
                    size: number,
                    fileDownloadingInfo: FileProgressInfo,
                    onProgress?: (total: number, loaded: number) => void,
                    onSpeed?: (size: number, millisecond: number) => void): void {
        const agent = (navigator.userAgent) ? navigator.userAgent : '';
        const lower = agent.toLowerCase();
        const isChrome = lower.indexOf('chrome') > -1;
        const isSafari = lower.indexOf('safari') > -1;


        // iOS devices do not support downloading. We have to inform user about this.
        if (/(iP)/g.test(navigator.userAgent)) {
            alert('Your device does not support files downloading. Please try again in desktop browser.');
            return;
        } else

            // If in Chrome or Safari - download via virtual link click
        if (isChrome || isSafari) {
            // Creating new link node.
            const link = document.createElement('a');
            link.href = url;

            if (link.download !== undefined) {
                // Set HTML5 download attribute. This will prevent file from opening if supported.
                link.download = fileName;
            }

            // Dispatching click event.
            if (document.createEvent) {
                const e = document.createEvent('MouseEvents');
                e.initEvent('click', true, true);
                link.dispatchEvent(e);
                return;
            }
        } else {
            // Force file download (whether supported by server).
            if (url.indexOf('?') === -1) {
                url += '?download';
            }

            window.open(url, '_self');
        }
        return;
    }
}
