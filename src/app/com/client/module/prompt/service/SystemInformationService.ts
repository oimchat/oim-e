import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemInformationItemManager from '@/app/com/main/manager/SystemInformationItemManager';
import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
import PromptManager from '@/app/com/client/module/prompt/manager/PromptManager';
import SoundType from '@/app/com/client/define/prompt/SoundType';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import SystemInformationDataManager from '@/app/com/main/manager/SystemInformationDataManager';
import SystemMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/SystemMessageUnreadBox';
import BaseUtil from '@/app/lib/util/BaseUtil';


export default class SystemInformationService extends AbstractMaterial {

    public inform(type: string, text: string, count?: number) {
        const systemInformationManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        const systemInformationItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        const systemMessageUnreadBox: SystemMessageUnreadBox = this.appContext.getMaterial(SystemMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const showTime = CoreContentUtil.getChatShowTime(BaseUtil.getTimestamp());


        if (!systemInformationItemManager.hasItem(type)) {
            systemInformationItemManager.addOrUpdate(type);
        }
        const timestamp = new Date().getMilliseconds();
        systemInformationItemManager.updateItemText(type, text, showTime, timestamp);
        const isShowing: boolean = systemInformationManager.isShowing(type);
        if ((!isShowing)) {
            if (count) {
                for (let j = 0; j < count; j++) {
                    systemMessageUnreadBox.plusUnread(type);
                    // allMessageUnreadBox.plusUnread(1);
                }
            } else {
                systemMessageUnreadBox.plusUnread(type);
                // allMessageUnreadBox.plusUnread(1);
            }


            const unreadCount = systemMessageUnreadBox.getUnreadCount(type);
            const red = unreadCount > 0;
            systemInformationItemManager.setItemRed(type, red, unreadCount);

            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.System);
        }
    }
}
