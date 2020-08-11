import ChatMessageModel from '@/platform/vue/view/model/ChatMessageModel';
import Content from '@/app/com/common/chat/Content';
import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
import app from '@/app/App';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import ImageValue from '@/app/com/common/chat/item/ImageValue';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';

export default class ChatViewModel extends ChatMessageModel {
    public chatData = {
        name: '',
        key: '',
        text: '',
        avatar: '',
    };

    public setName(name: string) {
        this.chatData.name = name;
    }

    public handleSend(c: Content, back: (success: boolean, key: string, content: Content, message: string) => void) {
        const key = this.chatData.key;
        if (c) {
            try {
                const messageKey = new Date().getMilliseconds() + '';
                c.key = messageKey;
                // const map: Map<string, File> = (wuh) ? wuh.getFileMapByItems(items) : new Map<string, File>(); // ImagePathFile.getFileMapByItems(items);
                const items = CoreContentUtil.getImageItemList(c);
                const handleItemsBack = (map: Map<string, File>) => {
                    if (map.size > 0) {
                        const uploadImageService: ContentUploadImageService = app.appContext.getMaterial(ContentUploadImageService);
                        uploadImageService.uploadImages(map, (success: boolean, rm: Map<string, UploadResult>, message?: string) => {
                            if (success) {
                                for (const item of items) {
                                    const iv: ImageValue = item.value;
                                    if (iv) {
                                        const urlKey = iv.url;
                                        const ur = rm.get(urlKey);
                                        if (ur && ur.result && ur.result.body) {
                                            const data = ur.result.body;
                                            const id = data.id;
                                            const name = data.name;
                                            const size = data.size;
                                            const url = data.url;
                                            iv.id = id;
                                            iv.name = name;
                                            iv.size = size;
                                            iv.url = url;

                                            item.value = iv;
                                        }
                                    }
                                }
                                back(true, key, c, '');
                            }
                        });
                    } else {
                        back(true, key, c, '');
                    }
                };
                const wuh: ImageItemFileConverter = app.appContext.getObject(ImageItemFileConverter.name);
                if (wuh) {
                    wuh.handleItems(items, handleItemsBack);
                } else {
                    handleItemsBack(new Map<string, File>());
                }
            } catch (e) {
                back(false, key, c, '图片无法发送！');
            }
        } else {
            back(false, key, c, '消息不能为空！');
        }
    }
}

