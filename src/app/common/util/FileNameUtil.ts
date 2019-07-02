export default class FileNameUtil {
    /**
     * 获取文件名，去掉后缀名
     *
     * @param fullName
     * @return
     */
    public static getName(fullName: string) {
        if (!fullName) {
            return '';
        } else {
            const index = fullName.lastIndexOf('.');
            if (index !== -1) {
                return fullName.substring(0, index);
            }
        }
        return fullName;
    }

    /**
     * 获取文件后缀名
     *
     * @param fullName
     * @return
     */
    public static getSuffixName(fullName: string) {
        if (fullName) {
            const length = fullName.length;
            const index = fullName.lastIndexOf('.');
            const cutIndex = (index + 1);
            if (index !== -1) {
                if (cutIndex < length) {
                    fullName = fullName.substring(cutIndex, length);
                }
            }
        }
        return fullName;
    }
}
