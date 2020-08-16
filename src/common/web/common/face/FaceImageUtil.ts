import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

export default class FaceImageUtil {

    public static createFaceImageHtml(face: FaceItem): string {
        const value = face.categoryId + ',' + face.key;
        const html = '<img src="' + face.path +
            '" title="' + face.text +
            '" value="' + value +
            '" path="' + face.path +
            '" name="face"  alt="' + face.text + '"/>';
        return html;
    }
}
