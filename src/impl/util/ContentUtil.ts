import Content from '@/app/com/common/chat/Content';
import Section from '@/app/com/common/chat/Section';
import Item from '@/app/com/common/chat/Item';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ImageValue from '@/app/com/common/chat/item/ImageValue';
import FaceValue from '@/app/com/common/chat/item/FaceValue';
import emojiImageBox from '@/app/lib/EmojiImageBox';
import FileNameUtil from '@/app/common/util/FileNameUtil';
import FileSeverApi from '@/app/com/main/module/support/file/constant/FileSeverApi';
import TextJudgeUtil from '@/app/lib/util/TextJudgeUtil';

export default class ContentUtil {

    public static getContent(nodes: any): Content {
        let content: Content | any;
        if (nodes && nodes.length > 0) {
            content = new Content();
            let section: Section = new Section();
            content.sections.push(section);
            for (const e of nodes) {
                let nodeName = e.nodeName;
                nodeName = (nodeName) ? nodeName.toLowerCase() : '';
                if (nodeName === '#text') {
                    const value = e.nodeValue;
                    if ('\n' === value) {
                        section = new Section();
                        content.sections.push(section);
                    } else {
                        const item: Item = new Item();
                        item.type = Item.TYPE_TEXT;
                        item.value = (value) ? value : '';

                        section.items.push(item);
                    }
                }
                if ('br' === nodeName) {

                    section = new Section();
                    content.sections.push(section);

                }

                if (nodeName === 'img') {
                    const url = e.src;
                    const name = e.name;
                    const value = e.getAttribute('value'); // .value;

                    if ('face' === (name)) {
                        if (value) {
                            const array = value.split(',');
                            if (array.length > 1) {
                                const iv: FaceValue = new FaceValue();
                                iv.categoryId = array[0];
                                iv.key = array[1];

                                const item: Item = new Item();
                                item.type = Item.TYPE_FACE;
                                item.value = BaseUtil.objectToJson(iv);

                                section.items.push(item);
                            }
                        }
                    } else {
                        if (url) {
                            const iv: ImageValue = new ImageValue();
                            iv.url = (url) ? url : '';

                            const item: Item = new Item();
                            item.type = Item.TYPE_IMAGE;
                            item.value = BaseUtil.objectToJson(iv);

                            section.items.push(item);
                        }
                    }
                }

                if (nodeName === 'pre') {
                    const value = e.innerHTML;
                    const item: Item = new Item();
                    item.type = Item.TYPE_TEXT;
                    item.value = (value) ? value : '';

                    section.items.push(item);
                }

                if (nodeName === 'div') {
                    section = ContentUtil.getSection(e);
                    content.sections.push(section);
                }
            }
        }
        return content;
    }


    public static createChatContent(content: Content) {
        let text = '';
        if (content.sections) {
            const sections = content.sections;
            const sectionsLength = sections.length;
            for (let i = 0; i < sectionsLength; i++) {
                const section = sections[i];
                if (section.items) {
                    const items = section.items;
                    const itemsLength = items.length;
                    for (let j = 0; j < itemsLength; j++) {
                        const item = items[j];
                        const type = item.type;
                        const value = item.value;
                        text += ContentUtil.createChatSectionItem(type, value);
                    }
                }
                text = '<pre>' + text + '</pre>';
            }
        }
        return text;
    }

    public static createChatSectionItem(type: string, value: string) {

        const SEVER_URL = '';
        const FILE_SERVER_HTTP_URL = '';


        let text = '[不支持的消息,请升级到最新版本！]';

        if ('text' === type) {
            if (TextJudgeUtil.hasHtml(value)) {
                text = ContentUtil.htmlEncode(value);
            } else {
                text = value;
            }
            const array = text.match(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig);

            if (array && array.length > 0) {
                const map: Map<string, string> = new Map<string, string>();
                for (const code of array) {
                    map.set(code, code);
                }
                for (const code of map.keys()) {
                    const img = emojiImageBox.getPictureByKey(code);
                    if (img) {
                        const faceUrl = 'assets/images/common/face/emoji/' + img;
                        const tag = '<img src="' + faceUrl + '" value="emoji,' + code + '" name="face" >';
                        text = text.replace(code, tag);
                    }
                }
            }
            // text = '<pre>' + text + '</pre>';
        }

        if ('image' === type) {
            let httpUrl = '';
            if (!BaseUtil.isEmpty(value)) {
                const json = ContentUtil.isJson(value);
                if (json) {
                    const imageServer = FileSeverApi.IMAGE_DOWNLOAD;
                    const imageData: any = BaseUtil.jsonToObject(value);
                    const url = imageData.url;
                    const id = imageData.id;
                    if (BaseUtil.isEmpty(url)) {
                        httpUrl = FILE_SERVER_HTTP_URL + imageServer + id;
                    } else {
                        httpUrl = imageData.url;
                    }
                } else {
                    if (value.startsWith('http')) {
                        httpUrl = value;
                    } else {
                        const array = value.split(','); // b9b7c2b4-c611-481a-9e09-31ca06d1f026,jpg
                        if (array.length >= 2) {
                            const imageServer = FileSeverApi.IMAGE_DOWNLOAD;
                            const id = array[0];
                            httpUrl = FILE_SERVER_HTTP_URL + imageServer + id;
                        } else {
                            httpUrl = FILE_SERVER_HTTP_URL + '/' + value;
                        }
                    }
                }
            }
            // text = "<a rel=\"image_group\" href=\"javascript:void(0);\" ><img src=\"" + httpUrl + "\"></a>";
            text = '<a rel="image_group"  href=\"javascript:void(0);\"  ><img chat="chat_image" data-source="' + httpUrl + '" src="' + httpUrl + '"></a>';
        }

        if ('face' === type) {
            let categoryId;
            let key;
            const json = ContentUtil.isJson(value);
            if (json) {
                const faceData: any = BaseUtil.jsonToObject(value);
                categoryId = faceData.categoryId;
                key = faceData.key;
            } else {
                const faceArray = value.split(',');
                if (faceArray.length > 1) {
                    categoryId = faceArray[0];
                    key = faceArray[1];
                }
            }
            let faceImage = 'unknown.png';
            if (!BaseUtil.isEmpty(categoryId) && !BaseUtil.isEmpty(key)) {
                let p = '';
                let path = '';

                if ('emotion' === categoryId) {
                    p = '.png';
                    path = 'emotion';
                    faceImage = path + '/' + key + p;
                } else if ('classical' === categoryId) {
                    p = '.gif';
                    path = 'classical/gif';
                    faceImage = path + '/' + key + p;
                } else if ('emoji' === categoryId) {
                    p = '.png';
                    path = 'emoji';
                    const img = emojiImageBox.getPictureByKey(key);
                    if (img) {
                        p = img;
                    }
                    faceImage = path + '/' + p;
                } else {
                    // no
                }
                const faceUrl = 'assets/images/common/face/' + faceImage;
                // var httpUrl = sever_url + "/" + url;
                const httpUrl = faceUrl;
                text = '<img src="' + httpUrl + '" value="' + categoryId + ',' + key + '" name="face" >';
            } else {
                const faceUrl = 'assets/images/common/face/' + faceImage;
                // var httpUrl = sever_url + "/" + url;
                const httpUrl = faceUrl;
                text = '<img src="' + httpUrl + '" value="' + categoryId + ',' + key + '" name="face" >';
            }
        }

        if ('url' === type) {
            text = '<a  href="' + value + '" >' + value + '</a>';
        }

        if ('file' === type) {
            const json = ContentUtil.isJson(value);
            if (json) {
                const fileData: any = BaseUtil.jsonToObject(value);
                const url = fileData.url;
                const fileName = fileData.name;
                const fileSize = (fileData.size) ? fileData.size : 0;

                let httpUrl = '';
                if (!BaseUtil.isEmpty(url)) {
                    if (url.startsWith('http')) {
                        httpUrl = url;
                    } else {
                        httpUrl = SEVER_URL + '/' + url;
                    }
                    httpUrl = BaseUtil.addURLParameter(httpUrl, 'name=' + fileName);
                }

                const icon = ContentUtil.getFileIcon(fileName);
                const fz = ContentUtil.getFileSizeText(fileSize);
                text = '';

                // text += '<div class=" ">';
                // text += '	<div class="">';
                // text += '		<div class="">';
                // text += '			<div class="" >';
                // text += '				<i class="' + icon + '"></i>';
                // text += '			</div>';
                // text += '			<div class="">';
                // text += '				<p class=" ">' + fileName + '</p>';
                // text += '				<div class="">';
                // text += '					<span class="">' + fz + '</span>';
                // text += '					<span class="sep">|</span>';
                // text += '					<a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" class="">下载</a>';
                // text += '				</div>';
                // text += '			</div>';
                // text += '		</div>';
                // text += '	</div>';
                // text += '</div>';

                // text += '<div class="bubble_cont primary ">';
                // const tag = '' +
                //     '<div class="chat_item">\n' +
                //     '            <div class="avatar">\n' +
                //     '                <i class="' + icon + '"></i>\n' +
                //     '            </div>\n' +
                //     '            <div class="info">\n' +
                //     '                <h3 class="nickname">\n' +
                //     '                    <span class="nickname_text">+ fileName + </span>\n' +
                //     '                </h3>\n' +
                //     '                <p class="msg">\n' +
                //     '                    <a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" class="">下载</a>\n' +
                //     '                </p>\n' +
                //     '            </div>\n' +
                //     '        </div>';
                // text += tag;


                // text += '<div class="bubble_cont primary ">';
                // text += '	<div class="attach">';
                // text += '		<div class="attach_bd">';
                // text += '			<div class="cover" >';
                // text += '				<i class="' + icon + '"></i>';
                // text += '			</div>';
                // text += '			<div class="cont">';
                // text += '				<p class="title ">' + fileName + '</p>';
                // text += '				<div class="opr">';
                // text += '					<span class="">' + fz + '</span>';
                // text += '					<span class="sep">|</span>';
                // text += '					<a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" class="">下载</a>';
                // text += '				</div>';
                // text += '			</div>';
                // text += '		</div>';
                // text += '	</div>';
                // text += '</div>'




                // text += '	<div class="message-attach">';
                text += '		<div class="message-attach">';
                text += '			<div class="message-attach-icon" >';
                text += '				<i class="' + icon + '"></i>';
                text += '			</div>';
                text += '			<div class="message-attach-info">';
                text += '				<h3 class="message-attach-title ">' + fileName + '</h3>';
                text += '				<div class="message-attach-download">';
                text += '					<span class="">' + fz + '</span>';
                text += '					<span class="sep">|</span>';
                text += '					<a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" class="">下载</a>';
                text += '				</div>';
                text += '			</div>';
                text += '		</div>';
                text += '	</div>';
                // text += '</div>';


                // text = "<label>文件：" + fileName + "</label>";
                // text += "<a target=\"_blank\" href=\"" + httpUrl + "\" >点击下载</a>";
                // text = '';
                // text += '<div class="file" style=\'min-width: 150px;\' >';
                // text += '   <div style="display: inline-block;"><span>' + fileName + '</span></div>';
                // text += '   <img src="images/chat/bar/Rfile.png" style="float:right;padding:13px 0 5px 5px;"/>';
                // text += '   <div>';
                // text += '       <a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" style="margin-left:6%;">另存为</a>';
                // text += '   </div>';
                // text += '</div>';


                // text = '';
                // text += '<div class="attach" style=\'min-width: 150px;\' >';
                // text += '   <div style="display: inline-block;">';
                // text += '	    <i class="' + icon + '" style="margin-top: -20px;"></i>';
                // text += '       <span>' + fileName + '</span>|<span class="">' + fz + '</span>';
                // // text += '   </div>';
                // // text += '   <div>';
                // text += '       <p>';
                // text += '           <a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" style="margin-left:6%;">另存为</a>';
                // text += '       </p>';
                // text += '   </div>';
                // text += '</div>';
            }
        }

        if ('audio' === type) {
            const json = ContentUtil.isJson(value);
            if (json) {
                const fileData: any = BaseUtil.jsonToObject(value);
                const url = fileData.url;
                const fileName = fileData.name;

                let httpUrl = '';
                if (!BaseUtil.isEmpty(url)) {
                    if (url.startsWith('http')) {
                        httpUrl = url;
                    } else {
                        httpUrl = SEVER_URL + '/' + url;
                    }
                }
                const timestamp = new Date().getTime();
                const key = 'audio_' + timestamp;
                text = '';
                text += '<audio controls style="width:250px;">';
                text += '    <source src="' + httpUrl + '" >';
                text += '    您的浏览器不支持播放，请下载文件播放';
                text += '</audio>';
                text += '<br>';
                text += '<label>文件：' + fileName + '</label>';
                text += '<a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" >点击下载</a>';
                text = '';
                // text += '<div class="btn-audio" onclick="audioPlay(\'' + key + '\')">';
                // // text += '    <img  src="images/chat/bar/yuyin3.png" style="position:absolute;top:5px;left:12px;"/>';
                // text += '    <audio controls id="' + key + '">';
                // text += '        <source src="' + httpUrl + '" >';
                // text += '        您的浏览器不支持播放，请下载文件播放';
                // text += '    </audio>';
                // text += '</div>';
            }
        }

        if ('video' === type) {
            const json = ContentUtil.isJson(value);
            if (json) {
                const fileData: any = BaseUtil.jsonToObject(value);
                const url: string = fileData.url;
                const fileName = fileData.name;

                let httpUrl = '';
                if (!BaseUtil.isEmpty(url)) {

                    if (url.startsWith('http')) {
                        httpUrl = url;
                    } else {
                        httpUrl = SEVER_URL + '/' + url;
                    }
                }
                text = '';
                text += '<div style="width:320px;">';
                text += '    <video width="320" controls >';
                text += '        <source src="' + httpUrl + '" >';
                text += '        您的浏览器不支持播放，请下载文件播放';
                text += '    </video>';
                text += '</div>';
                text += '<br>';
                text += '<label>文件：' + fileName + '</label>';
                text += '<a file-url="' + httpUrl + '" target="_blank" href="' + httpUrl + '" download="' + fileName + '" >点击下载</a>';
            }
        }

        if ('position' === type) {
            const json = ContentUtil.isJson(value);
            if (json) {
                const positionItem: any = BaseUtil.jsonToObject(value);
                const name = positionItem.name;
                const address = positionItem.address;
                const longitude = positionItem.longitude;
                const latitude = positionItem.latitude;

                // text = '<button  onclick="openMap(' + longitude + ',' + latitude + ');" >点击查看位置</button>';
                text = '<h3>不支持查看位置</h3>';
            }
        }
        return text;
    }

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

    public static isJson(text: string): boolean {
        if (typeof text === 'string') {
            try {
                const o = JSON.parse(text);
                if (text.indexOf('{') > -1 || text.indexOf('[') > -1) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
        return false;
    }


    public static format(format: string, date: Date) {
        /*
         * format="yyyy-MM-dd hh:mm:ss";
         */
        const map: Map<string, number> = new Map<string, number>();
        map.set('M+', date.getMonth() + 1);
        map.set('d+', date.getDate());
        map.set('h+', date.getHours());
        map.set('m+', date.getMinutes());
        map.set('s+', date.getSeconds());
        map.set('q+', Math.floor((date.getMonth() + 3) / 3));
        map.set('S', date.getMilliseconds());
        // const o = {
        //     "M+": date.getMonth() + 1,
        //     "d+": date.getDate(),
        //     "h+": date.getHours(),
        //     "m+": date.getMinutes(),
        //     "s+": date.getSeconds(),
        //     "q+": Math.floor((date.getMonth() + 3) / 3),
        //     "S": date.getMilliseconds()
        // };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
        }
        const keys = map.keys();
        for (const key of keys) {
            if (new RegExp('(' + key + ')').test(format)) {
                let no: number = 0;
                const value = map.get(key);
                if (value) {
                    no = value;
                }
                const v0 = '' + no;
                const v1 = '00' + no;
                const v2 = '' + no;
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? v0 : v1.substring(v2.length));
            }
        }

        // for (const k in o) {
        //     if (new RegExp('(' + k + ')').test(format)) {
        //         format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
        //     }
        // }
        return format;
    }


    public static getSection(element: Element): Section {
        const section: Section = new Section();
        const nodes = element.childNodes;
        if (nodes) {
            for (const e of nodes) {
                let nodeName = e.nodeName;
                nodeName = (nodeName) ? nodeName.toLowerCase() : '';
                if (nodeName === '#text') {
                    const value = e.nodeValue;
                    const item: Item = new Item();
                    item.type = Item.TYPE_TEXT;
                    item.value = (value) ? value : '';

                    section.items.push(item);
                }
                if (nodeName === 'img') {
                    const n = (e as any);

                    const url = n.src;
                    const name = n.name;
                    const value: string = n.value;

                    if ('face' === (name)) {
                        if (value) {
                            const array = value.split(',');
                            if (array.length > 1) {
                                const iv: FaceValue = new FaceValue();
                                iv.categoryId = array[0];
                                iv.key = array[1];

                                const item: Item = new Item();
                                item.type = Item.TYPE_FACE;
                                item.value = BaseUtil.objectToJson(iv);

                                section.items.push(item);
                            }
                        }
                    } else {
                        if (url) {
                            const iv: ImageValue = new ImageValue();
                            iv.url = (url) ? url : '';

                            const item: Item = new Item();
                            item.type = Item.TYPE_IMAGE;
                            item.value = BaseUtil.objectToJson(iv);

                            section.items.push(item);
                        }
                    }
                }
            }
        }
        return section;
    }


    public static getFileIcon(fileName: string): string {
        let icon = 'icon-unknown';
        let sn = FileNameUtil.getSuffixName(fileName);
        if (sn) {
            sn = sn.toLocaleLowerCase();
        }

        switch (sn) {
            case 'txt': {
                icon = 'icon-txt';
            }
            case 'pdf': {
                icon = 'icon-pdf';
            }
            case 'xls': {
                icon = 'icon-xls';
            }
            case 'xlsx': {
                icon = 'icon-xlsx';
            }
            case 'doc': {
                icon = 'icon-doc';
            }
            case 'ppt': {
                icon = 'icon-ppt';
            }
            case 'pptx': {
                icon = 'icon-pptx';
            }
            case 'zip': {
                icon = 'icon-zip';
            }
            case 'numbers': {
                icon = 'icon-numbers';
            }
            case 'pages': {
                icon = 'icon-pages';
            }
            case 'key': {
                icon = 'icon-key';
            }
            default: {
                // no
            }
        }
        return icon;
    }

    public static getFileSizeText(fileSize: number): string {
        let text = '0B';
        if (fileSize < 1024) {
            text = fileSize + 'B';
        } else if (1024 <= fileSize && fileSize < 1024 * 1024) {
            text = (fileSize / 1024).toFixed(2) + 'KB';
        } else if (1024 * 1024 <= fileSize && fileSize < 1024 * 1024 * 1024) {
            text = (fileSize / (1024 * 1024)).toFixed(2) + 'MB';
        } else {
            text = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }
        return text;
    }
}
