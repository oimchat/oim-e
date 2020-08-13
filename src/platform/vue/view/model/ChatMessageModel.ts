import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import ChatCacheData from '@/platform/vue/view/model/chat/ChatCacheData';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import app from '@/app/App';
import MessageSwitchSetting from '@/app/com/main/module/setting/message/MessageSwitchSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageTimeSettingStore from '@/app/com/main/module/setting/message/MessageTimeSettingStore';
import BaseContentItemUtil from '@/app/com/common/chat/util/BaseContentItemUtil';
import ContentWrap from '@/common/vue/data/content/ContentWrap';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import ContentWrapType from '@/common/vue/data/content/ContentWrapType';
import DateUtil from '@/app/lib/util/DateUtil';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';
import ChatReadViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatReadViewEntityDefaultImpl';
import ChatReadViewEntity from '@/platform/vue/view/entity/ChatReadViewEntity';
import ChatWriteViewEntity from '@/platform/vue/view/entity/ChatWriteViewEntity';
import ChatWriteViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatWriteViewEntityDefaultImpl';


export default class ChatMessageModel {


    public messageInfo = {
        showPrompt: false,
        prompt: '',
        lastTimestamp: 0,
        nameVisible: false,
        list: [] as ContentWrap[],
    };

    public viewData = {
        key: '',
        data: new ChatCacheData(),
    };


    private readViewEntity: ChatReadViewEntity = new ChatReadViewEntityDefaultImpl();
    private writeViewEntity: ChatWriteViewEntity = new ChatWriteViewEntityDefaultImpl();
    private onKeyChange: (key: string) => void = (() => {
        // no
    });

    private listMap: Map<string, ContentWrap[]> = new Map<string, ContentWrap[]>();
    private keyMap: Map<string, Map<string, ContentWrap>> = new Map<string, Map<string, ContentWrap>>();
    private dataMap: Map<string, ChatCacheData> = new Map<string, ChatCacheData>();

    public clear(): void {
        this.listMap.clear();
        this.keyMap.clear();
        this.dataMap.clear();
        this.messageInfo.list = [] as ContentWrap[];
        this.viewData.data = new ChatCacheData();
        this.nodeClear();
    }

    public nodeClear() {
        // no
    }

    public setChat(key: string) {
        const own = this;
        const list = this.getOrCreateList(key);
        const data = this.getOrCreateCacheData(key);
        this.handleKeyChange(key);
        this.messageInfo.list = list;

        this.viewData.key = key;
        this.viewData.data = data;
        data.scrollTopCount = 0;
        const top = data.scrollTop;
        const html = data.html;

        const setting: MessageSwitchSetting = app.appContext.getMaterial(MessageSwitchSetting);
        const switchType = setting.getSwitchType();
        setTimeout(() => {
            this.setInnerHTML(html);
            if (MessageAppendType.last === switchType) {
                if (top > 0) {
                    own.setScrollTop(top);
                } else {
                    own.toScrollBottom();
                }
            }
            if (MessageAppendType.bottom === switchType) {
                own.toScrollBottom();
            }
        }, 50);
    }

    public getChatKey(): string {
        return this.viewData.key;
    }


    public setReadViewEntity(readViewEntity: ChatReadViewEntity) {
        if (readViewEntity) {
            this.readViewEntity = readViewEntity;
        }
    }

    public setWriteViewEntity(writeViewEntity: ChatWriteViewEntity) {
        if (writeViewEntity) {
            this.writeViewEntity = writeViewEntity;
        }
    }

    public getReadViewEntity(): ChatReadViewEntity {
        return this.readViewEntity;
    }

    public getWriteViewEntity(): ChatWriteViewEntity {
        return this.writeViewEntity;
    }

    public setOnKeyChange(onKeyChange: (key: string) => void) {
        if (onKeyChange && typeof onKeyChange === 'function') {
            this.onKeyChange = onKeyChange;
        }
    }

    public toScrollBottom() {
        setTimeout(() => {
            const h = this.readViewEntity.getScrollHeight();
            this.readViewEntity.setScrollTop(h);
        }, 50);
    }

    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        this.insert(isReceive, isOwn, key, showName, chatUser, content);
        const lastMessageKey = this.viewData.data.lastMessageKey;
        this.updateScrollIntoView(lastMessageKey);
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        const own = this;
        const cacheData = this.getOrCreateCacheData(key);
        const scrollPosition = cacheData.scrollPosition;
        this.insert(isReceive, isOwn, key, showName, chatUser, content);
        if (scrollPosition === 'bottom') {
            own.toScrollBottom();
        }
        if (scrollPosition !== 'bottom') {
            let text = CoreContentUtil.getText(content);
            if (text && text.length > 100) {
                text = text.substring(0, 99) + '...';
            }
            this.messageInfo.prompt = showName + ':' + text;
            if (!this.messageInfo.showPrompt) {
                this.messageInfo.showPrompt = true;
                setTimeout(() => {
                    this.messageInfo.showPrompt = false;
                }, 6000);
            }
        }
    }

    public insert(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        BaseContentItemUtil.handle(content);

        const messageTimeSettingStore: MessageTimeSettingStore = app.appContext.getMaterial(MessageTimeSettingStore);
        const mergeMillisecond = messageTimeSettingStore.messageTimeSetting.mergeMillisecond;

        const contentId = content.id;
        const messageKey = content.key;
        const map = this.getOrCreateMap(key);
        const list = this.getOrCreateList(key);
        const wrap: ContentWrap | undefined = map.get(messageKey);

        let data: MessageContentWrap;
        if (wrap) {
            data = wrap.getData(MessageContentWrap);
            if (isOwn) {
                const status: number = (isReceive) ? MessageStatusType.succeed : MessageStatusType.sending;
                data.status = status;
            }
        } else {
            const lastTimestamp = this.messageInfo.lastTimestamp;
            const timestamp = content.timestamp;

            const isBefore = (lastTimestamp > timestamp);

            const intervalMillisecond = isBefore ? (lastTimestamp - timestamp) : (timestamp - lastTimestamp);

            data = new MessageContentWrap();
            data.key = messageKey;
            data.id = contentId;
            data.content = content;
            data.name = showName;
            data.avatar = chatUser.avatar;
            data.user = chatUser;
            data.isOwn = isOwn;
            data.timeVisible = (intervalMillisecond > mergeMillisecond);
            data.nameVisible = this.messageInfo.nameVisible;
            data.timeText = this.getTimeText(timestamp);

            this.messageInfo.lastTimestamp = timestamp;

            if (isOwn) {
                const status: number = (isReceive) ? MessageStatusType.succeed : MessageStatusType.sending;
                data.status = status;
            }

            if (isBefore) {
                list.splice(0, 0, data);
            } else {
                list.push(data);
            }
            map.set(messageKey, data);
            this.keepSize(key, 600);
            this.sort(list);
        }
    }

    public checkSize(key: string, max: number): boolean {
        const list = this.getOrCreateList(key);
        const length = list.length;
        return length < max;
    }

    public keepSize(key: string, max: number) {
        const map = this.getMap(key);
        const list = this.getList(key);
        if (list) {
            const length = list.length;
            if (length > max) {
                const size = length - max;
                for (let i = 0; i < size; i++) {
                    const wrap = list[i];
                    if (ContentWrapType.message === wrap.type) {
                        const data: MessageContentWrap = wrap.getData(MessageContentWrap);
                        const messageKey = data.key;
                        if (map) {
                            map.delete(messageKey);
                        }
                    }
                    list.splice(0, 1);
                }
            }
        }
    }

    public updateStatus(key: string, messageKey: string, status: number) {
        const map = this.getOrCreateMap(key);
        const wrap: ContentWrap | undefined = map.get(messageKey);
        if (wrap) {
            const data: MessageContentWrap = wrap.getData(MessageContentWrap);
            data.status = status;
        }
    }

    public getLastMessageKey(key: string): string {
        let messageKey: any;
        const list = this.getList(key);
        if (list) {
            const length = list.length;
            for (let i = length - 1; i >= 0; i--) {
                const wrap = list[i];
                if (ContentWrapType.message === wrap.type) {
                    const data: MessageContentWrap = wrap.getData(MessageContentWrap);
                    messageKey = data.key;
                    break;
                }
            }
        }
        return messageKey;
    }

    public geFirstMessageKey(key: string): string {
        let messageKey: any;
        const list = this.getList(key);
        if (list) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const wrap = list[i];
                if (ContentWrapType.message === wrap.type) {
                    const data: MessageContentWrap = wrap.getData(MessageContentWrap);
                    messageKey = data.key;
                    break;
                }
            }
        }
        return messageKey;
    }

    private handleKeyChange(key: string) {
        this.onKeyChange(key);
    }

    private getList(key: string): ContentWrap[] {
        const list: any = this.listMap.get(key);
        return list;
    }

    private getMap(key: string): Map<string, ContentWrap> {
        const map: any = this.keyMap.get(key);
        return map;
    }


    private getOrCreateList(key: string): ContentWrap[] {
        let list = this.listMap.get(key);
        if (!list) {
            list = [] as ContentWrap[];
            this.listMap.set(key, list);
        }
        return list;
    }

    private getOrCreateMap(key: string): Map<string, ContentWrap> {
        let map = this.keyMap.get(key);
        if (!map) {
            map = new Map<string, ContentWrap>();
            this.keyMap.set(key, map);
        }
        return map;
    }

    private getOrCreateCacheData(key: string): ChatCacheData {
        let data = this.dataMap.get(key);
        if (!data) {
            data = new ChatCacheData();
            this.dataMap.set(key, data);
        }
        return data;
    }

    private updateScrollIntoView(viewId: string) {
        if (typeof this.readViewEntity.updateScrollIntoView === 'function') {
            if (viewId) {
                setTimeout(() => {
                    this.readViewEntity.updateScrollIntoView(viewId);
                }, 50);
            }
        }
    }

    private setScrollTop(h: number) {
        if (typeof this.readViewEntity.setScrollTop === 'function') {
            this.readViewEntity.setScrollTop(h);
        }
    }

    private setInnerHTML(html: string) {
        if (typeof this.writeViewEntity.setInnerHTML === 'function') {
            this.writeViewEntity.setInnerHTML(html);
        }
    }

    private sort(list: ContentWrap[]) {
        if (list) {
            list.sort((a: ContentWrap, b: ContentWrap) => {
                const timestamp1: number = a.getTimestamp();
                const timestamp2: number = b.getTimestamp();
                return timestamp1 - timestamp2;
            });
        }
    }

    private getTimeText(timestamp: number) {
        let time = '';
        if (timestamp) {

            const messageTimeSettingStore: MessageTimeSettingStore = app.appContext.getMaterial(MessageTimeSettingStore);
            const date = (timestamp) ? new Date(timestamp) : new Date();

            const dateTimestamp = new Date().getTime();
            const durationMillisecond = (dateTimestamp - timestamp);
            const format = messageTimeSettingStore.getPastTimeFormatValue(durationMillisecond);
            time = DateUtil.format(format, date);
        }
        return time;
    }
}

