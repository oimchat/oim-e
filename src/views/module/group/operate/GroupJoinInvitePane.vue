<template>
    <Modal
            v-model="show"
            width="610"
            class="form-modal"
    >
        <div class="icon-info-item slide-left">
            <div class="avatar">
                <img class="img" :src="group.avatar" alt="">
            </div>
            <div class="info">
                <h3 class="nickname" style="color: #212223;">
                    <span class="nickname-text">{{group.name}}号码：{{group.number}}</span>
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
    import Group from '@/app/com/main/module/business/group/bean/Group';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import UserBox from '@/app/com/main/module/business/user/box/UserBox';
    import User from '@/app/com/main/module/business/user/bean/User';
    import GroupInviteController from '@/app/com/main/module/business/group/controller/GroupInviteController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';

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
    .icon-info-item {
        overflow: hidden;
        padding: 12px 18px 11px;
        /*border-bottom: 1px solid #647481;*/
        cursor: pointer;
        position: relative
    }

    .icon-info-item.top {
        background-color: #2e3641
    }

    .icon-info-item.active {
        background: #314050
    }

    .icon-info-item.active .ext, .icon-info-item.active .info .msg {
        color: #fff
    }

    .icon-info-item .avatar {
        float: left;
        margin-right: 10px;
        position: relative
    }

    .icon-info-item .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .icon-info-item .avatar .icon {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #fff;
        font-style: normal;
        font-size: 12px;
        text-align: center
    }

    .icon-info-item .info {
        overflow: hidden
    }

    .icon-info-item .info .nickname {
        font-weight: 400;
        font-size: 13px;
        color: #fff;
        line-height: 20px
    }

    .icon-info-item .info .nickname-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .icon-info-item .info .nickname_count, .icon-info-item .info .nickname-text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top
    }

    .icon-info-item .info .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em
    }

    .icon-info-item .ext {
        float: right;
        color: #6b6f7c;
        font-size: 13px;
        text-align: right
    }

    .icon-info-item .ext .attr {
        height: 19px;
        line-height: 1.5
    }
</style>
