export default class DownloadTool {
    /**
     * 获取 blob
     * @param url 目标文件地址
     * @param back
     * @param onProgress
     */
    public loadBlob(url: string,
                    back: (data: any) => void,
                    onProgress: (e: ProgressEvent) => void): void {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        // 设置请求头，请求头的设置必须在xhr打开之后，并且在send之前
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        if (typeof onProgress === 'function') {
            xhr.onprogress = (event) => {
                if (typeof onProgress === 'function') {
                    onProgress(event);
                }
            };
        }
        xhr.onload = () => {
            if (xhr.status === 200) {
                back(xhr.response);
            }
        };
        // xhr.onload = () => {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         back(xhr.response);
        //     }
        // };
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         if (typeof window.chrome !== 'undefined') {
        //             // Chrome version
        //             var link = document.createElement('a');
        //             link.href = window.URL.createObjectURL(xhr.response);
        //             link.download = filename;
        //             link.click();
        //         } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
        //             // IE version
        //             var blob = new Blob([xhr.response], {type: 'application/force-download'});
        //             window.navigator.msSaveBlob(blob, filename);
        //         } else {
        //             // Firefox version
        //             var file = new File([xhr.response], filename, {type: 'application/force-download'});
        //             window.open(URL.createObjectURL(file));
        //         }
        //         if (success) try {
        //             success.call(xhr);
        //         } catch (e) {
        //         }
        //     }
        // };

        xhr.send();
    }

    /**
     *
     * @param blob 保存
     * @param fileName 想要保存的文件名称
     */
    public saveAs(blob: Blob, fileName: string) {

        if (typeof window.navigator.msSaveBlob === 'function') {
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
     * @param url 目标文件地址
     * @param fileName 想要保存的文件名称
     * @param onProgress
     */
    public download(url: string,
                    fileName: string,
                    onProgress: (e: ProgressEvent) => void) {
        const own = this;
        own.loadBlob(url, (blob) => {
            own.saveAs(blob, fileName);
        }, onProgress);
    }
}
