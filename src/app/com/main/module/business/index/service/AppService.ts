import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import PersonalSender from '@/app/com/main/module/business/personal/sender/PersonalSender';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import ContactCategoryHandler from '@/app/com/main/module/business/contact/handler/ContactCategoryHandler';
import ContactRelationHandler from '@/app/com/main/module/business/contact/handler/ContactRelationHandler';
import GroupCategoryHandler from '@/app/com/main/module/business/group/handler/GroupCategoryHandler';
import GroupRelationHandler from '@/app/com/main/module/business/group/handler/GroupRelationHandler';
import GroupMemberOfOwnerHandler from '@/app/com/main/module/business/group/handler/GroupMemberOfOwnerHandler';

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

        // 这里只发送请求，因为请求是异步方式，服务端返回的数据由Action处理
        // 加载联系人分组列表
        this.loadContactCategoryList();
        // 加载联系人
        this.loadContactRelationList();

        this.loadGroupCategoryList();
        this.loadGroupRelationList();
        this.loadOwnerGroupMemberList();

        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
    }

    public loadContactCategoryList(): void {
        const handler: ContactCategoryHandler = this.appContext.getMaterial(ContactCategoryHandler);
        handler.loadAllList();
    }

    public loadContactRelationList(): void {
        const handler: ContactRelationHandler = this.appContext.getMaterial(ContactRelationHandler);
        handler.loadAllList();
    }


    public loadGroupCategoryList(): void {
        const handler: GroupCategoryHandler = this.appContext.getMaterial(GroupCategoryHandler);
        handler.loadAllList();
    }

    public loadGroupRelationList(): void {
        const handler: GroupRelationHandler = this.appContext.getMaterial(GroupRelationHandler);
        handler.loadAllList();
    }

    public loadOwnerGroupMemberList(): void {
        const handler: GroupMemberOfOwnerHandler = this.appContext.getMaterial(GroupMemberOfOwnerHandler);
        handler.loadAllOwnerGroupMemberList();
    }
}
