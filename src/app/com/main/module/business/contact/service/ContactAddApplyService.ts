import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';
import DataBackAction from '@/app/base/net/DataBackAction';
import ContactSender from '@/app/com/main/module/business/contact/sender/ContactSender';
import Page from '@/app/com/common/data/Page';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserSender from '@/app/com/main/module/business/user/sender/UserSender';
import ContactAddApplyEntityCase from '@/app/com/main/module/business/contact/data/ContactAddApplyEntityCase';
import ContactAddApply from '@/app/com/main/module/business/contact/bean/ContactAddApply';


export default class ContactAddApplyService extends AbstractMaterial {

    public queryApplyDataReceiveList(query: ContactAddApplyQuery,
                                     page: Page,
                                     back: (p: Page, applicants: ContactAddApplyEntityCase[]) => void): void {
        const own = this;

        const applicants: ContactAddApplyEntityCase[] = [];
        let p: Page = page;

        const userBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const items: User[] = data.body.items;
                    if (items) {
                        const userMap: Map<string, User> = new Map<string, User>();
                        for (const user of items) {
                            userMap.set(user.id, user);
                        }
                        for (const value of applicants) {
                            const apply: ContactAddApply = value.apply;
                            if (apply) {

                                const userId = value.apply.applyUserId;
                                const u: any = userMap.get(userId);
                                value.user = u;
                            }
                        }
                    }
                    back(p, applicants);
                }
            },
        } as AbstractDataBackAction;

        const sender: ContactSender = this.appContext.getMaterial(ContactSender);
        const userSender: UserSender = this.appContext.getMaterial(UserSender);

        sender.queryApplyDataReceiveList(query, page, this.appContext.createDataBackAction((data: any) => {
            if (data && data.body) {
                const items: ContactAddApplyEntityCase[] = data.body.items;
                p = data.body.page;
                if (items) {
                    const userIds: string[] = [];
                    for (const value of items) {
                        const apply: ContactAddApply = value.apply;
                        if (apply) {
                            const applyId = value.apply.id;
                            const userId = value.apply.applyUserId;
                            userIds.push(userId);
                            applicants.push(value);
                        }
                    }
                    userSender.getUsers(userIds, userBack, false);
                }
            }
        }));
    }
}
