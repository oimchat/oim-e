import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import ChatCacheData from '@/views/main/message/chat/ChatCacheData';
import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
import app from '@/app/App';
import MessageSwitchSetting from '@/app/com/main/module/setting/message/MessageSwitchSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageTimeSettingStore from '@/app/com/main/module/setting/message/MessageTimeSettingStore';
import ContentItemUtil from '@/app/com/common/chat/util/ContentItemUtil';
import ContentWrap from '@/common/vue/data/content/ContentWrap';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import ContentWrapType from '@/common/vue/data/content/ContentWrapType';
import DateUtil from '@/app/lib/util/DateUtil';
import MessageStatusType from '@/common/vue/data/content/impl/message/MessageStatusType';
import DataBackAction from '@/app/base/net/DataBackAction';


export default class ChatMessageModel {

    public data = {
        key: '',
        showPrompt: false,
        prompt: '',
        lastTimestamp: 0,
        nameVisible: false,
        list: [] as ContentWrap[],
    };

    public cacheData = {
        key: '',
        data: new ChatCacheData(),
        updateScroll: (size: number) => {
            // no
        },
        updateScrollIntoView: (viewId: string) => {
            // no
        },
        getScrollHeight: () => {
            return 0;
        },
        setInnerHTML: (html: string) => {
            // no
        },
        getInnerHTML: (): string => {
            return '';
        },
    };

    private listMap: Map<string, ContentWrap[]> = new Map<string, ContentWrap[]>();
    private keyMap: Map<string, Map<string, ContentWrap>> = new Map<string, Map<string, ContentWrap>>();
    private dataMap: Map<string, ChatCacheData> = new Map<string, ChatCacheData>();

    public clear(): void {
        this.listMap.clear();
        this.keyMap.clear();
        this.dataMap.clear();
        this.data.list = [] as ContentWrap[];
        this.cacheData.data = new ChatCacheData();
        this.nodeClear();
    }

    public nodeClear() {
        // no
    }

    public setChat(key: string) {
        const own = this;
        const list = this.getOrCreateList(key);
        const data = this.getOrCreateCacheData(key);
        this.data.list = list;
        this.data.key = key;

        this.cacheData.key = key;
        this.cacheData.data = data;
        data.scrollTopCount = 0;
        const top = data.scrollTop;
        const html = data.html;

        const setting: MessageSwitchSetting = app.appContext.getMaterial(MessageSwitchSetting);
        const switchType = setting.getSwitchType();
        setTimeout(() => {
            this.setInnerHTML(html);
            if (MessageAppendType.last === switchType) {
                if (top > 0) {
                    own.updateScroll(top);
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
        return this.cacheData.key;
    }

    public toScrollBottom() {
        setTimeout(() => {
            const h = this.cacheData.getScrollHeight();
            this.cacheData.updateScroll(h);
        }, 50);
    }

    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        this.insert(isReceive, isOwn, key, showName, chatUser, content);
        if (typeof this.cacheData.updateScrollIntoView === 'function') {
            const lastMessageKey = this.cacheData.data.lastMessageKey;
            if (lastMessageKey) {
                setTimeout(() => {
                    this.cacheData.updateScrollIntoView(lastMessageKey);
                }, 50);
            }
        }
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        const cacheData = this.getOrCreateCacheData(key);
        const scrollPosition = cacheData.scrollPosition;
        this.insert(isReceive, isOwn, key, showName, chatUser, content);
        if (typeof this.cacheData.updateScroll === 'function') {
            if (scrollPosition === 'bottom') {
                setTimeout(() => {
                    const h = this.cacheData.getScrollHeight();
                    this.cacheData.updateScroll(h);
                }, 50);
            }
        }
        if (scrollPosition !== 'bottom') {
            let text = CoreContentUtil.getText(content);
            if (text && text.length > 100) {
                text = text.substring(0, 99) + '...';
            }
            this.data.prompt = showName + ':' + text;
            if (!this.data.showPrompt) {
                this.data.showPrompt = true;
                setTimeout(() => {
                    this.data.showPrompt = false;
                }, 6000);
            }
        }
    }

    public insert(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        ContentItemUtil.handle(content);

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
            const lastTimestamp = this.data.lastTimestamp;
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
            data.nameVisible = this.data.nameVisible;
            data.timeText = this.getTimeText(timestamp);

            this.data.lastTimestamp = timestamp;

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

    private updateScroll(h: number) {
        if (typeof this.cacheData.updateScroll === 'function') {
            this.cacheData.updateScroll(h);
        }
    }

    private setInnerHTML(html: string) {
        if (typeof this.cacheData.setInnerHTML === 'function') {
            this.cacheData.setInnerHTML(html);
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

