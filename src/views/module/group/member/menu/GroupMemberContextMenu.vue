<template>
    <div>
        <NavMenu :name="menu.name" :data="navMenu"></NavMenu>
        <ContextMenu :list="menu.list" :underline="true" :arrow="true" :name="menu.name"></ContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import NavMenu from '@/views/component/menu/NavMenu.vue';
    import NavMenuData from '@/views/component/menu/NavMenuData';
    import NavMenuItemData from '@/views/component/menu/NavMenuItemData';

    import ContextMenu from '@/views/component/menu/ContextMenu.vue';

    import app from '@/app/App';
    import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupMemberBox from '@/app/com/main/module/business/group/box/GroupMemberBox';
    import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
    import GroupMemberController from '@/app/com/main/module/business/group/controller/GroupMemberController';

    @Component({
        components: {
            NavMenu,
            ContextMenu,
        },
    })
    export default class GroupMemberContextMenu extends Vue {
        private navMenu: NavMenuData = new NavMenuData();
        private menu = {
            name: 'groupMemberContextMenu',
            list: [],
        };


        public mounted() {
            // init
        }

        public show(e: MouseEvent, groupId: string, userId: string) {
            const own = this;

            const personalBox: PersonalBox = app.appContext.getMaterial(PersonalBox);
            const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
            const memberBox: GroupMemberBox = app.appContext.getMaterial(GroupMemberBox);

            const ownerUserId = personalBox.getUserId();

            const personalPosition = personalGroupMemberListBox.getPosition(groupId);
            const userPosition = memberBox.getPosition(groupId, userId);

            const isMe = ownerUserId === userId;


            const isPersonalOwner = GroupMember.POSITION_OWNER === personalPosition;
            const isPersonalAdmin = GroupMember.POSITION_ADMIN === personalPosition;
            const isPersonalNormal = GroupMember.POSITION_NORMAL === personalPosition;

            const isUserOwner = GroupMember.POSITION_OWNER === userPosition;
            const isUserAdmin = GroupMember.POSITION_ADMIN === userPosition;
            const isUserNormal = GroupMember.POSITION_NORMAL === userPosition;
            const items: NavMenuItemData[] = [];
            let item = new NavMenuItemData();
            const list: any = [];
            if ((isPersonalOwner || (isPersonalAdmin && isUserNormal)) && !isMe) {
                item = new NavMenuItemData();
                item.text = '从本群删除';
                // item.icon = 'fas fa-edit';
                item.addClickEvent(() => {
                    own.deleteMember(groupId, userId);
                });
                items.push(item);
            }

            if (isPersonalOwner && isUserNormal) {
                item = new NavMenuItemData();
                item.text = '设为管理员';
                // item.icon = 'fas fa-edit';
                item.addClickEvent(() => {
                    own.updatePosition(groupId, userId, GroupMember.POSITION_ADMIN);
                });
                items.push(item);
            }

            if (isPersonalOwner && isUserAdmin) {
                item = new NavMenuItemData();
                item.text = '取消管理员';
                // item.icon = 'fas fa-edit';
                item.addClickEvent(() => {
                    own.updatePosition(groupId, userId, GroupMember.POSITION_NORMAL);
                });
                items.push(item);
            }

            if (((isPersonalOwner || isPersonalAdmin) && isUserNormal) || isMe) {
                item = new NavMenuItemData();
                item.text = '修改群中昵称';
                // item.icon = 'fas fa-edit';
                item.addClickEvent(() => {
                    own.openUpdateNickname(groupId, userId);
                });
                items.push(item);
            }

            this.navMenu.items = items;

            if (this.navMenu.items.length > 0) {
                this.openMenu(e, this.menu.name);
            }
        }

        private openMenu(e: MouseEvent, n?: string) {
            e.stopPropagation();
            e.preventDefault();
            this.$root.$emit('openOnlyContextMenu', {
                name: n,
                x: e.clientX,
                y: e.clientY,
            });
        }


        private deleteMember(groupId: string, userId: string) {
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                // no
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
            const controller: GroupMemberController = app.appContext.getMaterial(GroupMemberController);
            controller.delete(groupId, userId, back);
        }


        private updatePosition(groupId: string, userId: string, position: string) {
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                // no
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
            const controller: GroupMemberController = app.appContext.getMaterial(GroupMemberController);
            controller.updatePosition(groupId, userId, position, back);
        }

        private openUpdateNickname(groupId: string, userId: string) {
            const memberBox: GroupMemberBox = app.appContext.getMaterial(GroupMemberBox);
            const gm = memberBox.getGroupMember(groupId, userId);
            const name = (gm) ? gm.nickname : '';
            let text = '';
            const controller: GroupMemberController = app.appContext.getMaterial(GroupMemberController);

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                //
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


            this.$Modal.confirm({
                title: '修改昵称',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: name,
                            autofocus: true,
                            placeholder: '输入昵称',
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
                    controller.updateNickname(groupId, userId, text, back);
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
