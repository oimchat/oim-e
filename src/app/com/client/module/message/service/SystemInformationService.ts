import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemInformationItemManager from '@/app/com/client/module/message/manager/SystemInformationItemManager';
import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
import PromptManager from '@/app/com/client/module/prompt/manager/PromptManager';
import SoundType from '@/app/com/client/define/prompt/SoundType';
import SystemMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/SystemMessageUnreadBox';
import BaseUtil from '@/app/lib/util/BaseUtil';


export default class SystemInformationService extends AbstractMaterial {

    public inform(type: string,
                  text: string,
                  value: any,
                  onSelect: (key: any, value: any) => void,
                  onDelete: (key: string, value: any) => void,
                  prompt: boolean,
                  count: number) {

        const systemInformationItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        const systemMessageUnreadBox: SystemMessageUnreadBox = this.appContext.getMaterial(SystemMessageUnreadBox);
        const showTime = CoreContentUtil.getChatShowTime(BaseUtil.getTimestamp());

        if (!systemInformationItemManager.hasItem(type)) {
            systemInformationItemManager.addOrUpdate(type, value, onSelect, onDelete);
        }
        const timestamp = new Date().getTime();
        systemInformationItemManager.updateItemText(type, text, showTime, timestamp);

        for (let j = 0; j < count; j++) {
            systemMessageUnreadBox.plusUnread(type);
        }

        const unreadCount = systemMessageUnreadBox.getUnreadCount(type);
        const red = unreadCount > 0;
        systemInformationItemManager.setItemRed(type, red, unreadCount);

        if ((prompt)) {
            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.System);
        }
    }

    public showByType(type: string) {

        const systemInformItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        const systemMessageUnreadBox: SystemMessageUnreadBox = this.appContext.getMaterial(SystemMessageUnreadBox);

        systemMessageUnreadBox.setUnreadCount(type, 0);
        systemInformItemManager.setItemRed(type, false, 0);
    }

    public delete(key: string): void {
        const systemInformationItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        systemInformationItemManager.deleteItem(key);
    }
}
