import User from '@/app/com/main/module/business/user/bean/User';
import ContentData from '@/platform/vue/view/model/chat/content/ContentData';
import Content from '@/app/com/common/chat/Content';
import ChatCacheData from '@/views/main/message/chat/ChatCacheData';
import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
import app from '@/app/App';
import MessageSwitchSetting from '@/app/com/main/module/setting/message/MessageSwitchSetting';
import MessageAppendType from '@/app/com/main/module/setting/message/type/MessageAppendType';
import MessageTimeSettingStore from '@/app/com/main/module/setting/message/MessageTimeSettingStore';


export default class ChatMessageModel {

    public messageInfo = {
        key: '',
        showPrompt: false,
        prompt: '',
        lastTimestamp: 0,
        showNameVisible: false,
        list: [] as ContentData[],
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
    private listMap: Map<string, ContentData[]> = new Map<string, ContentData[]>();
    private keyMap: Map<string, Map<string, ContentData>> = new Map<string, Map<string, ContentData>>();
    private dataMap: Map<string, ChatCacheData> = new Map<string, ChatCacheData>();

    public clear(): void {
        this.listMap.clear();
        this.keyMap.clear();
        this.dataMap.clear();
        this.messageInfo.list = [] as ContentData[];
        this.cacheData.data = new ChatCacheData();
        this.nodeClear();
    }

    public nodeClear() {
        // no
    }

    public setChat(key: string) {
        const own = this;
        const list = this.getList(key);
        const data = this.getCacheData(key);
        this.messageInfo.list = list;
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
        this.insert(isReceive, isOwn, key, showName, chatUser, content, true);
        if (typeof this.cacheData.updateScrollIntoView === 'function') {
            const lastContentId = this.cacheData.data.lastContentId;
            if (lastContentId) {
                setTimeout(() => {
                    this.cacheData.updateScrollIntoView(lastContentId);
                }, 50);
            }
        }
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content): void {
        const cacheData = this.getCacheData(key);
        const scrollPosition = cacheData.scrollPosition;
        this.insert(isReceive, isOwn, key, showName, chatUser, content, false);
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
            this.messageInfo.prompt = showName + ':' + text;
            if (!this.messageInfo.showPrompt) {
                this.messageInfo.showPrompt = true;
                setTimeout(() => {
                    this.messageInfo.showPrompt = false;
                }, 3000);
            }
        }
    }

    public insert(isReceive: boolean, isOwn: boolean, key: string, showName: string, chatUser: User, content: Content, isBefore?: boolean): void {

        const messageTimeSettingStore: MessageTimeSettingStore = app.appContext.getMaterial(MessageTimeSettingStore);
        const mergeMillisecond = messageTimeSettingStore.messageTimeSetting.mergeMillisecond;

        const contentId = content.id;
        const messageKey = content.key;
        const map = this.getMap(key);
        const list = this.getList(key);
        let data: ContentData | undefined = map.get(messageKey);
        if (data) {
            if (isOwn) {
                const status: number = (isReceive) ? 1 : 0;
                data.status = status;
            }
        } else {
            const lastTimestamp = this.messageInfo.lastTimestamp;
            const timestamp = content.timestamp;

            const intervalMillisecond = isBefore ? (lastTimestamp - timestamp) : (timestamp - lastTimestamp);

            data = new ContentData();
            data.key = messageKey;
            data.id = contentId;
            data.content = content;
            data.name = showName;
            data.user = chatUser;
            data.isOwn = isOwn;
            data.timeVisible = (intervalMillisecond > mergeMillisecond);
            data.nameVisible = this.messageInfo.showNameVisible;

            this.messageInfo.lastTimestamp = content.timestamp;

            if (isOwn) {
                const status: number = (isReceive) ? 1 : 0;
                data.status = status;
            }

            if (isBefore) {
                list.splice(0, 0, data);
            } else {
                list.push(data);
            }
            map.set(messageKey, data);
            this.checkSize(key, 600);
        }
    }

    public checkSize(key: string, max: number) {
        const map = this.getMap(key);
        const list = this.getList(key);
        const length = list.length;
        if (length > max) {
            const size = length - max;
            for (let i = 0; i < size; i++) {
                const data = list[0];
                const messageKey = data.key;
                map.delete(messageKey);
                list.splice(0, 1);
            }
        }
    }

    public updateStatus(key: string, messageKey: string, status: number) {
        const map = this.getMap(key);
        const data: ContentData | undefined = map.get(messageKey);
        if (data) {
            data.status = status;
        }
    }

    private getList(key: string): ContentData[] {
        let list = this.listMap.get(key);
        if (!list) {
            list = [] as ContentData[];
            this.listMap.set(key, list);
        }
        return list;
    }

    private getMap(key: string): Map<string, ContentData> {
        let map = this.keyMap.get(key);
        if (!map) {
            map = new Map<string, ContentData>();
            this.keyMap.set(key, map);
        }
        return map;
    }

    private getCacheData(key: string): ChatCacheData {
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
}

