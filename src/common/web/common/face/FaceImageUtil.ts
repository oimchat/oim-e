import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

export default class FaceImageUtil {

    public static createFaceImageHtml(face: FaceItem): string {
        const value = face.categoryId + ',' + face.key;
        let style = '';
        if (face.width && face.height) {
            style = 'width:' + face.width + 'px;' + 'height:' + face.height + ';';
        }
        const html = '<img' +
            ' src="' + face.path + '"' +
            ' title="' + face.text + '"' +
            ' value="' + value + '"' +
            ' path="' + face.path + '"' +
            ' name="face"' +
            ' style="' + style + '"' +
            ' alt="' + face.text + '"/>';
        return html;
    }
}
