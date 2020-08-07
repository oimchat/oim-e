import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
import Page from '@/app/com/common/data/Page';
import DataBackAction from '@/app/base/net/DataBackAction';


export default class UserController extends AbstractMaterial {

    public queryUserList(query: UserQuery, page: Page, back?: DataBackAction): void {
        const us: UserSender = this.appContext.getMaterial(UserSender);
        us.queryUserList(query, page, back);
    }
}
