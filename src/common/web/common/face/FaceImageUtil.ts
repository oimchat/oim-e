import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

export default class FaceImageUtil {
    public static createFaceImageHtml(face: FaceItem): string {
        const html = '<img src="' + face.path + '" value="' + face.categoryId + ',' + face.key + '" name="face" />';
        return html;
    }
}