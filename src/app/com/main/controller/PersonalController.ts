import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/AbstractMaterial';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import BaseUtil from '@/app/lib/util/BaseUtil';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import RegisterData from '@/app/com/bean/RegisterData';
import PersonalSender from '@/app/com/main/sender/PersonalSender';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserHead from '@/app/com/bean/UserHead';
import Message from '@/app/base/message/Message';
import HeadUploadImageService from '@/app/com/main/service/HeadUploadImageService';
import UploadResult from '@/app/com/main/data/UploadResult';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import ServerService from '@/app/com/main/service/ServerService';

export default class PersonalController extends AbstractMaterial {


    public register(u: RegisterData, list: SecurityQuestion[], back: (success: boolean) => void) {
        if (u && u.tempPassword) {
            u.password = Md5.init(u.tempPassword);
        }
        const registerBack = (data: any) => {
            let mark = false;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (info) {
                    mark = (info.success);
                }
            }
            back(mark);
        };

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                back(success);
            } else {
                const client: PersonalClient = this.appContext.getMaterial(PersonalClient);
                client.register(u, list, registerBack);
            }
        };
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(addressBack);
    }

    public loadUserData(): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.getUser();
    }


    public getUser(back?: DataBackAction, parallel?: boolean): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.getUser();
    }

    public updateUser(u: User, back?: DataBackAction, parallel?: boolean): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updateUser(u, back, parallel);
    }

    public updatePassword(oldPassword: string, newPassword: string, back?: DataBackAction, parallel?: boolean): void {
        if (oldPassword) {
            oldPassword = Md5.init(oldPassword);
        }
        if (newPassword) {
            newPassword = Md5.init(newPassword);
        }
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updatePassword(oldPassword, newPassword, back, parallel);
    }

    public uploadHead(head: UserHead, back?: DataBackAction, parallel?: boolean): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.uploadHead(head, back, parallel);
    }

    public updateHead(file: File, back: (success: boolean, url: string) => void): void {
        const own = this;
        const head: UserHead = new UserHead();
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

        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const hu: HeadUploadImageService = this.appContext.getMaterial(HeadUploadImageService);
        hu.uploadUserHead(file, (success: boolean, ur: UploadResult, message?: string) => {
            if (success) {
                if (ur && ur.result && ur.result.body && ur.result.body.data) {
                    const data = ur.result.body.data;
                    const id = data.id;
                    const name = data.name;
                    const size = data.size;
                    const url = data.url;


                    head.fileName = name;
                    head.headId = id;
                    head.type = UserHead.TYPE_CUSTOM;
                    head.userId = personalBox.getUserId();
                    head.url = url;
                    own.uploadHead(head, updateBack);
                }
            }
        });
    }

    public updateSignature(signature: string, back?: DataBackAction, parallel?: boolean): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updateSignature(signature, back, parallel);
    }

    public updateStatus(status: string, back?: DataBackAction, parallel?: boolean): void {
        const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
        ps.updateStatus(status, back, parallel);
    }
}
