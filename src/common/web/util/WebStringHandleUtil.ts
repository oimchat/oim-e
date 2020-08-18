import BaseUtil from '@/app/lib/util/BaseUtil';

export default class WebStringHandleUtil {

    public static htmlEncode(text: string): string {
        let value = '';
        if (!BaseUtil.isEmpty(text)) {
            const divElement = document.createElement('div');
            (divElement.textContent != null) ? (divElement.textContent = text) : (divElement.innerText = text);
            value = divElement.innerHTML;

            // value = text.replace('&', '&amp;');
            // value = value.replace('\t', '&nbsp;&nbsp;'); // 替换跳格
            // value = value.replace('<', '&lt;');
            // value = value.replace('>', '&gt;');
            // value = value.replace(' ', '&nbsp;');
            // value = value.replace('\'', '&#39;');
            // value = value.replace('"', '&quot;');
            // value = value.replace('\n', '<br>');
        }
        return value;
    }
}
