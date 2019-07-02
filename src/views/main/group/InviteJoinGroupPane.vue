<template>
    <Modal
            v-model="show"
            width="610"
            class="form-modal"
    >
        <div class="chat_item slide-left">
            <div class="avatar">
                <img class="img" :src="group.avatar" alt="">
            </div>
            <div class="info">
                <h3 class="nickname" style="color: #212223;">
                    <span class="nickname_text">{{group.name}}号码：{{group.number}}</span>
                </h3>
                <p class="msg" style="color: #9ab1c7;">
                    <span class="">{{group.introduce}}</span>
                </p>
            </div>
        </div>
        <Transfer
                :data="sourceList"
                :target-keys="targetKeys"
                :list-style="listStyle"
                :render-format="renderFormat"
                :operations="['','']"
                :titles="['用户列表','已选用户']"
                filterable
                @on-change="handleChange">
        </Transfer>
        <div slot="footer">
            <Button type="primary" @click="invite">确定</Button>
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import app from '@/app/App';
    import Group from '@/app/com/bean/Group';
    import GroupBox from '@/app/com/main/box/GroupBox';
    import UserBox from '@/app/com/main/box/UserBox';
    import User from '@/app/com/bean/User';
    import GroupInviteController from '@/app/com/main/controller/GroupInviteController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';

    @Component({
        components: {},
    })
    export default class InviteJoinGroupPane extends Vue {
        private show: boolean = false;
        private groupId: string = '';
        private group: Group = new Group();

        private text: string = '';
        private showSearch: boolean = false;

        private sourceList: any[] = [];
        private targetKeys: string[] = [];
        private listStyle = {
            width: '250px',
            height: '300px',
        };

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
            this.searchUser();
        }

        public onSearchChange(): void {
            const t = this.text;
            this.showSearch = this.text !== '';
        }

        private clearSearch() {
            this.text = '';
            this.showSearch = false;
        }

        private searchUser() {
            this.sourceList = [];
            this.targetKeys = [];
            const showList: any[] = [];
            const box: UserBox = app.appContext.getMaterial(UserBox);
            const list: User[] = box.getAllList();

            if (list) {
                for (const data of list) {
                    showList.push({
                        key: data.id,
                        label: data.nickname,
                        description: data.account,
                        disabled: false,
                    });
                }
            }
            this.sourceList = showList;
        }

        private renderFormat(item: any) {
            return item.label + ' - ' + item.description;
        }

        private handleChange(newTargetKeys: []) {
            this.targetKeys = newTargetKeys;
        }

        private invite() {
            const own = this;
            const groupId = this.groupId;
            const userIds = this.targetKeys;

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
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
            const groupInviteController: GroupInviteController = app.appContext.getMaterial(GroupInviteController);
            groupInviteController.invite(groupId, userIds, back);
        }
    }
</script>

<style scoped>

</style>
