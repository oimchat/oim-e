import AbstractMaterial from '@/app/base/AbstractMaterial';
import SystemInformationItemManager from '@/app/com/main/manager/SystemInformationItemManager';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';
import PromptManager from '@/app/com/main/manager/PromptManager';
import SoundType from '@/app/com/main/component/SoundType';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import SystemInformationDataManager from '@/app/com/main/manager/SystemInformationDataManager';
import SystemMessageUnreadBox from '@/app/com/main/box/SystemMessageUnreadBox';
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
        systemInformationItemManager.updateItemText(type, text, showTime);
        const isShowing: boolean = systemInformationManager.isShowing(type);
        const isTabShowing: boolean = messageAllUnreadManager.isMessageItemShowing();
        if ((!isShowing || !isTabShowing)) {
            if (count) {
                for (let j = 0; j < count; j++) {
                    systemMessageUnreadBox.plusUnread(type);
                    allMessageUnreadBox.plusUnread(1);
                }
            } else {
                systemMessageUnreadBox.plusUnread(type);
                allMessageUnreadBox.plusUnread(1);
            }


            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = systemMessageUnreadBox.getUnreadCount(type);
            const red = unreadCount > 0;
            const totalRed = totalUnreadCount > 0;
            systemInformationItemManager.setItemRed(type, red, unreadCount);
            messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

            const promptManager: PromptManager = this.appContext.getMaterial(PromptManager);
            promptManager.playSound(SoundType.TYPE_SYSTEM);
        }
    }
}
