<template>
    <div style="width: 100%;height: 100%">
        <Card style="width: 100%;height: 100%">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                用户注册
            </p>
            <div style="float: right;width: calc(50% + 260px);height: 100%">
                <Scroll :height="450" style="width: 100%;height: 100%">
                    <div style="width: 520px">
                        <Form ref="user" :model="user" :rules="ruleValidate" :label-width="80">
                            <Form-item label="昵称" prop="nickname">
                                <Input v-model="user.nickname" placeholder="请输入昵称"></Input>
                            </Form-item>
                            <Form-item label="账号" prop="account">
                                <Input v-model="user.account" placeholder="请输入账号"></Input>
                            </Form-item>
                            <Form-item label="密码" prop="tempPassword">
                                <Input v-model="user.tempPassword" type='password' placeholder="请输入密码"></Input>
                            </Form-item>
                            <Form-item label="确认密码" prop="repeatPassword">
                                <Input v-model="user.repeatPassword" type='password' placeholder="请输入密码"></Input>
                            </Form-item>
                            <Form-item label="手机" prop="mobile">
                                <Input v-model="user.mobile" placeholder="请输入手机"></Input>
                            </Form-item>
                            <Form-item label="邮箱" prop="email">
                                <Input v-model="user.email" placeholder="请输入邮箱"></Input>
                            </Form-item>
                            <Form-item label="姓名">
                                <Input v-model="user.name" placeholder="请输入姓名"></Input>
                            </Form-item>
                            <Form-item label="性别" prop="gender">
                                <Radio-group v-model="user.gender">
                                    <Radio label="1">男</Radio>
                                    <Radio label="2">女</Radio>
                                    <Radio label="3">保密</Radio>
                                </Radio-group>
                            </Form-item>
                            <Form-item label="介绍" prop="introduce">
                                <Input v-model="user.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
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
                                            <Input type="text" v-model="item.question"
                                                   placeholder="密保问题"></Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Button @click="removeQuestion(index)">删除</Button>
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
                            <FormItem>
                                <Row>
                                    <Col span="12">
                                        <Button type="dashed" long @click="addQuestion" icon="md-add">新建密保问题</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                        <Form :label-width="80" style="width: 300px">
                            <Form-item>
                                <Button @click='register' type="primary">注册</Button>
                                <Button @click="login" type="primary" style="margin-left: 8px">返回</Button>
                                <Button @click="reset" style="margin-left: 8px">重置</Button>
                            </Form-item>
                        </Form>
                    </div>
                </Scroll>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import User from '@/app/com/bean/User';
    import RegisterData from '@/app/com/bean/RegisterData';
    import app from '@/app/App';
    import PersonalController from '@/app/com/main/controller/PersonalController';
    import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
    import QuestionData from '@/app/com/data/QuestionData';
    import AccountClient from '@/app/com/main/http/main/AccountClient';
    import StringUtil from '@/app/common/util/StringUtil';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import AccountController from '@/app/com/main/controller/AccountController';

    @Component({
        components: {},
    })
    export default class Register extends Vue {

        private user: RegisterData = new RegisterData();
        private questionData: QuestionData = new QuestionData();
        private userFormName: string = 'user';
        private questionDataFormName: string = 'questionData';
        private validate: any = {
            validatePassword: (rule: any, value: string, callback: (data?: any) => any) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.password !== '') {
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
            isExistAccount: (rule: any, value: string, callback: (data?: any) => any) => {
                if (!StringUtil.isAccount(value)) {
                    callback(new Error('用户名仅支持中英文、数字和下划线,且不能为纯数字！'));
                    return;
                }
                const client: AccountClient = app.appContext.getMaterial(AccountClient);
                client.isExistAccount(this.user.account, (exist: boolean) => {
                    if (exist) {
                        callback(new Error('账号已存在！'));
                    } else {
                        callback();
                    }
                });
            },
            isExistEmail: (rule: any, value: string, callback: (data?: any) => any) => {
                if (!BaseUtil.isEmpty(value)) {
                    const client: AccountClient = app.appContext.getMaterial(AccountClient);
                    client.isExistEmail(this.user.email, (exist: boolean) => {
                        if (exist) {
                            callback(new Error('邮箱已注册！'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            },
            isExistMobile: (rule: any, value: string, callback: (data?: any) => any) => {
                if (!BaseUtil.isEmpty(value)) {
                    if (!StringUtil.isMobile(value)) {
                        callback(new Error('手机格式不正确！'));
                        return;
                    }
                    const client: AccountClient = app.appContext.getMaterial(AccountClient);
                    client.isExistMobile(this.user.mobile, (exist: boolean) => {
                        if (exist) {
                            callback(new Error('手机已注册！'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            },
        };


        private ruleValidate: object = {
            nickname: [
                {required: true, message: '昵称不能为空', trigger: 'blur'},
            ],
            account: [
                {validator: this.validate.isExistAccount, required: true, trigger: 'blur'},
                {required: true, message: '账号不能为空', trigger: 'blur'},
            ],
            tempPassword: [
                {validator: this.validate.validatePassword, required: true, trigger: 'blur'},
            ],
            repeatPassword: [
                {validator: this.validate.validatePasswordCheck, required: true, trigger: 'blur'},
            ],
            email: [
                {validator: this.validate.isExistEmail, trigger: 'blur'},
                {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            ],
            mobile: [
                {validator: this.validate.isExistMobile, trigger: 'blur'},
            ],
        };

        public mounted() {
            this.initQuestions();
        }

        private initQuestions(): void {
            // TODO
        }

        private register(): void {
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
            const questionDataForm: any = this.$refs[this.questionDataFormName];
            const userForm: any = this.$refs[this.userFormName];

            const size = questions.length;

            const userValidate = (valid: boolean) => {
                if (size > 0) {
                    questionDataForm.validate((v: boolean) => {
                        if (v) {
                            controller.register(user, questions, back);
                        }
                    });
                } else {
                    controller.register(user, questions, back);
                }
            };
            userForm.validate((valid: boolean) => {
                if (valid) {
                    userValidate(valid);
                }
            });
        }

        private reset() {
            const userForm: any = this.$refs[this.userFormName];
            userForm.resetFields();
            const questionDataForm: any = this.$refs[this.questionDataFormName];
            questionDataForm.resetFields();
            this.questionData.questions = [];
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

<style scoped>

</style>
