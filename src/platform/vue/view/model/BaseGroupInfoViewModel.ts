import Group from '@/app/com/main/module/business/group/bean/Group';


class BaseGroupInfoViewModel {

    public groupId: string = '';
    public group: Group = new Group();
    public hasGroup: boolean = false;

    public initialize() {
        this.hasGroup = false;
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

export default BaseGroupInfoViewModel;
