export default class DownloadTool {
    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @param back
     * @return {data}
     */
    public getBlob(url: string, back: (data: any) => void) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                back(xhr.response);
            }
        };
        xhr.send();
    }

    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} fileName 想要保存的文件名称
     */
    public saveAs(blob: Blob, fileName: string) {
        if (window.navigator.msSaveOrOpenBlob(blob)) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            const body = document.querySelector('body');

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            // fix Firefox
            link.style.display = 'none';
            if (body) {
                body.appendChild(link);
                link.click();
                body.removeChild(link);
            }


            window.URL.revokeObjectURL(link.href);
        }
    }

    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} fileName 想要保存的文件名称
     */
    public download(url: string, fileName: string) {
        const own = this;
        own.getBlob(url, (blob) => {
            own.saveAs(blob, fileName);
        });
    }
}
