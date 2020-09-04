import EnterInitializer from '@/app/base/initialize/EnterInitializer';
import PersonalSender from '@/app/com/main/module/business/personal/sender/PersonalSender';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class PersonalInitializer extends EnterInitializer {

    public getOrder(): number {
        return 1;
    }

    public initialize(): void {
        this.initializePersonal();
    }

    public initializePersonal(): void {
        this.loadPersonalData();
        this.updateStatus();
    }

    public loadPersonalData(): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.getUser();
    }

    public updateStatus(): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updateStatus(UserInfoUtil.PUBLIC_STATIC_STATUS_ONLINE);
    }
}
