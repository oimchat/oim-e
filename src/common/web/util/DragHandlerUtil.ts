export default class DragHandlerUtil {

    public static handle(
        e: Event,
        htmlBack: (html: string) => void,
        imageBack: (file: File) => void,
        fileBack: (files: File[]) => void): void {
        if (e instanceof DragEvent) {
            const dragEvent: DragEvent = e as DragEvent;
            // Prevent the default pasting event and stop bubbling
            e.preventDefault();
            e.stopPropagation();

            const dataTransfer: DataTransfer | null = dragEvent.dataTransfer;
            if (dataTransfer) {
                const items = dataTransfer.files;
                const length = items.length;
                if (length === 1) {
                    const file = items[0];
                    if (file) {
                        if (file.type.match(/^image\//i)) {
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
                } else {
                    if (typeof fileBack === 'function') {
                        const files: File[] = [];
                        for (let i = 0; i < length; i++) {
                            const file = items[i];
                            if (file) {
                                files.push(file);
                            }
                        }
                        if (files.length > 0) {
                            fileBack(files);
                        }
                    }
                }
            }
        }
    }
}
