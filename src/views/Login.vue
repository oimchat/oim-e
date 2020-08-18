<template>
    <div class="login-page" @keyup.enter="login">
        <div class="login-pane">
            <div class="login-logo">
                <q-avatar size="110px" class="shadow-9">
                    <img :src="model.data.avatar"/>
                </q-avatar>
            </div>
            <div v-show="!model.hasLogin" class="login-info">
                <q-form ref="form">
                    <q-input v-model="model.data.account"
                             label="请输入账号、手机、邮箱"
                             lazy-rules
                             :rules="[ val => val && val.length > 0 || '请输入账号']"
                             :dense="false">
                        <template v-slot:prepend>
                            <q-icon name="fas fa-user-circle"/>
                        </template>
                    </q-input>
                    <q-input v-model="model.data.password"
                             label="请输入密码"
                             :type="isPassword ? 'password' : 'text'"
                             lazy-rules
                             :rules="[ val => val && val.length > 0 || '请输入密码']"
                             :dense="false">
                        <template v-slot:prepend>
                            <q-icon name="fas fa-lock"/>
                        </template>
                        <template v-slot:append>
                            <q-icon
                                    :name="isPassword ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPassword = !isPassword"
                            />
                        </template>
                    </q-input>
                    <div v-show="model.isLoginSaveSupport" class="login-info-box">
                        <div style="float: left;margin-left: -18px">
                            <q-checkbox v-model="model.data.savePassword"
                                        @input="model.savePasswordChange()"
                                        label="记住密码"
                                        color="teal"/>
                        </div>
                        <div style="margin-left: 20px">
                            <q-checkbox v-model="model.data.autoLogin"
                                        @input="model.autoLoginChange()"
                                        label="自动登录"
                                        color="teal"/>
                        </div>
                    </div>

                    <div class="login-button-box">
                        <div class="login-action-button-container login-bottom">
                            <div class="login-action-button-wrap">
                                <div class="login-action-button-background"></div>
                                <button @click="login()" type="button" class="login-action-button">登 录</button>
                            </div>
                        </div>
                    </div>

                    <div class="login-bottom-setting">
                        <div style="float: left;">
                            <a @click="register" class="login-register" href="javascript:">立即注册</a>
                        </div>
                        <div style="float: right;">
                            <a @click="resetPassword" class="login-forget" href="javascript:">忘记密码？</a>|
                            <a @click="setting" class="login-forget" href="javascript:">设置</a>
                        </div>
                    </div>

                </q-form>
            </div>
            <div v-show="model.hasLogin" class="login-info">
                <h3>登录中</h3>
                <div style="vertical-align: middle; text-align: center; margin-top: 30px;">
                    <div>
                        <img src="../images/login/loading_312_4.gif" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import '../styles/oim/login.scss';
import Vue from 'vue';
import Component from 'vue-class-component';
import app from '@/app/App';
import AppSettingManager from '@/app/com/client/module/setting/manager/AppSettingManager';
import ServerService from '@/app/com/main/module/business/server/service/ServerService';
import loginViewModel from '@/platform/vue/view/model/LoginViewModel';
import {Dialog} from 'quasar';

@Component({})
export default class Login extends Vue {
    public onLogin: (success: boolean, message?: string) => void = (
        (success: boolean, message?: string) => {
            if (message) {
                this.$Notice.warning({
                    desc: message,
                });
            }
            if (success) {
                this.toMain();
            }
        }
    );

    private model = loginViewModel;
    private url: string = '';
    private isPassword: boolean = true;

    public mounted() {
        // no
        loginViewModel.onLogin = this.onLogin;
        loginViewModel.initialize();
    }


    private login(): void {
        const own = this;
        const back = this.onLogin;
        const form: any = this.$refs.form;
        form.validate().then((success: boolean) => {
            if (success) {
                loginViewModel.login(
                    () => {
                        return true;
                    },
                    back);
            } else {
                // 哦，不，用户至少
                // 填写了一个无效值
            }
        });
    }

    private setting(): void {
        const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
        const url = asm.getServerUrl();

        const addressBack = (success: boolean, message?: string) => {
            if (!success) {
                app.prompt('获取服务器地址失败！请检查网络是否正常');
            }
        };
        const serverService: ServerService = app.appContext.getMaterial(ServerService);
        Dialog.create({
            title: '设置',
            message: '请输入服务器地址',
            prompt: {
                model: url,
                type: 'text', // optional
            },
            cancel: true,
            persistent: true,
        }).onOk((data: any) => {
            if ('' !== data && null !== data) {
                asm.setServerUrl(data);
                serverService.loadServerAddress(addressBack);
            }
            // console.log('>>>> OK, received', data)
        }).onCancel(() => {
            // console.log('>>>> Cancel')
        }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
        });


        // this.$Modal.confirm({
        //     title: '设置服务地址',
        //     render: (h: any) => {
        //         return h('Input', {
        //             props: {
        //                 value: url,
        //                 autofocus: true,
        //                 placeholder: '设置服务地址',
        //             },
        //             on: {
        //                 input: (text: string) => {
        //                     url = text;
        //                 },
        //             },
        //         });
        //     },
        //     onOk: () => {
        //         if ('' !== url && null !== url) {
        //             asm.setServerUrl(url);
        //             serverService.loadServerAddress(addressBack);
        //         }
        //     },
        //     onCancel: () => {
        //         // no
        //     },
        // });
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

<style scoped>
    .items-center {
        margin-left: 10px;
    }
</style>
