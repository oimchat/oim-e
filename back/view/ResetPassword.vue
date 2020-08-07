<template>
    <div style="width: 100%;height: 100%">
        <Card style="width: 100%;height: 100%">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                重置密码
            </p>
            <Steps :current="current">
                <Step title="输入账号" content="输入登录账号，获取密保问题"></Step>
                <Step title="回答密保问题" content="回答密保问题重置密码"></Step>
            </Steps>
            <div v-if='current==0' style="float: right;width: calc(50% + 260px);height: 100%">
                <Scroll :height="700" style="width: 100%;height: 100%">
                    <div style="width: 520px">
                        <Form :label-width="80">
                            <Form-item label="账号">
                                <Input v-model="account" type='text' placeholder="请输入账号"></Input>
                            </Form-item>
                        </Form>
                        <Form :label-width="80" style="width: 300px">
                            <Form-item>
                                <Button @click='getQuestions' type="primary">确定</Button>
                                <Button @click="login" type="primary" style="margin-left: 8px">返回</Button>
                            </Form-item>
                        </Form>
                    </div>
                </Scroll>
            </div>
            <div v-if='current==1' style="float: right;width: calc(50% + 260px);height: 100%">
                <div style="width: 520px">
                    <Form ref="user" :model="user" :rules="ruleValidate" :label-width="80">
                        <Form-item label="密码" prop="tempPassword">
                            <Input v-model="user.tempPassword" type='password' placeholder="请输入密码"></Input>
                        </Form-item>
                        <Form-item label="确认密码" prop="repeatPassword">
                            <Input v-model="user.repeatPassword" type='password' placeholder="请输入密码"></Input>
                        </Form-item>
                    </Form>
                    <Form ref="questionData" :model="questionData" :label-width="80" style="width: 500px">
                        <Row v-for="(item, index) in questionData.questions" :key="index">
                            <FormItem
                                    :key="'question'+index"
                                    :label="'问题'+(index+1)"
                                    :prop="'questions.' + index + '.question'"
                                    :rules="{required: true, message: '不能为空！', trigger: 'blur'}">
                                <Row>
                                    <Col span="18">
                                        <span>
                                            密保问题:
                                        </span>
                                        <label>
                                            {{item.question}}
                                        </label>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                    :key="'answer'+index"
                                    :label="'答案'+(index+1)"
                                    :prop="'questions.' + index + '.answer'"
                                    :rules="{required: true, message: '不能为空！', trigger: 'blur'}">
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.answer"
                                               placeholder="密保答案"></Input>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Row>
                    </Form>
                    <Form :label-width="80" style="width: 300px">
                        <Form-item>
                            <Button @click='updatePassword' type="primary">确定</Button>
                            <Button @click="setCurrent(0)" type="primary" style="margin-left: 8px">返回</Button>
                            <Button @click="login" type="primary" style="margin-left: 8px">去登录</Button>
                        </Form-item>
                    </Form>
                </div>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import RegisterData from '../../src/app/com/main/module/business/account/data/RegisterData';
    import QuestionData from '../../src/app/com/main/module/business/user/data/QuestionData';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import app from '@/app/App';
    import AccountController from '../../src/app/com/main/module/business/account/controller/AccountController';

    @Component({
        components: {},
    })
    export default class ResetPassword extends Vue {
        private current: number = 0;
        private account: string = '';
        private userId: string = '';
        private user: RegisterData = new RegisterData();
        private questionData: QuestionData = new QuestionData();
        private userFormName: string = 'user';
        private questionDataFormName: string = 'questionData';
        private validate: any = {
            validatePassword: (rule: any, value: string, callback: (data?: any) => any) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.tempPassword !== '') {
                        // 对第二个密码框单独验证
                        const form: any = this.$refs[this.userFormName];
                        form.validateField('repeatPassword');
                    }
                    callback();
                }
            },
            validatePasswordCheck: (rule: any, value: string, callback: (data?: any) => any) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.tempPassword) {
                    callback(new Error('两次密码不匹配'));
                } else {
                    callback();
                }
            },
        };

        private ruleValidate: object = {
            tempPassword: [
                {validator: this.validate.validatePassword, required: true, trigger: 'blur'},
            ],
            repeatPassword: [
                {validator: this.validate.validatePasswordCheck, required: true, trigger: 'blur'},
            ],
        };

        public mounted() {
            this.setCurrent(0);
        }

        private setCurrent(current: number): void {
            this.current = current;
        }

        private save(): void {
            this.$router.push({path: '/login'});
        }

        private getQuestions(): void {
            const own = this;
            const account = this.account;
            if (!account) {
                this.$Notice.warning({
                    title: '信息',
                    desc: '请输入账号',
                });
                return;
            }
            const getBack = (data: any) => {
                if (!BaseUtil.isEmpty(data)) {
                    const head = data.head;
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const userId = data.body.userId;
                            const list = data.body.items;
                            own.userId = userId;
                            own.questionData.questions = list;
                            own.setCurrent(1);
                        }
                    }
                }
            };
            const ac: AccountController = app.appContext.getMaterial(AccountController);
            ac.getSecurityQuestionList(account, getBack);
        }

        private updatePassword(): void {
            const own = this;
            const ac: AccountController = app.appContext.getMaterial(AccountController);
            const back: (success: boolean) => void = (success: boolean) => {
                if (success) {
                    // own.current = 1;
                    this.$Notice.success({
                        title: '成功',
                        desc: '修改成功',
                    });
                }
            };

            const user = this.user;
            const questions = this.questionData.questions;
            const questionDataForm: any = this.$refs[this.questionDataFormName];
            const userForm: any = this.$refs[this.userFormName];

            const size = questions.length;

            const userId = this.userId;
            const password = this.user.tempPassword;

            const userValidate = (valid: boolean) => {
                questionDataForm.validate((v: boolean) => {
                    if (v) {
                        ac.updatePassword(userId, password, questions, back);
                    }
                });
            };
            userForm.validate((valid: boolean) => {
                if (valid) {
                    userValidate(valid);
                }
            });
        }

        private login(): void {
            this.$router.push({path: '/login'});
        }
    }
</script>

<style scoped>

</style>
