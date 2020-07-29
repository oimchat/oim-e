import BaseUtil from '@/app/lib/util/BaseUtil';
import TextJudgeUtil from '@/app/lib/util/TextJudgeUtil';

export default class TextValueJudgeUtil {

    public static isisOffice(text: string): boolean {
        let isOfficeDoc = false;
        if (BaseUtil.isNotEmpty(text)) {
            const document: Document = new DOMParser().parseFromString(text, 'text/html');
            const es = document.getElementsByTagName('html');
            if (es) {
                // const elementLength = es.length;
                for (const node of es) {
                    if (node) {
                        const attributeMap = node.attributes;
                        const mapLength = attributeMap.length;
                        let isWord = false;
                        let isExcel = false;
                        let isOffice = false;

                        for (let j = 0; j < mapLength; j++) {
                            const attributeItem = attributeMap.item(j);
                            if (attributeItem && attributeItem.value) {
                                const attributeValue = attributeItem.value;
                                const hasWord = attributeValue.match(/:word/i);
                                const hasExcel = attributeValue.match(/:excel/i);
                                const hasOffice = attributeValue.match(/:office/i);

                                if (hasWord) {
                                    isWord = true;
                                }
                                if (hasExcel) {
                                    isExcel = true;
                                }
                                if (hasOffice) {
                                    isOffice = true;
                                }
                            }
                        }

                        isOfficeDoc = isWord || isExcel || isOffice;
                    }
                }
                // for (let j = 0; j < elementLength; j++) {
                //     const item = es[j];
                //     if (item) {
                //         item.attributes;
                //     }
                // }
            }
        }
        return TextJudgeUtil.isWord(text) || isOfficeDoc;
    }
}
