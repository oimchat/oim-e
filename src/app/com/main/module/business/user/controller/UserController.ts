import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
import Page from '@/app/com/common/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/main/module/business/user/bean/User';
import Prompter from '@/app/com/main/component/Prompter';
import ObjectUtil from '@/app/common/util/ObjectUtil';


export default class UserController extends AbstractMaterial {

    public queryUserList(query: UserQuery, page: Page, back?: DataBackAction): void {
        const us: UserSender = this.appContext.getMaterial(UserSender);
        us.queryUserList(query, page, back);
    }

    public queryList(query: UserQuery, page: Page, back: (success: boolean, message: string, users: User[]) => void) {
        let success = false;
        let message = '请求失败！';
        let users: User[] = [];
        const dataBackAction: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const p = data.body.page;
                            users = data.body.items;
                            success = true;
                            message = '';

                            if (p) {
                                ObjectUtil.copyByTargetKey(page, p);
                            }
                        }
                    }
                }
                back(success, message, users);
            },
            lost(data: any): void {
                // no
                message = '请求失败！';
                back(success, message, users);
            },
            timeOut(data: any): void {
                // no
                message = '请求超时！';
                back(success, message, users);
            },
        } as DataBackAction;
        const us: UserSender = this.appContext.getMaterial(UserSender);
        us.queryUserList(query, page, dataBackAction);
    }
}
