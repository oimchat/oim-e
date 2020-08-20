import PopupMapper from '@/views/common/popup/PopupMapper';
import DocumentUtil from '@/common/web/util/DocumentUtil';

export default class AtListMapper {
    public popupMapper: PopupMapper = new PopupMapper();

    public handleInput(evt: InputEvent, e: Element) {
        const data = DocumentUtil.getCursorLocation(e);
        const textValue = this.getTextValue(data.text);
        if (textValue) {
            console.log(textValue);
            // console.log(textValue);
            this.popupMapper.x = data.x;
            this.popupMapper.y = data.y - 120;
            this.popupMapper.show = true;
        } else {
            this.popupMapper.show = false;
        }
    }

    private getTextValue(text: string) {
        let value = '';
        const at = '@';
        if (text) {
            const length = text.length;
            const lastIndex = text.lastIndexOf(at);
            if (lastIndex > -1 && lastIndex < length) {
                value = text.substring(lastIndex, length);
            }
        }
        return value;
    }
}