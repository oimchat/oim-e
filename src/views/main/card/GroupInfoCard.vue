<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <div class="box " style="height: 400px">
            <div class="box_hd with_border">
                <div class="title_wrap">
                    <div style="cursor: pointer;" class="title">详细信息</div>
                </div>
            </div>
            <div>
                <div v-if="showList" class="popup members_wrp slide-down" tabindex="-1" style="">
                    <div class="members compatible">
                        <div class="members_inner">
                            <div v-for='item in users' class="member">
                                <img class="avatar" :src="item.avatar" alt="" :title="getNickname(item)">
                                <p class="nickname" style="text-align: center;">{{getNickname(item)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box_bd">
                <div v-if="showInfo" class="">
                    <div class="profile">
                        <div class="avatar">
                            <img class="img" :src="group.avatar" alt="">
                        </div>
                        <div class="nickname_area">
                            <h4 class="nickname">{{group.name}}</h4>
                        </div>
                        <p class="signature">{{group.introduce}}</p>
                        <div class="meta_area compatible">
                            <div class="meta_item">
                                <label class="label ">备注：{{relation.remark}}
                                    <a v-if="remarkEdit" @click="updateRemark">
                                        <i class="fa fa-edit" aria-hidden="true"></i>
                                    </a>
                                </label>
                            </div>
                            <div class="meta_item">
                                <label class="label ">号码：{{group.number}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!showInfo" class="scroll-wrapper box_bd chat_bd scrollbar-dynamic"
                     style="position: absolute;">
                    <div class="box_bd chat_bd scrollbar-dynamic scroll-content"
                         style="margin-bottom: 0px; margin-right: 0px; height: 369px;">
                        <div class="message_empty ">
                            <img src="../../../images/main/pane/no.png" height="128" width="128"/>
                            <i class="no_one_icon"></i>
                            <p class="">未选择</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">

        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import Group from '@/app/com/bean/Group';
    import GroupRelation from '@/app/com/bean/GroupRelation';
    import app from '@/app/App';
    import GroupBox from '@/app/com/main/box/GroupBox';
    import GroupListBox from '@/app/com/main/box/GroupListBox';
    import User from '@/app/com/bean/User';
    import UserBox from '@/app/com/main/box/UserBox';
    import GroupMemberSender from '@/app/com/main/sender/GroupMemberSender';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';
    import GroupMember from '@/app/com/bean/GroupMember';
    import GroupRelationController from '@/app/com/main/controller/GroupRelationController';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

    @Component({
        components: {},
    })
    export default class GroupInfoPane extends Vue {
        private show: boolean = false;
        private groupId: string = '';
        private group: Group = new Group();
        private relation: GroupRelation = new GroupRelation();
        private users: User[] = [];
        private groupMemberMap: Map<string, GroupMember> = new Map<string, GroupMember>();
        private showList: boolean = false;
        private remarkEdit: boolean = false;
        private showInfo: boolean = false;

        public setShow(show: boolean): void {
            this.show = show;
        }

        public setGroupId(groupId: string) {
            this.groupId = groupId;
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const contactListBox: GroupListBox = app.appContext.getMaterial(GroupListBox);
            const group: Group = groupBox.getGroup(groupId);
            let relation: GroupRelation = new GroupRelation();
            const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);
            if (list && list.length > 0) {
                relation = list[0];
            }
            this.setGroup(group, relation);
            // this.loadList();
        }

        public setGroup(group: Group, relation: GroupRelation) {
            if (group) {
                this.group = group;
                this.showInfo = true;
            } else {
                this.showInfo = false;
                this.group = new Group();
            }

            if (relation) {
                this.relation = relation;
                this.remarkEdit = true;
            } else {
                this.relation = new GroupRelation();
                this.remarkEdit = false;
            }
        }

        public setGroupMemberList(list: GroupMember[]) {
            this.groupMemberMap.clear();
            if (list) {
                for (const data of list) {
                    this.groupMemberMap.set(data.userId, data);
                }
            }
        }

        public setUserList(list: User[]) {
            if (list) {
                for (const data of list) {
                    UserInfoUtil.handleAvatar(data);
                }
                this.users = list;
            } else {
                this.users = [];
            }
        }

        public loadList() {
            const userBox: GroupBox = app.appContext.getMaterial(UserBox);
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const groupMemberSender: GroupMemberSender = app.appContext.getMaterial(GroupMemberSender);

            const groupId = this.groupId;


            const own = this;
            const userBack: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: User[] = data.body.list;
                                own.setUserList(list);
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


            const memberBack: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: GroupMember[] = data.body.list;
                                own.setGroupMemberList(list);
                                groupMemberSender.getGroupMemberUserList(groupId, userBack);
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
            groupMemberSender.getGroupMemberList(groupId, memberBack);
        }

        private getNickname(user: User): string {
            let nickname = '';
            if (user) {
                const userId = user.id;
                const data = this.groupMemberMap.get(userId);
                if (data) {
                    nickname = data.nickname;
                }
                if (!nickname || '' === nickname) {
                    nickname = user.nickname;
                }
            }
            return nickname;
        }

        private handleShowList() {
            this.showList = !this.showList;
        }

        private openSend() {
            const groupId = this.groupId;
            this.onOpenSend(groupId);
        }

        @Emit('on-to-send')
        private onOpenSend(key: string) {
            // no
        }


        private updateRemark(): void {
            const own = this;
            const groupId = this.groupId;
            const oldRemark = (this.relation) ? this.relation.remark : '';
            let text = '';

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                own.relation.remark = text;
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
            const ccc: GroupRelationController = app.appContext.getMaterial(GroupRelationController);


            this.$Modal.confirm({
                title: '修改备注',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: oldRemark,
                            autofocus: true,
                            placeholder: '输入备注',
                        },
                        on: {
                            input: (t: string) => {
                                text = t;
                            },
                        },
                    });
                },
                onOk: () => {
                    if (!text) {
                        text = '';
                    }
                    ccc.updateRemark(groupId, text, back);
                },
                onCancel: () => {
                    // no
                },
            });
        }
    }
</script>

<style scoped>

</style>
