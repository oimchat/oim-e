import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemInformationDataManager from '@/app/com/client/module/message/manager/SystemInformationDataManager';


export default class SystemInformationDataService extends AbstractMaterial {

    public showByType(type: string) {
        const systemInformManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        systemInformManager.showByType(type);
    }
}
