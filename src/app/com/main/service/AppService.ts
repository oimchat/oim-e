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
import DataBackAction from '@/app/base/net/DataBackAction';
import DefaultDataBackAction from '@/app/common/back/DefaultDataBackAction';
import Page from '@/app/com/data/common/Page';
import ContactCategoryHandler from '@/app/com/main/handler/ContactCategoryHandler';
import ContactRelationHandler from '@/app/com/main/handler/ContactRelationHandler';
import GroupCategoryHandler from '@/app/com/main/handler/GroupCategoryHandler';
import GroupRelationHandler from '@/app/com/main/handler/GroupRelationHandler';
import GroupMemberHandler from '@/app/com/main/handler/GroupMemberHandler';

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
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.loadAllOwnerGroupMemberList();
    }
}
