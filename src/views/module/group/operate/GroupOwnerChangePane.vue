<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="text-align:center">
            <Icon type="ios-film-outline"></Icon>
            <span>转移群</span>
        </p>
        <div style="width: 100%;height: 100%">
            <Card>
                <div>
                    <Radio-group v-model="ownerUserId">
                        <div class="members compatible">
                            <div class="members_inner">
                                <div v-for='(item,index) in users' class="member">
                                    <Radio :label="item.id">
                                        <Avatar :src="item.avatar" size="large"/>
                                        <p class="nickname" style="text-align: center;">{{getNickname(item)}}</p>
                                    </Radio>

                                </div>
                            </div>
                        </div>
                    </Radio-group>
                </div>
            </Card>
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit">
                确定
            </Button>
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import app from '@/app/App';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
    import User from '@/app/com/main/module/business/user/bean/User';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
    import UserBox from '@/app/com/main/module/business/user/box/UserBox';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
    import GroupBusinessController from '@/app/com/main/module/business/group/controller/GroupBusinessController';
    import GroupMemberUserController from '@/app/com/main/module/business/group/controller/GroupMemberUserController';


    @Component({
        components: {},
    })
    export default class GroupOwnerChangePane extends Vue {
        private show: boolean = false;
        private groupId: string = '';
        private users: User[] = [];
        private groupMemberMap: Map<string, GroupMember> = new Map<string, GroupMember>();
        private ownerUserId: string = '';


        public mounted() {
            // TODO
        }

        public setShow(show: boolean): void {
            this.show = show;
        }

        public setGroupId(groupId: string) {
            this.groupId = groupId;
            this.loadList();
        }


        public setGroupMemberList(list: GroupMember[]) {
            this.groupMemberMap.clear();
            if (list) {
                for (const data of list) {
                    this.groupMemberMap.set(data.userId, data);
                    if (data.position === GroupMember.POSITION_OWNER) {
                        this.ownerUserId = data.userId;
                    }
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
            const userBox: UserBox = app.appContext.getMaterial(UserBox);
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            const groupMemberSender: GroupMemberSender = app.appContext.getMaterial(GroupMemberSender);

            const groupId = this.groupId;

            const own = this;
            const controller: GroupMemberUserController = app.appContext.getMaterial(GroupMemberUserController);

            controller.loadAllMemberUserList(groupId, (success, memberList, userList, message) => {
                if (success) {
                    own.setGroupMemberList(memberList);
                    own.setUserList(userList);
                } else {
                    Prompt.notice('群成员加载失败！');
                }
            });
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

        private handleSubmit(): void {
            const own = this;

            const controller: GroupBusinessController = app.appContext.getMaterial(GroupBusinessController);
            const groupId = this.groupId;
            const ownerUserId = this.ownerUserId;

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
                            } else {
                                Prompt.message(info, '成功', '失败');
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
            controller.changeGroupOwner(groupId, ownerUserId, back);
        }

    }
</script>

<style scoped>
    .members_wrp {
        top: 50px;
        margin-top: 1px;
        box-shadow: 1px 1px 1px #e0e0e0;
        -moz-box-shadow: 1px 1px 1px #e0e0e0;
        -webkit-box-shadow: 1px 1px 1px #e0e0e0;
        width: 100%
    }

    .members {
        padding: 10px 4px 8px 17px;
        background-color: #eee;
        border-bottom: 1px solid #dedede
    }

    .members_inner {
        margin-right: -4px;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden
    }

    .members_inner:after {
        content: "";
        display: block;
        clear: both
    }

    .member {
        float: left;
        position: relative;
        height: 85px;
        margin-right: 7px;
        margin-left: 7px;
        padding-top: 10px
    }

    .member.opt {
        cursor: pointer;
        margin-right: 15px
    }

    .member .avatar {
        display: block;
        cursor: pointer;
        width: 55px;
        height: 55px;
        background-color: #ccc
    }

    .member .nickname {
        color: #888;
        width: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        font-size: 12px;
        margin-left: -8px;
        vertical-align: middle
    }

    .member .nickname .emoji {
        vertical-align: -4px
    }

    .member .opt {
        position: absolute;
        font-size: 0;
        cursor: pointer;
        width: 18px;
        height: 10px;
        top: 2px;
        right: 0
    }

</style>
