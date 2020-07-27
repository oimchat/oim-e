import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerService from '@/app/com/main/service/ServerService';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ConnectService from '@/app/com/main/service/ConnectService';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import auth from '@/app/common/auth/Auth';
import SystemAuthManager from '@/app/com/main/manager/SystemAuthManager';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import DataBackAction from '@/app/base/net/DataBackAction';
import AppService from '@/app/com/main/service/AppService';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import MessageListView from '@/app/com/main/view/MessageListView';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import Client from '@/app/base/message/client/Client';
import LoginData from '@/app/com/data/LoginData';
import InitializeConverge from '@/app/com/main/converge/InitializeConverge';
import InfoUtil from '@/app/base/message/util/InfoUtil';
import LoginUser from '@/app/com/data/LoginUser';
import LoginSaveBox from '@/app/com/main/box/LoginSaveBox';
import SecurityUtil from '@/app/com/main/util/SecurityUtil';


export default class LoginController extends AbstractMaterial {
    public onReconnect: () => void = (() => {
        //  no
    });

    public login(account: string, password: string, back: (success: boolean, message?: string) => void): void {

        const own = this;
        const securityPassword = Md5.init(password);

        const authBack = (success: boolean, message?: string) => {
            if (success) {
                auth.setLogin(true);
                auth.account = account;
                auth.password = securityPassword;
                const data: LoginUser = new LoginUser();
                data.account = account;
                data.password = SecurityUtil.en(password);
                this.saveLoginInfo(data);
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

        const loginBack = (success: boolean, message?: string) => {

            if (!success) {
                back(success, message);
            } else {
                this.connect(connectBack);
            }
        };

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                back(success, message);
            } else {
                this.loadToken(account, securityPassword, loginBack);
            }
        };
        this.loadServerAddress(addressBack);
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

            const loginBack = (success: boolean, message?: string) => {
                if (!success) {
                    tempBack(success, message);
                } else {
                    this.connect(connectBack);
                }
            };
            const addressBack = (success: boolean, message?: string) => {
                if (!success) {
                    tempBack(success, message);
                } else {
                    this.loadToken(account, password, loginBack);
                }
            };
            this.loadServerAddress(addressBack);
        }
    }

    public saveLoginInfo(data: LoginUser) {
        const loginSaveBox: LoginSaveBox = this.appContext.getMaterial(LoginSaveBox);
        loginSaveBox.save(data);
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
                    this.onReconnect();
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
        const initializeConverge: InitializeConverge = this.appContext.getMaterial(InitializeConverge);
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.clear();
        initializeConverge.initializeApp();
        setTimeout(() => {
            initializeConverge.loadLastList();
            initializeConverge.loadUnreadList();
            initializeConverge.loadSystemInformation();
        }, 1000);
    }

    public updateStatus() {
        const appService: AppService = this.appContext.getMaterial(AppService);
        appService.updateStatus();
    }

    private loadToken(account: string, password: string, back: (success: boolean, message?: string) => void): void {
        const loginBack = (data: any) => {
            let mark = false;
            let m = '';
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
                        auth.setUserId(user.id);
                        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
                        pb.setUser(user);
                    }
                    m = InfoUtil.getDefaultErrorText(info);
                }
            }
            back(mark, m);
        };
        const loginData: LoginData = new LoginData();
        loginData.user.account = account;
        loginData.user.password = password;
        const client: PersonalClient = this.appContext.getMaterial(PersonalClient);
        client.login(loginData, loginBack);
    }


    private loadServerAddress(back: (success: boolean, message?: string) => void) {
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(back);
    }


    private connect(back: (success: boolean, message?: string) => void) {
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        const connectService: ConnectService = this.appContext.getMaterial(ConnectService);
        const address = serverService.getAddress(ServerType.main, Protocol.WebSocket);
        if (!address || !address.enabled) {
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
        const client: Client = new Client();
        const token: string = auth.getToken();
        const sam: SystemAuthManager = this.appContext.getMaterial(SystemAuthManager);
        sam.auth(token, client, dataBack);
    }
}
