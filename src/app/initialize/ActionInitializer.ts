import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import ContactAction from '@/app/com/main/action/ContactAction';
import ContactCategoryAction from '@/app/com/main/action/ContactCategoryAction';
import ContactRelationAction from '@/app/com/main/action/ContactRelationAction';
import GroupBusinessAction from '@/app/com/main/action/GroupBusinessAction';
import GroupCategoryAction from '@/app/com/main/action/GroupCategoryAction';
import GroupChatAction from '@/app/com/main/action/GroupChatAction';
import GroupInfoAction from '@/app/com/main/action/GroupInfoAction';
import GroupInviteAction from '@/app/com/main/action/GroupInviteAction';
import GroupJoinAction from '@/app/com/main/action/GroupJoinAction';
import GroupMemberAction from '@/app/com/main/action/GroupMemberAction';
import GroupRelationAction from '@/app/com/main/action/GroupRelationAction';
import PersonalAction from '@/app/com/main/action/PersonalAction';
import UserAction from '@/app/com/main/action/UserAction';
import UserChatAction from '@/app/com/main/action/UserChatAction';
import UserChatDataAction from '@/app/com/main/action/UserChatDataAction';
import SystemAuthAction from '@/app/com/main/action/SystemAuthAction';
import ActionType from '@/app/base/ActionType';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class ActionInitializer implements Initializer {
    public getOrder(): number {
        return 0;
    }

    public initialize(appContext: AppContext): void {
        this.initializeAction(appContext);
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
