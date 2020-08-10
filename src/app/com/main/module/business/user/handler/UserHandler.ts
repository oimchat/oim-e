import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

export default class UserHandler extends AbstractMaterial {

    public getUserById(userId: string, back: (success: boolean, user: User) => void): void {
        const user: User = this.getLocalUserById(userId);
        if (user) {
            back(true, user);
        } else {
            this.getUserFromServerById(userId, back);
        }
    }

    public getLocalUserById(userId: string): User {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        return userBox.getUser(userId);
    }

    public getUserFromServerById(userId: string, back: (success: boolean, user: User) => void): void {
        let user: User | any;
        if (userId) {
            const own = this;
            const dataBack: DataBackAction = {
                back(data: any): void {
                    let mark = false;

                    if (data && data.body) {
                        user = data.body;
                        if (user) {
                            UserInfoUtil.handleAvatar(user);
                            mark = true;
                        }
                    }
                    back(mark, user);
                },
                timeOut(data: any): void {
                    back(false, user);
                },
                lost(data: any): void {
                    back(false, user);
                },
            } as AbstractDataBackAction;
            const userSender: UserSender = this.appContext.getMaterial(UserSender);
            userSender.getUser(userId, dataBack);
        } else {
            back(false, user);
        }
    }

    public getUsersByIds(ids: string[], back: (success: boolean, users: User[], message: string) => void) {
        const userSender: UserSender = this.appContext.getMaterial(UserSender);
        const userBack: DataBackAction = {
            back(data: any): void {
                let mark = false;
                let text = '请求失败！';
                let list: User[] = [];
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const items: User[] = data.body.items;
                            if (items) {
                                for (const u of list) {
                                    UserInfoUtil.handleAvatar(u);
                                }
                                list = items;
                                mark = true;
                                text = '';
                            }
                        }
                    }
                }
                back(mark, list, text);
            },
            lost(data: any): void {
                back(false, [], '请求失败！');
            },
            timeOut(data: any): void {
                back(false, [], '请求超时！');
            },
        } as DataBackAction;
        userSender.getUsers(ids, userBack, false);
    }
}
