import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import GroupInfoSender from '@/app/com/main/sender/GroupInfoSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupQuery from '@/app/com/data/GroupQuery';
import Page from '@/app/com/data/Page';
import GroupHead from '@/app/com/bean/GroupHead';
import HeadUploadImageService from '@/app/com/main/service/HeadUploadImageService';
import UploadResult from '@/app/com/main/data/UploadResult';

export default class GroupInfoController extends AbstractMaterial {

    public queryGroupList(groupQuery: GroupQuery, page: Page, back?: DataBackAction): void {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.queryGroupList(groupQuery, page, back);
    }

    public add(group: Group, back?: DataBackAction) {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.addGroup(group, back);
    }

    public updateGroup(group: Group, back?: DataBackAction): void {
        const groupInfoSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        groupInfoSender.updateGroup(group, back);
    }


    public uploadHead(head: GroupHead, back?: DataBackAction, parallel?: boolean): void {
        const ps: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
        ps.uploadHead(head, back);
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
                if (ur && ur.result && ur.result.body && ur.result.body.data) {
                    const data = ur.result.body.data;
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
}
