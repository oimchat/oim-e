import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import ContactAction from '@/app/com/main/module/business/contact/action/ContactAction';
import ContactCategoryAction from '@/app/com/main/module/business/contact/action/ContactCategoryAction';
import ContactRelationAction from '@/app/com/main/module/business/contact/action/ContactRelationAction';
import GroupBusinessAction from '@/app/com/main/module/business/group/action/GroupBusinessAction';
import GroupCategoryAction from '@/app/com/main/module/business/group/action/GroupCategoryAction';
import GroupChatAction from '@/app/com/main/module/business/chat/action/GroupChatAction';
import GroupInfoAction from '@/app/com/main/module/business/group/action/GroupInfoAction';
import GroupInviteAction from '@/app/com/main/module/business/group/action/GroupInviteAction';
import GroupJoinAction from '@/app/com/main/module/business/group/action/GroupJoinAction';
import GroupMemberAction from '@/app/com/main/module/business/group/action/GroupMemberAction';
import GroupRelationAction from '@/app/com/main/module/business/group/action/GroupRelationAction';
import PersonalAction from '@/app/com/main/module/business/personal/action/PersonalAction';
import UserAction from '@/app/com/main/module/business/user/action/UserAction';
import UserChatAction from '@/app/com/main/module/business/chat/action/UserChatAction';
import UserChatDataAction from '@/app/com/main/module/business/chat/action/UserChatDataAction';
import SystemAuthAction from '@/app/com/main/module/business/system/action/SystemAuthAction';
import ActionType from '@/app/base/ActionType';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class ActionInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeAction(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeAction(appContext: AppContext) {
        this.putAction(ContactAction);
        this.putAction(ContactCategoryAction);
        this.putAction(ContactRelationAction);
        this.putAction(GroupBusinessAction);
        this.putAction(GroupCategoryAction);
        this.putAction(GroupChatAction);
        this.putAction(GroupInfoAction);
        this.putAction(GroupInviteAction);
        this.putAction(GroupJoinAction);
        this.putAction(GroupMemberAction);
        this.putAction(GroupRelationAction);
        this.putAction(PersonalAction);
        this.putAction(UserAction);
        this.putAction(UserChatAction);
        this.putAction(UserChatDataAction);
        this.putAction(SystemAuthAction);
    }


    public putAction<T>(clazz: ActionType<AbstractMaterial>): void {
        // new clazz(this);
    }
}
