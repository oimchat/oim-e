import AbstractMaterial from '@/app/base/AbstractMaterial';
import UserSender from '@/app/com/main/sender/UserSender';
import UserQuery from '@/app/com/data/UserQuery';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';


export default class UserController extends AbstractMaterial {

    public queryUserList(userQuery: UserQuery, page: Page, back?: DataBackAction): void {
        const us: UserSender = this.appContext.getMaterial(UserSender);
        us.queryUserList(userQuery, page, back);
    }
}
