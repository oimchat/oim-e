import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemInformationDataManager from '@/app/com/client/module/message/manager/SystemInformationDataManager';
import SystemInformationItemManager from '@/app/com/client/module/message/manager/SystemInformationItemManager';
import SystemInformationDataService from '@/app/com/client/module/message/service/SystemInformationDataService';

export default class SystemInformationItemEvent extends AbstractMaterial {

    public onSelect(key: string): void {
        const systemInformationDataService: SystemInformationDataService = this.appContext.getMaterial(SystemInformationDataService);
        systemInformationDataService.showByType(key);
    }

    public onDelete(key: string): void {
        const systemInformationDataManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        const systemInformationItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        systemInformationItemManager.deleteItem(key);
    }
}
