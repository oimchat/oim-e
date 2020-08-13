<template>
    <div class="only-full-pane">
        <div class="only-card only-full-pane">
            <div class="top">
                <div class="title-wrap">
                    <div class="title">群详细信息</div>
                    <div></div>
                </div>
            </div>
            <div class="content only-full-pane only-scrollbar-y">

                <div v-if="model.hasGroup" class="">
                    <div class="oim-info">
                        <div class="oim-avatar-wrap">
                            <div class="oim-avatar">
                                <img class="img only-shadow" :src="model.group.avatar" alt="">
                            </div>
                        </div>
                        <div class="oim-nickname-area">
                            <h4 class="oim-nickname">{{model.group.name}}</h4>
                        </div>
                        <p class="oim-signature">{{model.group.introduce}}</p>
                        <div class="only-center-pane">
                            <div class="oim-meta-area-pane compatible">
                                <div class="oim-meta-area-item">
                                    <label class="label ">备注：{{model.relation.remark}}
                                        <a v-if="model.isJoin">
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                            <q-popup-edit v-model="model.relation.remark"
                                                          @save="setRemark"
                                            >
                                                <template
                                                        v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                                                    <q-input
                                                            autofocus
                                                            dense
                                                            :value="model.relation.remark"
                                                            hint="备注"
                                                            @input="emitValue"
                                                    >
                                                        <template v-slot:after>
                                                            <q-btn flat dense color="negative" icon="cancel"
                                                                   @click.stop="cancel"/>
                                                            <q-btn flat dense color="positive" icon="check_circle"
                                                                   @click.stop="set"/>
                                                        </template>
                                                    </q-input>
                                                </template>
                                            </q-popup-edit>
                                        </a>
                                    </label>
                                </div>
                                <div class="oim-meta-area-item">
                                    <label class="label ">号码：{{model.group.number}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="oim-action-area">
                            <a @click="openSend" class="oim-primary-button" href="#">发消息</a>
                        </div>
                    </div>
                </div>
                <div v-if="!model.hasGroup" class="only-table-pane only-full-pane">
                    <div class="only-table-pane-cell">
                        <div>
                            <img :src="noLogo" height="128" width="128"/>
                            <i class="no_one_icon"></i>
                            <p class="">未选择</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Drawer title="更多" width="340" :mask="true" :closable="true" v-model="showMore">
            <div v-if='showMore'>
                <GroupJoinSettingPane :groupId='groupId'></GroupJoinSettingPane>
            </div>
        </Drawer>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import GroupJoinSettingPane from '@/views/module/group/GroupJoinSettingPane.vue';
    import GroupMemberContextMenu from '@/views/module/group/member/menu/GroupMemberContextMenu.vue';

    import Group from '@/app/com/main/module/business/group/bean/Group';
    import GroupRelation from '@/app/com/main/module/business/group/bean/GroupRelation';
    import app from '@/app/App';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
    import User from '@/app/com/main/module/business/user/bean/User';
    import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
    import GroupRelationController from '@/app/com/main/module/business/group/controller/GroupRelationController';
    import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
    import CommonIcon from '@/platform/web/common/CommonIcon';

    import groupInfoViewModel from '@/platform/vue/view/model/GroupInfoViewModel';

    @Component({
        components: {
            GroupJoinSettingPane,
        },
    })
    export default class GroupInfoPane extends Vue {
        private model = groupInfoViewModel;
        private noLogo = CommonIcon.noLogo;
        private showList: boolean = false;
        private showMore: boolean = false;


        public setGroupId(groupId: string) {
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const contactListBox: GroupRelationBox = app.appContext.getMaterial(GroupRelationBox);
            const group: Group = groupBox.getGroup(groupId);
            let relation: GroupRelation = new GroupRelation();
            const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);
            if (list && list.length > 0) {
                relation = list[0];
            }
            this.setGroup(group, relation);
        }

        public setGroup(group: Group, relation: GroupRelation) {
            this.model.setGroup(group);
            this.model.setRelation(relation);
        }


        private getNickname(user: User): string {
            const service: GroupMemberService = app.appContext.getMaterial(GroupMemberService);
            const groupId = this.model.groupId;
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
            const groupId = this.model.groupId;
            this.onOpenSend(groupId);
        }

        @Emit('on-to-send')
        private onOpenSend(key: string) {
            // no
        }

        private setRemark(text: string) {
            const own = this;
            const groupId = this.model.groupId;
            const oldRemark = (this.model.relation) ? this.model.relation.remark : '';
            if (!text) {
                return;
            }

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                own.model.relation.remark = text;
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
            ccc.updateRemark(groupId, text, back);
        }

        private memberContextMenu(e: MouseEvent, user: User) {
            const groupId = this.model.groupId;
            const userId = user.id;
            const menuName = 'groupMemberContextMenu';
            const menu: any = this.$refs[menuName];
            menu.show(e, groupId, userId);
        }
    }
</script>

<style scoped>

</style>
