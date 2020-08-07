<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>修改密码</span>
        </p>
        <div style="width: 100%;height: 100%">
            <Form ref="dataForm" :model="passwordData" :rules="ruleValidate" :label-width="80">
                <Form-item label="旧密码" prop="oldPassword">
                    <Input v-model="passwordData.oldPassword" type='password' placeholder="请输入密码"></Input>
                </Form-item>
                <Form-item label="新密码" prop="tempPassword">
                    <Input v-model="passwordData.tempPassword" type='password' placeholder="请输入密码"></Input>
                </Form-item>
                <Form-item label="确认密码" prop="repeatPassword">
                    <Input v-model="passwordData.repeatPassword" type='password' placeholder="请输入密码"></Input>
                </Form-item>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="updatePassword">确定</Button>
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import app from '@/app/App';
    import PersonalController from '@/app/com/main/module/business/personal/controller/PersonalController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';

    @Component({
        components: {},
    })
    export default class UpdatePassword extends Vue {
        private show: boolean = false;
        private passwordData = {
            oldPassword: '',
            tempPassword: '',
            repeatPassword: '',
        };
        private formName: string = 'dataForm';

        private validate: any = {
            validatePassword: (rule: any, value: string, callback: (data?: any) => any) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passwordData.tempPassword !== '') {
                        // 对第二个密码框单独验证
                        const form: any = this.$refs[this.formName];
                        form.validateField('repeatPassword');
                    }
                    callback();
                }
            },
            validatePasswordCheck: (rule: any, value: string, callback: (data?: any) => any) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordData.tempPassword) {
                    callback(new Error('两次密码不匹配'));
                } else {
                    callback();
                }
            },
        };

        private ruleValidate: object = {
            oldPassword: [
                {required: true, trigger: 'blur', message: '不能为空！'},
            ],
            tempPassword: [
                {validator: this.validate.validatePassword, required: true, trigger: 'blur'},
            ],
            repeatPassword: [
                {validator: this.validate.validatePasswordCheck, required: true, trigger: 'blur'},
            ],
        };

        public mounted() {
            // no
        }

        public setShow(show: boolean): void {
            this.show = show;
        }


        private updatePassword(): void {
            const own = this;
            const pc: PersonalController = app.appContext.getMaterial(PersonalController);
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                own.$Notice.success({
                                    title: '成功',
                                    desc: '修改成功',
                                });
                                own.setShow(false);
                            } else {
                                Prompt.message(info, '', '');
                            }
                        }
                    }
                },
                lost(data: any): void {
                    Prompt.notice('请求失败！');
                },
                timeOut(data: any): void {
                    Prompt.notice('请求超时！');
                },
            } as DataBackAction;


            const form: any = this.$refs[this.formName];

            const newPassword = this.passwordData.tempPassword;
            const oldPassword = this.passwordData.oldPassword;

            form.validate((valid: boolean) => {
                if (valid) {
                    pc.updatePassword(oldPassword, newPassword, back);
                }
            });
        }
    }
</script>

<style scoped>

</style>
