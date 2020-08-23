import BaseUtil from '@/app/lib/util/BaseUtil';
import TextValueJudgeUtil from '@/common/web/util/TextValueJudgeUtil';

export default class PasteHandlerUtil {

    public static handle(
        e: Event,
        htmlBack: (html: string) => void,
        imageBack: (file: File) => void,
        fileBack: (files: File[]) => void): void {
        if (e instanceof ClipboardEvent) {
            const ce: ClipboardEvent = e as ClipboardEvent;
            // Prevent the default pasting event and stop bubbling
            e.preventDefault();
            e.stopPropagation();

            // Get the clipboard data
            let html = '';
            let text = '';
            const clipboardData = ((window as any).clipboardData || e.clipboardData);
            if (clipboardData) {
                html = (clipboardData).getData('text/html');
                text = (clipboardData).getData('text/plain');

                const items = clipboardData.items;

                const length = items.length;
                const hasText = (BaseUtil.isNotEmpty(html)) && (BaseUtil.isNotEmpty(text));
                if (length === 1 && !hasText) {
                    const item = items[0];
                    if (item.kind === 'file') {
                        const file = item.getAsFile();
                        if (file) {
                            if (item.type.match(/^image\//i)) {
                                if (typeof imageBack === 'function') {
                                    imageBack(file);
                                }
                            } else {
                                // 文件上传
                                if (typeof fileBack === 'function') {
                                    const files: File[] = [];
                                    files.push(file);
                                    fileBack(files);
                                }
                            }
                        }
                        return;
                    }
                } else {
                    if (typeof fileBack === 'function') {
                        const files: File[] = [];
                        for (let i = 0; i < length; i++) {
                            const item = items[i];
                            if (item.kind === 'file') {
                                const file = item.getAsFile();
                                if (file) {
                                    files.push(file);
                                }
                            }
                        }
                        if (files.length > 0) {
                            fileBack(files);
                        }
                    }
                }
            }
            const isOfficeDoc = TextValueJudgeUtil.isisOffice(html);

            let useHtml = BaseUtil.isNotEmpty(html);
            if (useHtml) {
                if (isOfficeDoc) {
                    useHtml = false;
                }
            }
            if (useHtml) {
                // .replace(/<br([^<>]+|\s?)>/ig,‘||||‘);//替换br标签
                html = html.replace(/(<bR\/>|<bR>|<Br\/>|<Br>|<br\/>|<br>|<BR>|<BR\/>)/g, '\n');
                html = html.replace(/<(?!(img|IMG))[^>]*>/ig, '');
                html = BaseUtil.trim(html);
            } else {
                html = text;
            }
            if (html !== '') {
                if (typeof htmlBack === 'function') {
                    htmlBack(html);
                }
            }
        }
    }
}
