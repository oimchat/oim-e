import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import ObjectUtil from '@/app/common/util/ObjectUtil';

export default class UserBox extends AbstractMaterial {
    /** 所有用户<userId,userData> */
    private allUserMap: Map<string, User> = new Map<string, User>();

    /**
     * 存放用户
     *
     * @author: XiaHui
     * @param user
     */
    public putUser(user: User): void {
        const userId = user.id;
        UserInfoUtil.handleAvatar(user);
        const u = this.getUser(userId);
        if (u) {
            ObjectUtil.copyByTargetKey(u, user);
        } else {
            this.allUserMap.set(userId, user);
        }
    }

    public putUserList(list: User[]) {
        if (list) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const user = list[i];
                this.putUser(user);
            }
        }
    }

    public getUser(userId: string): User {
        const ud: any = this.allUserMap.get(userId);
        return ud;
    }

    public getAllList(): User[] {
        const list: User[] = [];
        const allList = this.allUserMap.values();
        for (const ud of allList) {
            list.push(ud);
        }
        return list;
    }

    public getUserStatus(userId: string): string {
        const ud = this.getUser(userId);
        const status = BaseUtil.isEmpty(ud) ? UserInfoUtil.PUBLIC_STATIC_STATUS_OFFLINE : ud.status;
        return status;
    }

    public isOnline(userId: string): boolean {
        const status = this.getUserStatus(userId);
        const mark = UserInfoUtil.isOffline(status);
        return !mark;
    }

    public findUserList(text: string) {
        const list = [];
        const allList = this.allUserMap.values();
        let size = 0;

        for (const ud of allList) {
            const account = ud.account;
            const email = ud.email;
            const mobile = ud.mobile;
            const name = ud.name;
            const nickname = ud.nickname;
            let mark = false;

            if (null != account && !mark) {
                mark = (account.indexOf(text) !== -1);
            }
            if (null != email && !mark) {
                mark = (email.indexOf(text) !== -1);
            }
            if (null != mobile && !mark) {
                mark = (mobile.indexOf(text) !== -1);
            }
            if (null != name && !mark) {
                mark = (name.indexOf(text) !== -1);
            }
            if (null != nickname && !mark) {
                mark = (nickname.indexOf(text) !== -1);
            }

            if (mark) {
                list.push(ud);
                size++;
            }

            if (size > 20) {
                return list;
            }
        }
        return list;
    }

    public keepSize(max: number) {
        const map: Map<string, User> = this.allUserMap;
        const size = map.size;
        const overflow = size - max;
        for (let i = 0; i < overflow; i++) {
            const key = map.keys().next().value;
            map.delete(key);
        }
    }
}
