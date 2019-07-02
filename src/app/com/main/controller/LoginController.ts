import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/AbstractMaterial';
import AppContext from '@/app/base/AppContext';
import serverClient from '@/app/com/main/http/api/ServerClient';
import ServerData from '@/app/com/data/ServerData';
import ServerService from '@/app/com/main/service/ServerService';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import Prompt from '@/component/common/Prompt';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Vue from 'vue/types/vue';
import ConnectService from '@/app/com/main/service/ConnectService';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import ServerAddress from '@/app/com/bean/ServerAddress';
import auth from '@/app/common/auth/Auth';
import SystemAuthManager from '@/app/com/main/manager/SystemAuthManager';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import DataBackAction from '@/app/base/net/DataBackAction';
import AppService from '@/app/com/main/service/AppService';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import UserLastChatService from '@/app/com/main/service/UserLastChatService';
import GroupLastChatService from '@/app/com/main/service/GroupLastChatService';
import MessageListView from '@/app/com/main/view/MessageListView';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import GroupJoinSender from '@/app/com/main/sender/GroupJoinSender';
import ContactSender from '@/app/com/main/sender/ContactSender';
import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';
import GroupJoinApplyQuery from '@/app/com/data/GroupJoinApplyQuery';
import SystemInformationService from '@/app/com/main/service/SystemInformationService';
import SystemInformType from '@/app/com/main/data/SystemInformType';
import GroupJoinApply from '@/app/com/bean/GroupJoinApply';
import ContactAddApply from '@/app/com/bean/ContactAddApply';
import GroupInviteSender from '@/app/com/main/sender/GroupInviteSender';
import GroupInviteApplyQuery from '@/app/com/data/GroupInviteApplyQuery';
import GroupInviteeApplyQuery from '@/app/com/data/GroupInviteeApplyQuery';
import GroupInviteApply from '@/app/com/bean/GroupInviteApply';
import InitializeFunction from '@/app/com/main/function/InitializeFunction';

export default class LoginController extends AbstractMaterial {


    public login(account: string, password: string, back: (success: boolean, message?: string) => void): void {

        const own = this;
        password = Md5.init(password);

        const authBack = (success: boolean, message?: string) => {
            if (success) {
                auth.setLogin(true);
                auth.account = account;
                auth.password = password;
                this.initializeApp();
            }
            back(success, message);
        };

        const connectBack = (success: boolean, message?: string) => {
            if (!success) {
                back(success, message);
            } else {
                this.auth(authBack);
            }
        };

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                back(success, message);
            } else {
                this.connect(connectBack);
            }
        };
        const loginBack = (success: boolean, message?: string) => {

            if (!success) {
                back(success, message);
            } else {
                this.loadServerAddress(addressBack);
            }
        };
        this.loadToken(account, password, loginBack);
    }


    public reconnect(back?: (success: boolean, message?: string) => void): void {
        const isLogin = auth.isLogin();
        if (isLogin) {
            const account = auth.account;
            const password = auth.password;
            const tempBack = (success: boolean, message?: string) => {
                if (back) {
                    // TODO
                    back(success, message);
                }
            };

            const authBack = (success: boolean, message?: string) => {
                tempBack(success, message);
            };

            const connectBack = (success: boolean, message?: string) => {
                if (!success) {
                    tempBack(success, message);
                } else {
                    this.auth(authBack);
                }
            };

            const addressBack = (success: boolean, message?: string) => {
                if (!success) {
                    tempBack(success, message);
                } else {
                    this.connect(connectBack);
                }
            };
            const loginBack = (success: boolean, message?: string) => {

                if (!success) {
                    tempBack(success, message);
                } else {
                    this.loadServerAddress(addressBack);
                }
            };
            this.loadToken(account, password, loginBack);
        }
    }

    public reAuth(): void {
        const isLogin = auth.isLogin();
        if (isLogin) {
            const account = auth.account;
            const password = auth.password;
            const back = (success: boolean, message?: string) => {
                if (success) {
                    // TODO
                    this.updateStatus();
                }
            };
            const authBack = (success: boolean, message?: string) => {
                back(success, message);
            };
            const loginBack = (success: boolean, message?: string) => {
                if (!success) {
                    back(success, message);
                } else {
                    this.auth(authBack);
                }
            };
            this.loadToken(account, password, loginBack);
        }
    }

    public initializeApp(): void {
        const appService: AppService = this.appContext.getMaterial(AppService);
        const initializeFunction: InitializeFunction = this.appContext.getMaterial(InitializeFunction);
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.clear();

        setTimeout(() => {
            appService.initializeApp();
            initializeFunction.loadLastList();
            initializeFunction.loadSystemInformation();
        }, 1000);
    }

    public updateStatus() {
        const appService: AppService = this.appContext.getMaterial(AppService);
        appService.updateStatus();
    }

    private loadToken(account: string, password: string, back: (success: boolean, message?: string) => void): void {
        const loginBack = (data: any) => {
            let mark = false;
            if (!BaseUtil.isEmpty(data)) {
                const head = data.head;
                const info = data.info;
                if (info) {
                    if (info.success && data.body) {
                        const token = data.body.token;
                        const user = data.body.user;

                        mark = !BaseUtil.isEmpty(token);
                        if (mark) {
                            auth.setToken(token);
                        }
                        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
                        pb.setUser(user);
                    }
                }
            }
            back(mark);
        };
        PersonalClient.login(account, password, loginBack);
    }


    private loadServerAddress(back: (success: boolean, message?: string) => void) {
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(back);
    }


    private connect(back: (success: boolean, message?: string) => void) {
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        const connectService: ConnectService = this.appContext.getMaterial(ConnectService);
        const address = serverService.getAddress(ServerType.main, Protocol.WebSocket);
        if (!address || '0' === address.isEnabled) {
            back(false, '没有可用的服务器！');
        } else {
            connectService.connect(address.address, back);
        }
    }

    private auth(back: (success: boolean, message?: string) => void) {
        const dataBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        back(true, '');
                    } else {
                        back(false, '请求失败！');
                    }
                } else {
                    back(false, '请求失败！');
                }
            },
            timeOut(data: any): void {
                back(false, '请求超时！');
            },
            lost(data: any): void {
                back(false, '请求失败！');
            },
        } as AbstractDataBackAction;
        const token: string = auth.getToken();
        const sam: SystemAuthManager = this.appContext.getMaterial(SystemAuthManager);
        sam.auth(token, dataBack);
    }
}
