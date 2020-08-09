import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactListManager from '@/app/com/main/module/business/contact/manager/ContactListManager';
import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import ContactRelationSender from '@/app/com/main/module/business/contact/sender/ContactRelationSender';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';

export default class ContactRelationService extends AbstractMaterial {

    public setList(list: ContactRelation[]): void {
        if (list) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.setRelationList(list);
        }
    }

    public addByContactUserId(contactUserId: string): void {
        if (contactUserId) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const relation: ContactRelation = data.body;
                        if (relation) {
                            own.add(relation);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const contactRelationSender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
            contactRelationSender.getRelation(contactUserId, back);
        }
    }

    public add(relation: ContactRelation): void {
        if (relation) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.addOrUpdateRelation(relation);
        }
    }

    public updateRemark(contactUserId: string, remark: string) {
        if (contactUserId) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.updateRemarkName(contactUserId, remark);
        }
    }

    /**
     * 移动联系人到其他分组
     * @param contactUserIds
     * @param categoryId
     */
    public moveCategory(contactUserIds: string[], categoryId: string) {
        if (contactUserIds && categoryId) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
            const list: ContactRelation[] = [];
            const oldCategoryIds: string[] = [];
            // 找到原来的分组
            for (const userId of contactUserIds) {
                const array: ContactRelation[] = contactListBox.getContactInContactRelationListByUserId(userId);
                for (const d of  array) {
                    list.push(d);
                    oldCategoryIds.push(d.categoryId);
                }
            }
            // 从原来分组移除
            for (const data of list) {
                contactListBox.removeContactRelation(data.categoryId, data.contactUserId);
                data.categoryId = categoryId;
                contactListBox.putContactRelation(data);
            }

            // 原来的分组刷新
            for (const id of oldCategoryIds) {
                ccm.updateCategoryMember(id);
                ccm.updateCategoryMemberCount(id);
            }

            // 新的分组刷新
            ccm.updateCategoryMember(categoryId);
            ccm.updateCategoryMemberCount(categoryId);
        }
    }

    public delete(contactUserId: string) {
        if (contactUserId) {
            const ccm: ContactListManager = this.appContext.getMaterial(ContactListManager);
            ccm.deleteUser(contactUserId);
        }
    }
}
