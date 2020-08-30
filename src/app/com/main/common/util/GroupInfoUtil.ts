import Group from '@/app/com/main/module/business/group/bean/Group';
import BaseUtil from '@/app/lib/util/BaseUtil';

export default class GroupInfoUtil {

    public static GROUP_HEAD_IMAGES: string = 'assets/general/common/images/common/head/group/';

    public static getShowName(group: Group): string {
        let showName = '';
        if (group) {

            const name = group.name;
            const no = group.number;
            const id = group.id;

            if (BaseUtil.isEmpty(showName)) {
                showName = name;
            }
            if (BaseUtil.isEmpty(showName)) {
                showName = no + '';
            }
            if (BaseUtil.isEmpty(showName)) {
                showName = id;
            }
        }
        return showName;
    }

    public static getHeadImage(group: Group): string {
        let image = '';
        const head = group.head;
        const avatar = group.avatar;

        if (BaseUtil.isEmpty(avatar)) {
            image = GroupInfoUtil.GROUP_HEAD_IMAGES + head + '.png';
        } else {
            image = avatar;
        }
        if (BaseUtil.isEmpty(image)) {
            image = GroupInfoUtil.GROUP_HEAD_IMAGES + '1.png';
        }
        return image;
    }

    public static handleAvatar(group: Group): void {
        let head = group.head;
        const avatar = group.avatar;
        if (BaseUtil.isEmpty(avatar)) {
            head = (head) ? head : '1';
            group.avatar = GroupInfoUtil.GROUP_HEAD_IMAGES + head + '.png';
        }
    }

    public static getDefaultAvatar() {
        return GroupInfoUtil.GROUP_HEAD_IMAGES + '1.png';
    }
}
