<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="text-align:center">
            <Icon type="ios-film-outline"></Icon>
            <span>修改群</span>
        </p>
        <div style="width: 100%;height: 100%">
            <Card>
                <div>
                    <Form ref="group" :model="group" :rules="ruleValidate" :label-width="80">
                        <Form-item>
                            <div @click='handleOpenUpdateHead' class="avatar">
                                <Avatar :src="group.avatar" size="large"/>
                            </div>
                        </Form-item>
                        <Form-item label="名称" prop="name">
                            <Input v-model="group.name" placeholder="请输入名称"></Input>
                        </Form-item>
                        <Form-item label="介绍" prop="introduce">
                            <Input v-model="group.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入..."></Input>
                        </Form-item>
                    </Form>
                </div>
            </Card>
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit">
                确定
            </Button>
        </div>
        <GroupUpdateHeadPane ref='updateHeadView' @on-done="updateHeadDone"></GroupUpdateHeadPane>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import GroupUpdateHeadPane from '@/views/module/group/info/GroupUpdateHeadPane.vue';
    import app from '@/app/App';
    import Group from '@/app/com/main/module/business/group/bean/Group';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import GroupBusinessController from '@/app/com/main/module/business/group/controller/GroupBusinessController';


    @Component({
        components: {
            GroupUpdateHeadPane,
        },
    })
    export default class UpdateGroupPane extends Vue {
        private show: boolean = false;
        private groupId: string = '';
        private group: Group = new Group();
        private groupFormName: string = 'group';

        private ruleValidate: object = {
            name: [
                {required: true, message: '名称不能为空', trigger: 'blur'},
            ],
        };

        public mounted() {
            // TODO
        }

        public setShow(show: boolean): void {
            this.show = show;
        }

        public setGroupId(groupId: string) {
            this.groupId = groupId;
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const group: Group = groupBox.getGroup(groupId);
            this.setGroup(group);
        }

        public setGroup(group: Group) {
            if (group) {
                this.group = group;
            } else {
                this.group = new Group();
            }
        }


        private handleSubmit(): void {
            const own = this;

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                own.$Notice.success({
                                    title: '成功',
                                    desc: '成功',
                                });
                                own.setShow(false);
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
            const groupBusinessController: GroupBusinessController = app.appContext.getMaterial(GroupBusinessController);
            const groupId = this.groupId;
            const group = this.group;

            const g = new Group();
            g.id = groupId;
            g.name = group.name;
            g.introduce = group.introduce;
            const groupForm: any = this.$refs[this.groupFormName];


            groupForm.validate((valid: boolean) => {
                if (valid) {
                    groupBusinessController.updateGroup(g, back);
                }
            });
        }

        private handleOpenUpdateHead() {
            const viewName = 'updateHeadView';
            const view: any = this.$refs[viewName];
            view.setGroupId(this.groupId);
            view.setShow(true);
        }

        private updateHeadDone(url: string) {
            this.group.avatar = url;
        }
    }
</script>

<style scoped>

</style>
