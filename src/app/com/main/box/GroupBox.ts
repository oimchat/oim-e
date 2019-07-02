import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupInfoUtil from '@/app/com/main/util/GroupInfoUtil';

export default class GroupBox extends AbstractMaterial {
    /** 所有群<groupId,Group> */
    private allGroupMap: Map<string, Group> = new Map<string, Group>();

    /**
     * 存放群
     *
     * @author: XiaHui
     * @param group
     */
    public putGroup(group: Group): void {
        const groupId = group.id;
        GroupInfoUtil.handleAvatar(group);
        this.allGroupMap.set(groupId, group);
    }

    public putGroupList(list: Group[]) {
        if (list) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const group = list[i];
                this.putGroup(group);
            }
        }
    }

    public getGroup(groupId: string): Group {
        const ud: any = this.allGroupMap.get(groupId);
        return ud;
    }


    public findGroupList(text: string) {
        const list = [];
        const allList = this.allGroupMap.values();
        let size = 0;

        for (const d of allList) {
            const no = d.number + '';
            const name = d.name;
            const introduce = d.introduce;
            let mark = false;

            if (null != no && !mark) {
                mark = (no.indexOf(text) !== -1);
            }
            if (null != name && !mark) {
                mark = (name.indexOf(text) !== -1);
            }
            if (null != introduce && !mark) {
                mark = (introduce.indexOf(text) !== -1);
            }

            if (mark) {
                list.push(d);
                size++;
            }

            if (size > 20) {
                return list;
            }
        }
        return list;
    }
}
