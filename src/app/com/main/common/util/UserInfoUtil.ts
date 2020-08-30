import BaseUtil from '@/app/lib/util/BaseUtil';
import UserBase from '@/app/com/main/module/business/user/bean/UserBase';

export default class UserInfoUtil {

    public static USER_HEAD_PATH: string = 'assets/general/common/images/common/head/user/';
    public static USER_HEAD_EXTENSION: string = 'jpg';
    public static USER_DEFAULT_AVATAR: string = UserInfoUtil.getDefaultAvatar();

    public static PUBLIC_STATIC_STATUS_ONLINE: string = '1';
    public static PUBLIC_STATIC_STATUS_CALL_ME: string = '2';
    public static PUBLIC_STATIC_STATUS_AWAY: string = '3';
    public static PUBLIC_STATIC_STATUS_BUSY: string = '4';
    public static PUBLIC_STATIC_STATUS_MUTE: string = '5';
    public static PUBLIC_STATIC_STATUS_INVISIBLE: string = '6';
    public static PUBLIC_STATIC_STATUS_OFFLINE: string = '7';

    public static getShowName(user: UserBase): string {
        let showName = '';
        if (user) {

            const nickname = user.nickname;
            const name = user.name;
            const account = user.account;
            const id = user.id;

            if (BaseUtil.isEmpty(showName)) {
                showName = nickname;
            }
            if (BaseUtil.isEmpty(showName)) {
                showName = name;
            }
            if (BaseUtil.isEmpty(showName)) {
                showName = account;
            }
            if (BaseUtil.isEmpty(showName)) {
                showName = id;
            }
        }
        return showName;
    }

    public static isOffline(status: string): boolean {
        let offline = true;
        if (UserInfoUtil.PUBLIC_STATIC_STATUS_ONLINE === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_ONLINE === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_CALL_ME === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_AWAY === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_BUSY === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_MUTE === status) {
            offline = false;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_INVISIBLE === status) {
            offline = true;
        } else if (UserInfoUtil.PUBLIC_STATIC_STATUS_OFFLINE === status) {
            offline = true;
        } else {
            offline = true;
        }
        return offline;
    }

    public static getHeadImage(user: UserBase): string {
        let image = UserInfoUtil.getDefaultAvatar();
        if (user) {
            const head = user.head;
            const avatar = user.avatar;

            if (BaseUtil.isEmpty(avatar)) {
                image = UserInfoUtil.USER_HEAD_PATH + head + '.' + UserInfoUtil.USER_HEAD_EXTENSION;
            } else {
                image = avatar;
            }
            if (BaseUtil.isEmpty(image)) {
                image = UserInfoUtil.getDefaultAvatar();
            }
        }
        return image;
    }

    public static handleAvatar(user: UserBase): void {
        if (user) {
            let head = user.head;
            const avatar = user.avatar;
            if (BaseUtil.isEmpty(avatar)) {
                head = (head) ? head : '1';
                user.avatar = UserInfoUtil.USER_HEAD_PATH + head + '.' + UserInfoUtil.USER_HEAD_EXTENSION;
            }
        }
    }

    public static getDefaultAvatar() {
        return UserInfoUtil.USER_HEAD_PATH + '1.' + UserInfoUtil.USER_HEAD_EXTENSION;
    }
}
