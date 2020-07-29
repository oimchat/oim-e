import BaseInitializer from '@/app/com/main/initialize/BaseInitializer';
import AbstractInitializer from '@/app/com/main/initialize/AbstractInitializer';
import RecentChatService from '@/app/com/main/service/RecentChatService';
import UserChatUnreadService from '@/app/com/main/service/UserChatUnreadService';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import ContactCategoryHandler from '@/app/com/main/handler/ContactCategoryHandler';
import ContactRelationHandler from '@/app/com/main/handler/ContactRelationHandler';
import GroupCategoryHandler from '@/app/com/main/handler/GroupCategoryHandler';
import GroupRelationHandler from '@/app/com/main/handler/GroupRelationHandler';
import GroupMemberHandler from '@/app/com/main/handler/GroupMemberHandler';

export default class ListInitializer extends AbstractInitializer {

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
        const handler: GroupMemberHandler = this.appContext.getMaterial(GroupMemberHandler);
        handler.loadAllOwnerGroupMemberList();
    }
}
