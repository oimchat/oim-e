import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInfoController from '@/app/com/main/module/business/group/controller/GroupInfoController';
import App from '@/app/App';

export default class GroupInfoCardMapper {
    public groupId: string = '';
    public group: Group = new Group();
    public hasGroup: boolean = false;

    public initialize() {
        this.hasGroup = false;
    }

    public loadById(groupId: string) {
        const own = this;
        const groupInfoController: GroupInfoController = App.appContext.getMaterial(GroupInfoController);
        groupInfoController.getById(groupId, (success, message, group) => {
            if (success) {
                own.setGroup(group);
            } else {
                App.prompt(message);
            }
        });
    }

    public setGroup(group: Group) {
        if (group) {
            this.groupId = group.id;
            this.group = group;
            this.hasGroup = true;
        } else {
            this.hasGroup = false;
            this.groupId = '';
            this.group = new Group();
        }
        this.groupChange();
    }

    public groupChange(): void {
        // no
    }
}
