<template>

    <q-card class="page-card">

        <q-card-section class="bg-main-theme text-white">
            <div class="text-h6">注册账号</div>
            <div class="text-subtitle2"></div>
        </q-card-section>

        <q-separator/>
        <div class="q-pa-md page-card-pane">
            <q-card>
                <q-form ref="form">
                    <q-card-section>
                        <q-input v-model="user.nickname"
                                 label="昵称 *"
                                 placeholder="请输入昵称"
                                 :rules="ruleValidate.nickname"
                        >
                        </q-input>
                        <q-input v-model="user.account"
                                 label="账号 *"
                                 placeholder="请输入账号"
                                 :rules="ruleValidate.account"
                        >

                        </q-input>
                        <q-input v-model="user.tempPassword"
                                 label="密码 *" type='password'
                                 placeholder="请输入密码"
                                 :rules="ruleValidate.tempPassword"
                        >
                        </q-input>
                        <q-input v-model="user.repeatPassword"
                                 label="确认密码 *"
                                 type='password'
                                 placeholder="请输入密码"
                                 :rules="ruleValidate.repeatPassword"
                        ></q-input>
                        <q-input v-model="user.mobile" label="手机" placeholder="请输入手机"
                                 :rules="ruleValidate.mobile"
                        ></q-input>
                        <q-input v-model="user.email" label="邮箱" placeholder="请输入邮箱"
                                 :rules="ruleValidate.email"
                        ></q-input>
                        <q-input v-model="user.name" label="姓名" placeholder="请输入姓名"
                                 :rules="ruleValidate.name"
                        ></q-input>

                        <div class="q-gutter-sm">
                            <label>性别</label>
                            <q-radio v-model="user.gender" val="1">男</q-radio>
                            <q-radio v-model="user.gender" val="2">女</q-radio>
                            <q-radio v-model="user.gender" val="3">保密</q-radio>
                        </div>
                        <q-input v-model="user.introduce"
                                 label="介绍"
                                 type="textarea"
                                 :autosize="{minRows: 2,maxRows: 5}"
                                 placeholder="请输入..."
                                 :rules="ruleValidate.introduce"
                        >
                        </q-input>
                    </q-card-section>
                    <q-separator vertical/>
                    <q-card-section>
                        <q-list bordered separator>
                            <q-item clickable v-ripple @click="addQuestion">
                                <q-item-section>添加密保问题</q-item-section>
                                <q-item-section avatar>
                                    <q-btn round color="primary" icon="fas fa-plus"/>
                                </q-item-section>
                            </q-item>

                            <template v-for="(item, index) in questionData.questions">
                                <q-slide-item>
                                    <q-item>
                                        <q-item-label>问题{{index + 1}}：</q-item-label>
                                        <q-item-section>
                                            <q-input v-model="item.question"
                                                     label="请输入问题"
                                                     :type="'text'"
                                                     lazy-rules
                                                     :rules="questionValidate.question"
                                                     :dense="true">
                                            </q-input>
                                            <q-input v-model="item.answer"
                                                     label="请输入答案"
                                                     :type="'text'"
                                                     lazy-rules
                                                     :rules="questionValidate.question"
                                                     :dense="true">
                                            </q-input>
                                        </q-item-section>
                                        <q-item-section avatar>
                                            <q-btn @click="removeQuestion(index)"
                                                   round color="warning"
                                                   icon="fas fa-times"/>
                                        </q-item-section>
                                    </q-item>
                                </q-slide-item>
                            </template>
                        </q-list>
                    </q-card-section>

                    <div style="margin-top: 20px;margin-bottom: 30px">
                        <q-btn @click="register" color="primary" :label="'确定'"/>
                        <q-btn @click="login" color="primary" label="返回" flat class="q-ml-sm"/>
                        <q-btn @click="reset" color="primary" :label=" '重置'" style="float: right"/>
                    </div>
                    <div style="height: 30px"></div>
                </q-form>
            </q-card>
        </div>
    </q-card>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import app from '@/app/App';
    import RegisterData from '@/app/com/main/module/business/account/data/RegisterData';
    import SecurityQuestion from '@/app/com/main/module/business/user/bean/SecurityQuestion';
    import QuestionData from '@/app/com/main/module/business/user/data/QuestionData';
    import AccountCall from '@/app/com/main/module/business/account/call/AccountCall';
    import StringUtil from '@/app/common/util/StringUtil';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import AccountController from '@/app/com/main/module/business/account/controller/AccountController';


    @Component({
        components: {},
    })
    export default class Register extends Vue {

        private user: RegisterData = new RegisterData();
        private questionData: QuestionData = new QuestionData();
        private validate: any = {
            validatePassword: (value: string) => {
                return new Promise((resolve, reject) => {
                    // no
                });
            },
            validatePasswordCheck: (value: string) => {
                return new Promise((resolve, reject) => {
                    // no
                });
            },
            isExistAccount: (value: string) => {
                return new Promise((resolve, reject) => {
                    if (!StringUtil.isAccount(value)) {
                        resolve('用户名仅支持中英文、数字和下划线,且不能为纯数字！');
                        return;
                    }
                    const client: AccountCall = app.appContext.getMaterial(AccountCall);
                    client.isExistAccount(value, (exist: boolean) => {
                        if (exist) {
                            resolve('账号已存在！');
                        } else {
                            resolve(true);
                        }
                    });
                });
            },
            isExistEmail: (value: string) => {
                return new Promise((resolve, reject) => {
                    if (!BaseUtil.isEmpty(value)) {
                        const client: AccountCall = app.appContext.getMaterial(AccountCall);
                        client.isExistEmail(value, (exist: boolean) => {
                            if (exist) {
                                resolve('邮箱已注册！');
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                });
            },
            isExistMobile: (value: string) => {
                return new Promise((resolve, reject) => {
                    if (!BaseUtil.isEmpty(value)) {
                        if (!StringUtil.isMobile(value)) {
                            resolve('手机格式不正确！');
                            return;
                        }
                        const client: AccountCall = app.appContext.getMaterial(AccountCall);
                        client.isExistMobile(value, (exist: boolean) => {
                            if (exist) {
                                resolve('手机已注册！');
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                });
            },
        };


        private ruleValidate = {
            nickname: [
                (val: any) => val && val.length > 0 || '不能为空',
                (val: any) => (!val || (val && val.length <= 80)) || '不能大于80位',
            ],
            account: [
                (val: any) => val && val.length >= 4 || '不能小于4空',
                (v: any) => (!/^[0-9]*$/.test(v) || '不能纯数字'),
                (v: any) => (/^[\u4E00-\u9FA5-_A-Za-z0-9]+$/.test(v) || '4-16位字母数字组合或者字母、下划线'),
                (val: any) => (!val || (val && val.length <= 30)) || '不能大于30位',
                this.validate.isExistAccount,
            ],
            tempPassword: [
                (val: any) => val && val.length > 0 || '不能为空',
                (val: any) => (!val || (val && val.length <= 30)) || '不能大于30位',
            ],
            repeatPassword: [
                (val: any) => val && val.length > 0 || '不能为空',
                (val: any) => (!val || (val && val.length <= 30)) || '不能大于30位',
                (val: any) => val === this.user.tempPassword || '两次密码不匹配',
            ],
            email: [
                this.validate.isExistEmail,
            ],
            mobile: [
                this.validate.isExistMobile,
            ],
            name: [
                (val: any) => (!val || (val && val.length <= 180)) || '不能大于180位',
            ],
            introduce: [
                (val: any) => (!val || (val && val.length <= 200)) || '不能大于200位',
            ],
        };
        private questionValidate = {
            question: [
                (val: any) => val && val.length > 0 || '不能为空',
                (val: any) => (!val || (val && val.length <= 80)) || '不能大于80位',
            ],
        };

        public mounted() {
            this.initQuestions();
        }

        private initQuestions(): void {
            // TODO
        }

        private register(): void {

            const own = this;
            const back: (success: boolean) => void = (success: boolean) => {
                if (success) {
                    this.reset();
                    this.$Notice.success({
                        title: '成功',
                        desc: '注册成功',
                    });
                }
            };
            const controller: AccountController = app.appContext.getMaterial(AccountController);
            const user = this.user;
            const questions = this.questionData.questions;


            const formName = 'form';
            const form: any = this.$refs[formName];
            form.validate().then((success: boolean) => {
                if (success) {
                    controller.register(user, questions, back);
                } else {
                    // 哦，不，用户至少
                    // 填写了一个无效值
                }
            });
        }

        private reset() {
            const formName = 'form';
            const form: any = this.$refs[formName];
            form.resetValidation();
            this.user = new RegisterData();
            this.questionData = new QuestionData();
        }

        private login(): void {
            this.$router.push({path: '/login'});
        }

        private addQuestion(): void {
            const length = this.questionData.questions.length;
            if (length < 3) {
                this.questionData.questions.push(new SecurityQuestion());
            }
        }

        private removeQuestion(index: number): void {
            this.questionData.questions.splice(index, 1);
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/styles/oim/oim.variables';

    .page-card {
        width: 100%;
        height: 100%;
    }

    .page-card-pane {
        position: absolute;
        width: 100%;
        top: 90px;
        bottom: 0;
        overflow-y: auto;
    }

    .bg-main-theme {
        background-color: $oim-main-theme-color;
    }
</style>
