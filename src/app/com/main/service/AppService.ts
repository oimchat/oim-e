import AbstractMaterial from '@/app/base/AbstractMaterial';
import serverClient from '@/app/com/main/http/api/ServerClient';
import ServerData from '@/app/com/data/ServerData';
import ServerBox from '@/app/com/main/box/ServerBox';
import ServerAddress from '@/app/com/bean/ServerAddress';
import PersonalSender from '@/app/com/main/sender/PersonalSender';
import ContactCategorySender from '@/app/com/main/sender/ContactCategorySender';
import ContactSender from '@/app/com/main/sender/ContactSender';
import ContactRelationSender from '@/app/com/main/sender/ContactRelationSender';
import User from '@/app/com/bean/User';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import GroupCategorySender from '@/app/com/main/sender/GroupCategorySender';
import GroupRelationSender from '@/app/com/main/sender/GroupRelationSender';
import GroupBusinessSender from '@/app/com/main/sender/GroupBusinessSender';
import GroupMemberSender from '@/app/com/main/sender/GroupMemberSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class AppService extends AbstractMaterial {

    public initializeApp(): void {
        this.loadPersonalData();
        this.updateStatus();
        this.loadList();
    }
    public loadPersonalData(): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.getUser();
    }

    public updateStatus(): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updateStatus(UserInfoUtil.PUBLIC_STATIC_STATUS_ONLINE);
    }

    public loadList(): void {
        const ccs: ContactCategorySender = this.appContext.getMaterial(ContactCategorySender);
        ccs.getList();

        const cs: ContactSender = this.appContext.getMaterial(ContactSender);
        cs.getList();

        const crs: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        crs.getList();


        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);

        const gms: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        gms.getOwnerGroupMemberList(pb.getUserId());


        const gcs: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
        gcs.getList();

        const groupBusinessSender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        groupBusinessSender.getList();

        const grs: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
        grs.getList();
    }
}
