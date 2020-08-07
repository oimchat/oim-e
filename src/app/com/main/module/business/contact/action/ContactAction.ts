import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import ContactService from '@/app/com/main/module/business/contact/service/ContactService';
import SystemInformationService from '@/app/com/client/module/prompt/service/SystemInformationService';
import SystemInformType from '@/app/com/main/data/SystemInformType';

export default class ContactAction extends AbstractMaterial {

    private static action: string = '1.2.001';


    @MethodMapping(ContactAction, ContactAction.action, '1.2.0001')
    public addApply(data: any): void {
        if (data && data.body) {
            const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
            systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '添加好友请求');
        }
    }
}
