import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupBusinessSender from '@/app/com/main/module/business/group/sender/GroupBusinessSender';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';
import GroupHead from '@/app/com/main/module/business/group/bean/GroupHead';
import HeadUploadImageService from '@/app/com/main/module/support/file/service/HeadUploadImageService';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';

export default class GroupBusinessController extends AbstractMaterial {


    public getList(back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.getList(back, parallel);
    }

    public add(group: Group, back?: DataBackAction) {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.addGroup(group, back);
    }

    public updateGroup(group: Group, back?: DataBackAction): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.updateGroup(group, back);
    }

    public uploadHead(head: GroupHead, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.uploadHead(head, back);
    }

    public updateHead(groupId: string, file: File, back: (success: boolean, url: string) => void): void {
        const own = this;
        const head: GroupHead = new GroupHead();
        const updateBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success) {
                            back(true, head.url);
                        } else {
                            back(false, head.url);
                        }
                    }
                }
            },
            lost(data: any): void {
                back(false, head.url);
            },
            timeOut(data: any): void {
                back(false, head.url);
            },
        } as DataBackAction;

        const hu: HeadUploadImageService = this.appContext.getMaterial(HeadUploadImageService);
        hu.uploadGroupHead(file, (success: boolean, ur: UploadResult, message?: string) => {
            if (success) {
                if (ur && ur.result && ur.result.body) {
                    const data = ur.result.body;
                    const id = data.id;
                    const name = data.name;
                    const size = data.size;
                    const url = data.url;


                    head.fileName = name;
                    head.headId = id;
                    head.type = GroupHead.TYPE_CUSTOM;
                    head.groupId = groupId;
                    head.url = url;
                    own.uploadHead(head, updateBack);
                }
            }
        });
    }

    public changeGroupOwner(groupId: string, newOwnerUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.changeGroupOwner(groupId, newOwnerUserId, back, parallel);
    }

    public disband(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.disband(groupId, back, parallel);
    }

    public quit(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const sender: GroupBusinessSender = this.appContext.getMaterial(GroupBusinessSender);
        sender.quit(groupId, back, parallel);
    }
}
