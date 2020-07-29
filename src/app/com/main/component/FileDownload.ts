import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class FileDownload extends AbstractMaterial {

    public download(url: string): void {
        // window.open(url);
        // const element = document.createElement('div');
        // element.innerHTML = '<form method=\'post\' action="' + url + '"></form>';
        // for (const n of element.childNodes) {
        //     if (n.nodeName.toLocaleLowerCase() === 'form') {
        //         (n as any).submit();
        //     }
        // }
    }
}
