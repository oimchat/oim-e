import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import SystemInformationItemManager from '@/app/com/main/manager/SystemInformationItemManager';
import SystemMessageUnreadBox from '@/app/com/main/box/unread/SystemMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/main/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import SystemInformationDataManager from '@/app/com/main/manager/SystemInformationDataManager';


export default class SystemInformationDataService extends AbstractMaterial {

    public showByType(type: string) {
        const systemInformManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        systemInformManager.showByType(type);

        const systemInformItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        const systemMessageUnreadBox: SystemMessageUnreadBox = this.appContext.getMaterial(SystemMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);

        const unreadCount = systemMessageUnreadBox.getUnreadCount(type);
        // allMessageUnreadBox.minusUnread(unreadCount);

        const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
        const totalRed = totalUnreadCount > 0;
        messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);

        systemMessageUnreadBox.setUnreadCount(type, 0);
        systemInformItemManager.setItemRed(type, false, 0);
    }
}
