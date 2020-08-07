import {Md5} from 'md5-typescript';

import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ServerService from '@/app/com/main/module/business/server/service/ServerService';
import PersonalCall from '@/app/com/main/module/business/personal/call/PersonalCall';
import BaseUtil from '@/app/lib/util/BaseUtil';
import ConnectService from '@/app/com/main/module/business/contact/service/ConnectService';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';
import auth from '@/app/common/auth/Auth';
import SystemAuthManager from '@/app/com/main/module/business/system/manager/SystemAuthManager';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import DataBackAction from '@/app/base/net/DataBackAction';
import AppService from '@/app/com/main/module/business/index/service/AppService';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import Client from '@/app/base/message/client/Client';
import LoginData from '@/app/com/main/module/business/index/data/LoginData';
import LoginUser from '@/app/com/main/module/business/index/data/LoginUser';
import LoginSaveBox from '@/app/com/main/module/business/index/box/login/LoginSaveBox';
import EnterInitializerBox from '@/app/com/main/initialize/EnterInitializerBox';
import LoginSaveInfo from '@/app/com/main/module/business/index/box/login/LoginSaveInfo';
import User from '@/app/com/main/module/business/user/bean/User';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import ObjectUtil from '@/app/common/util/ObjectUtil';


export default class LoginController extends AbstractMaterial {
    public onReconnect: () => void = (() => {
        //  no
    });

    public login(loginUser: LoginUser, back: (success: boolean, message?: string) => void): void {

        const own = this;

        const account: string = loginUser.account;
        const password: string = loginUser.password;
        const securityPassword = Md5.init(password);

        const authBack = (success: boolean, message?: string) => {
            if (success) {
                auth.setLogin(true);
                auth.setAccount(account);
                auth.setPassword(securityPassword);

                this.saveLoginInfo(loginUser);
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
            const account = auth.getAccount();
            const password = auth.getPassword();
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
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const user: User = pb.getUser();
        const avatar: string = UserInfoUtil.getHeadImage(user);
        const info: LoginSaveInfo = new LoginSaveInfo();
        ObjectUtil.copyByTargetKey(info, data);
        info.avatar = avatar;

        const loginSaveBox: LoginSaveBox = this.appContext.getMaterial(LoginSaveBox);
        loginSaveBox.save(info);
    }

    public reAuth(): void {
        const isLogin = auth.isLogin();
        if (isLogin) {
            const account = auth.getAccount();
            const password = auth.getPassword();
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

    public initializeServerAddress() {
        const serverService: ServerService = this.appContext.getMaterial(ServerService);
        serverService.loadServerAddress(() => {
            // no
        });
    }

    public initializeApp(): void {
        const enterInitializerBox: EnterInitializerBox = this.appContext.getMaterial(EnterInitializerBox);
        enterInitializerBox.initialize();
    }

    public updateStatus() {
        const appService: AppService = this.appContext.getMaterial(AppService);
        appService.updateStatus();
    }

    private loadToken(account: string, password: string, back: (success: boolean, message?: string) => void): void {
        const loginBack = (data: any) => {
            let mark = false;
            const m = '';
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
                }
            }
            back(mark, m);
        };
        const loginData: LoginData = new LoginData();
        loginData.user.account = account;
        loginData.user.password = password;
        const client: PersonalCall = this.appContext.getMaterial(PersonalCall);
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
