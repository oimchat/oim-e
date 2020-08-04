<template>
    <div style="height: 100%;" @keyup.enter="login">
        <div id="login_pane" class="login">
            <!--begin login_box-->
            <div class="login_box compatible">
                <div>
                    <!--begin info-->
                    <div :style="model.hasLogin?'display: none;':'display: block;'" class="login-box compatible">
                        <h3>用户登录</h3>
                        <div class="login-input-outer">
                            <div :class="hasAccount? '':'alert-validate'" data-validate="请输入账号">
                                <span class="login-user-icon"></span>
                                <input v-model="model.data.account" @blur='accountChange' class="login-text login-input"
                                       type="text" placeholder="请输入账号、手机、邮箱">
                                <span class="input-focus"></span>
                            </div>
                        </div>
                        <div class="login-input-outer">
                            <div :class="hasPassword? '':'alert-validate'" data-validate="请输入密码">
                                <span class="login-password-icon"></span>
                                <input v-model="model.data.password" @blur='passwordChange' class="login-text"
                                       type="password"
                                       placeholder="请输入密码">
                                <span class="input-focus"></span>
                            </div>
                        </div>
                        <div class="container-login-action-button login-bottom">
                            <div class="wrap-login-action-button">
                                <div class="login-action-button-background"></div>
                                <button @click="login()" class="login-action-button">登 录</button>
                            </div>
                        </div>
                        <p>&nbsp;</p>
                        <!--                        <p style="color:#000000">账号：10000-10010密码：123456</p>-->
                        <div>
                            <div style="float: left;">
                                <a @click="register" class="login-register" href="javascript:">立即注册</a>
                            </div>
                            <div style="float: right;">
                                <a @click="resetPassword" class="login-forget" href="javascript:">忘记密码？</a>|

                                <a @click="setting" class="login-forget" href="javascript:">设置</a>
                            </div>
                        </div>

                    </div>
                    <!--end info-->
                    <!--begin waiting-->
                    <div :style="hasLogin?'display: block;':'display: none;'" class="login-box compatible">
                        <h5>登录中</h5>
                        <div style="vertical-align: middle; text-align: center; margin-top: 30px;">
                            <div>
                                <img src="../images/login/loading_312_4.gif" alt=""/>
                            </div>
                        </div>
                    </div>
                    <!--end waiting-->
                </div>
            </div>
            <!--end login_box-->
            <!--begin lang-->
            <div class="lang">
                <div></div>
            </div>
            <!--end lang-->
            <!--begin copyright-->
            <div class="copyright">
                <p class="desc">© 2018 onlyxiahui Inc. All Rights Reserved</p>
            </div>
            <!--end copyright-->
        </div>
    </div>
</template>

<script lang="ts">
    import '../styles/login.css';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import app from '@/app/App';
    import AppSettingManager from '@/app/com/main/manager/AppSettingManager';
    import ServerService from '@/app/com/main/service/ServerService';
    import loginViewModel from '@/platform/vue/view/model/LoginViewModel';

    @Component({})
    export default class Login extends Vue {

        private model = loginViewModel;
        private hasAccount: boolean = true;
        private hasPassword: boolean = true;

        private hasLogin: boolean = false;

        public mounted() {
            // no
            loginViewModel.initialize();
        }

        private accountChange(): void {
            const own = this;
            const account: string = own.model.data.account;
            this.hasAccount = !BaseUtil.isEmpty(account);
        }

        private passwordChange(): void {
            const own = this;
            const password: string = own.model.data.password;
            this.hasPassword = !BaseUtil.isEmpty(password);
        }

        private login(): void {
            const own = this;
            const back = (success: boolean, message?: string): void => {
                if (message) {
                    this.$Notice.warning({
                        desc: message,
                    });
                }
                if (success) {
                    this.toMain();
                }
            };
            loginViewModel.login(
                () => {
                    return true;
                },
                back);
        }

        private setting(): void {
            const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
            let url = asm.getServerUrl();

            const addressBack = (success: boolean, message?: string) => {
                if (!success) {
                    app.prompt('获取服务器地址失败！请检查网络是否正常');
                }
            };
            const serverService: ServerService = app.appContext.getMaterial(ServerService);
            this.$Modal.confirm({
                title: '设置服务地址',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: url,
                            autofocus: true,
                            placeholder: '设置服务地址',
                        },
                        on: {
                            input: (text: string) => {
                                url = text;
                            },
                        },
                    });
                },
                onOk: () => {
                    if ('' !== url && null !== url) {
                        asm.setServerUrl(url);
                        serverService.loadServerAddress(addressBack);
                    }
                },
                onCancel: () => {
                    // no
                },
            });
        }

        private register(): void {
            this.$router.push({path: '/register'});
        }

        private resetPassword(): void {
            this.$router.push({path: '/reset.password'});
        }

        private toMain(): void {
            this.$router.push({path: '/main'});
        }
    }
</script>

<style>
</style>
