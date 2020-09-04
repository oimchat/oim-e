import BaseInitializer from '@/app/base/initialize/BaseInitializer';
import EnterInitializer from '@/app/base/initialize/EnterInitializer';
import RecentChatService from '@/app/com/main/module/business/chat/service/RecentChatService';
import UserChatUnreadService from '@/app/com/main/module/business/chat/service/UserChatUnreadService';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import ContactCategoryHandler from '@/app/com/main/module/business/contact/handler/ContactCategoryHandler';
import ContactRelationHandler from '@/app/com/main/module/business/contact/handler/ContactRelationHandler';
import GroupCategoryHandler from '@/app/com/main/module/business/group/handler/GroupCategoryHandler';
import GroupRelationHandler from '@/app/com/main/module/business/group/handler/GroupRelationHandler';
import GroupMemberOfOwnerHandler from '@/app/com/main/module/business/group/handler/GroupMemberOfOwnerHandler';

export default class ListInitializer extends EnterInitializer {

    public getOrder(): number {
        return 1;
    }

    public initialize(): void {
        this.loadList();
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
