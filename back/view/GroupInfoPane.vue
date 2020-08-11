<template>
    <div class="box">
        <div class="box_hd with_border">
            <div class="title_wrap">
                <div class="title poi">
                    <a @click="handleShowList" style="cursor: pointer;" class="title_name">详细信息,点击查看群成员</a>
                    <i class="oim_chat_down_icon "></i>
                </div>
                <div v-if='isOwner' style="float: right">
                    <Icon @click="showMore = true" type="ios-arrow-dropdown"
                          style='font-size: 32px;cursor: pointer'/>
                </div>
            </div>
        </div>
        <div>
            <div v-if="showList" class="popup members_wrp slide-down" tabindex="-1" style="">
                <div class="members compatible">
                    <div class="members_inner">
                        <div v-for='item in groupMemberData.users' @contextmenu='memberContextMenu($event,item)'
                             class="member">
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
                    <div class="action_area">
                        <a @click="openSend" class="button" href="#">发消息</a>
                    </div>
                </div>
            </div>
            <div v-if="!showInfo" class="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style="position: absolute;">
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
        <Drawer title="更多" width="340" :mask="true" :closable="true" v-model="showMore">
            <div v-if='showMore'>
                <GroupJoinSettingPane :groupId='groupId'></GroupJoinSettingPane>
            </div>
        </Drawer>
        <GroupMemberContextMenu ref='groupMemberContextMenu'></GroupMemberContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import GroupJoinSettingPane from '@/views/module/group/GroupJoinSettingPane.vue';
    import GroupMemberContextMenu from '../../src/views/module/group/member/menu/GroupMemberContextMenu.vue';

    import groupChatViewModel from '../../src/platform/vue/view/model/GroupChatViewModel';

    import Group from '../../src/app/com/main/module/business/group/bean/Group';
    import GroupRelation from '../../src/app/com/main/module/business/group/bean/GroupRelation';
    import app from '@/app/App';
    import GroupBox from '../../src/app/com/main/module/business/group/box/GroupBox';
    import GroupRelationBox from '../../src/app/com/main/module/business/group/box/GroupRelationBox';
    import User from '../../src/app/com/main/module/business/user/bean/User';
    import UserBox from '../../src/app/com/main/module/business/user/box/UserBox';
    import GroupMemberSender from '../../src/app/com/main/module/business/group/sender/GroupMemberSender';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupMember from '../../src/app/com/main/module/business/group/bean/GroupMember';
    import GroupRelationController from '../../src/app/com/main/module/business/group/controller/GroupRelationController';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
    import GroupMemberListOfPersonalBox from '../../src/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
    import GroupMemberService from '../../src/app/com/main/module/business/group/service/GroupMemberService';

    @Component({
        components: {
            GroupJoinSettingPane,
            GroupMemberContextMenu,
        },
    })
    export default class GroupInfoPane extends Vue {
        private groupId: string = '';
        private group: Group = new Group();
        private relation: GroupRelation = new GroupRelation();

        private groupMemberData: {
            users: User[],
        } = {users: []};

        private showList: boolean = false;
        private remarkEdit: boolean = false;
        private showInfo: boolean = false;

        private showMore: boolean = false;
        private isOwner: boolean = false;

        public setGroupId(groupId: string) {
            this.groupId = groupId;
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const contactListBox: GroupRelationBox = app.appContext.getMaterial(GroupRelationBox);
            const group: Group = groupBox.getGroup(groupId);
            let relation: GroupRelation = new GroupRelation();
            const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);
            if (list && list.length > 0) {
                relation = list[0];
            }
            this.setGroup(group, relation);
            this.loadList();
            this.keyChange();
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


        private getNickname(user: User): string {
            const service: GroupMemberService = app.appContext.getMaterial(GroupMemberService);
            const groupId = this.groupId;
            let nickname = '';
            if (user) {
                nickname = service.getUserShowName(groupId, user);
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

        private loadList() {
            const groupId = this.groupId;
            this.groupMemberData.users = groupChatViewModel.getMemberUserList(groupId);
        }

        private keyChange(): void {
            // no
            // this.showList = false;
            this.showMore = false;

            const groupId = this.groupId;
            const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
            const position = personalGroupMemberListBox.getPosition(groupId);
            this.isOwner = (GroupMember.POSITION_OWNER === position);
        }

        private memberContextMenu(e: MouseEvent, user: User) {
            const groupId = this.groupId;
            const userId = user.id;
            const menuName = 'groupMemberContextMenu';
            const menu: any = this.$refs[menuName];
            menu.show(e, groupId, userId);
        }
    }
</script>

<style scoped>

</style>
