<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>修改信息</span>
        </p>
        <div style="width: 100%;height: 100%">
            <Form ref="userForm" :model="user" :rules="ruleValidate" :label-width="80">
                <Form-item>
                    <div @click='handleOpenUpdateHead' class="avatar">
                        <Avatar :src="user.avatar" size="large"/>
                    </div>
                </Form-item>
                <Form-item label="昵称" prop="nickname">
                    <Input v-model="user.nickname" placeholder="请输入昵称"></Input>
                </Form-item>
                <Form-item label="账号">
                    <label>{{user.account}}</label>
                </Form-item>
                <Form-item label="签名">
                    <Input v-model="user.signature" placeholder="签名"></Input>
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
                <Form-item label="出生日期">
                    <DatePicker :value="user.birthDate" format="yyyy-MM-dd" type="date" placeholder="选择"
                                style="width: 200px"></DatePicker>
                </Form-item>
                <Form-item label="家庭地址">
                    <Input v-model="user.homeAddress" placeholder="家庭地址"></Input>
                </Form-item>
                <Form-item label="家庭地址">
                    <Input v-model="user.locationAddress" placeholder="所在地址"></Input>
                </Form-item>
                <Form-item label="介绍" prop="introduce">
                    <Input v-model="user.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </Form-item>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleUpdate">确定</Button>
        </div>
        <UpdateHeadPane ref='updateHeadView' @on-done="updateHeadDone"></UpdateHeadPane>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import UpdateHeadPane from '@/views/main/personal/UpdateHeadPane.vue';

    import app from '@/app/App';
    import PersonalController from '@/app/com/main/controller/PersonalController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';
    import User from '@/app/com/bean/User';
    import PersonalBox from '@/app/com/main/box/PersonalBox';

    @Component({
        components: {
            UpdateHeadPane,
        },
    })
    export default class UpdateData extends Vue {
        private show: boolean = false;
        private user: User = new User();
        private ruleValidate: object = {
            nickname: [
                {required: true, message: '昵称不能为空', trigger: 'blur'},
            ],
            email: [
                {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            ],
        };

        private formName: string = 'userForm';

        public mounted() {
            // no
        }

        public setShow(show: boolean): void {
            this.show = show;
            this.loadData();
        }

        private loadData() {
            const pb: PersonalBox = app.appContext.getMaterial(PersonalBox);
            const user: User = pb.getUser();
            this.setUser(user);
        }

        private setUser(user: User) {
            this.user = user;
        }

        private handleUpdate(): void {
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
            const user: User = new User();
            Object.assign(user, this.user);
            form.validate((valid: boolean) => {
                if (valid) {
                    pc.updateUser(user, back);
                }
            });
        }

        private handleOpenUpdateHead() {
            const viewName = 'updateHeadView';
            const view: any = this.$refs[viewName];
            view.setShow(true);
        }

        private updateHeadDone(url: string) {
            this.user.avatar = url;
        }
    }
</script>

<style scoped>

</style>
