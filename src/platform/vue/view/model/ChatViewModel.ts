import ChatMessageModel from '@/platform/vue/view/model/ChatMessageModel';
import Content from '@/app/com/common/chat/Content';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
import app from '@/app/App';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import ImageValue from '@/app/com/common/chat/item/ImageValue';
import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';
import User from '@/app/com/main/module/business/user/bean/User';
import ContentWrap from '@/common/vue/data/content/ContentWrap';
import ContentWrapType from '@/common/vue/data/content/ContentWrapType';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import FileNameUtil from '@/app/common/util/FileNameUtil';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';
import ContentItemHandleService from '@/common/web/content/service/ContentItemHandleService';
import ContentSendBeforeHandleService from '@/app/com/main/module/business/chat/service/ContentSendBeforeHandleService';

export default class ChatViewModel extends ChatMessageModel {

    public info = {
        key: '',
        avatar: '',
        name: '',
        text: '',
    };

    public setName(name: string) {
        this.info.name = name;
    }

    public handleSend(c: Content, back: (success: boolean, key: string, content: Content, message: string) => void) {
        const key = this.info.key;
        if (c) {
            try {
                const timestamp = new Date().getTime();
                const messageKey = timestamp + '';
                c.key = messageKey;
                c.timestamp = timestamp;
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
                                            let type = '';
                                            if (ur.file) {
                                                type = ur.file.type;
                                            }

                                            const data = ur.result.body;
                                            const id = data.id;
                                            const name = data.name;
                                            const size = data.size;
                                            const url = data.url;
                                            iv.id = id;
                                            iv.name = name;
                                            iv.size = size;
                                            iv.url = url;
                                            iv.type = type;
                                            iv.extension = FileNameUtil.getSuffixName(name);
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
                const wuh: ImageItemFileConverter = app.appContext.getObjectByKey(ImageItemFileConverter.name);
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

    public insertCurrent(key: string, showName: string, chatUser: User, content: Content, resend: (content: Content) => void): void {
        const isReceive = false;
        const isOwn = true;
        const messageKey = content.key;
        this.insertLast(isReceive, isOwn, key, showName, chatUser, content);
        const wrap: ContentWrap | undefined = this.getContentWrap(key, messageKey);
        if (wrap) {
            if (wrap.type === ContentWrapType.message) {
                const mc: MessageContentWrap = wrap.getData(MessageContentWrap);
                mc.resend = resend;
            }
        }
    }

    public send(content1: Content, back: (success: boolean, message: string) => void) {
        if (content1) {
            const own = this;
            const sendBeforeHandleService: ContentSendBeforeHandleService = app.appContext.getMaterial(ContentSendBeforeHandleService);
            this.handleSend(content1, (success, key, content2, message) => {
                if (success) {
                    const pb: PersonalBox = app.appContext.getMaterial(PersonalBox);
                    own.insertCurrent(key, '', pb.getUser(), content2, (content3) => {
                        own.updateStatus(key, content3.key, MessageStatusType.sending);
                        own.doSend(key, sendBeforeHandleService.convertContent(content3));
                    });
                    own.doSend(key, sendBeforeHandleService.convertContent(content2));
                }
                back(success, message);
            });
        } else {
            back(false, '消息不能为空！');
        }
    }

    protected doSend(key: string, content: Content) {
        // no
    }
}

