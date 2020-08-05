<template>
    <div>
        <ContextMenu :list="menu.list" :underline="true" :arrow="true"></ContextMenu>
        <PopupMenu :data="menuData"></PopupMenu>
        <NavMenu :name="menu.name" :data="navMenu"></NavMenu>
        <InviteJoinGroup ref="inviteJoinGroup"></InviteJoinGroup>
        <UpdateGroupPane ref="updateGroupPane"></UpdateGroupPane>
        <ChangeGroupOwnerPane ref="changeGroupOwnerPane"></ChangeGroupOwnerPane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import PopupMenu from '@/views/common/menu/PopupMenu.vue';
    import ContextMenu from '@/views/common/menu/ContextMenu.vue';
    import UpdateGroupPane from '@/views/module/group/UpdateGroupPane.vue';
    import ChangeGroupOwnerPane from '@/views/module/group/ChangeGroupOwnerPane.vue';

    import app from '@/app/App';
    import PersonalGroupMemberListBox from '@/app/com/main/box/PersonalGroupMemberListBox';
    import GroupMember from '@/app/com/bean/GroupMember';
    import GroupListBox from '@/app/com/main/box/GroupListBox';

    import InviteJoinGroup from '@/views/main/group/InviteJoinGroupPane.vue';
    import GroupRelationController from '@/app/com/main/controller/GroupRelationController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupCategoryController from '@/app/com/main/controller/GroupCategoryController';
    import GroupBusinessController from '@/app/com/main/controller/GroupBusinessController';
    import PopupMenuData from '@/views/common/menu/PopupMenuData';
    import NavMenu from '@/views/common/menu/NavMenu.vue';
    import NavMenuData from '@/views/common/menu/NavMenuData';
    import NavMenuItemData from '@/views/common/menu/NavMenuItemData';

    @Component({
        components: {
            NavMenu,
            PopupMenu,
            ContextMenu,
            InviteJoinGroup,
            UpdateGroupPane,
            ChangeGroupOwnerPane,
        },
    })
    export default class GroupContextMenu extends Vue {
        private navMenu: NavMenuData = new NavMenuData();
        private menuData: PopupMenuData = new PopupMenuData();
        private showing: boolean = false;
        private menu = {
            name: 'groupContextMenu',
            list: [],
        };


        public mounted() {
            // init
            this.menuData.target = 'body';
        }

        public show(e: MouseEvent, groupId: string) {
            const own = this;
            const groupListBox: GroupListBox = app.appContext.getMaterial(GroupListBox);
            const personalGroupMemberListBox: PersonalGroupMemberListBox = app.appContext.getMaterial(PersonalGroupMemberListBox);
            const position = personalGroupMemberListBox.getPosition(groupId);
            const list: any = [];

            const isOwner = GroupMember.POSITION_OWNER === position;
            if (isOwner) {
                list.push({
                    text: '修改资料',
                    icon: 'of address-book',
                    onClick: (item: any, data: any) => {
                        // todo
                        own.openUpdateGroup(groupId);
                    },
                });
            }

            const categoryList = groupListBox.getCategoryList();
            if (categoryList.length > 1) {
                const nodeList = [];
                for (const data of categoryList) {
                    const id = data.id;
                    const name = data.name;
                    nodeList.push({
                        text: name,
                        icon: 'of address-book',
                        onClick: (item: any, d: any) => {
                            // todo
                            own.moveCategory(groupId, id);
                        },
                    });
                }

                list.push({
                    text: '移动到',
                    icon: 'of address-book',
                    children: nodeList,
                });
            }
            list.push({
                text: '邀请加入',
                icon: 'of address-book',
                onClick: (item: any, data: any) => {
                    // todo
                    own.openInviteJoinGroup(groupId);
                },
            });
            if (!isOwner) {
                list.push({
                    text: '退出群',
                    icon: 'of address-book',
                    onClick: (item: any, data: any) => {
                        // todo
                        own.quitGroup(groupId);
                    },
                });
            }

            if (isOwner) {
                list.push({
                    text: '转让群',
                    icon: 'of address-book',
                    onClick: (item: any, data: any) => {
                        // todo
                        own.openChangeGroupOwner(groupId);
                    },
                });
                list.push({
                    text: '解散群',
                    icon: 'of address-book',
                    onClick: (item: any, data: any) => {
                        // todo
                        own.disband(groupId);
                    },
                });
            }


            this.menu.list = list;


            const items: NavMenuItemData[] = [];


            for (let i = 0; i < 20; i++) {
                const item = new NavMenuItemData();
                item.text = i + ':解散群解散群解散群解散群解散群解散群';
                item.icon = 'fas fa-female';
                items.push(item);

            }
            const item = items[items.length - 1];
            for (let j = 0; j < 20; j++) {
                const n = new NavMenuItemData();
                n.text = j + ':解散群';
                n.icon = 'fas fa-female';
                item.children.push(n);


            }
            const n = item.children[item.children.length - 1];
            for (let k = 0; k < 20; k++) {
                const m = new NavMenuItemData();
                m.text = k + ':解散群';
                m.icon = 'fas fa-female';
                n.children.push(m);
            }

            this.navMenu.items = items;
            if (this.menu.list.length > 0) {
                // this.menuData.list = list;
                // this.menuData.offset = [e.offsetX, e.offsetY];
                //   this.menuData.show();
                this.openMenu(e, 'groupContextMenu');
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

        private openUpdateGroup(groupId: string) {
            const viewName = 'updateGroupPane';
            const view: any = this.$refs[viewName];
            view.setGroupId(groupId);
            view.setShow(true);
        }

        private openInviteJoinGroup(groupId: string) {
            const inviteJoinGroupName = 'inviteJoinGroup';
            const inviteJoinGroup: any = this.$refs[inviteJoinGroupName];
            inviteJoinGroup.setGroupId(groupId);
            inviteJoinGroup.setShow(true);
        }

        private openChangeGroupOwner(groupId: string) {
            const viewName = 'changeGroupOwnerPane';
            const view: any = this.$refs[viewName];
            view.setGroupId(groupId);
            view.setShow(true);
        }

        private moveCategory(groupId: string, categoryId: string) {
            const groupIds = [groupId];

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
            const groupRelationController: GroupRelationController = app.appContext.getMaterial(GroupRelationController);
            groupRelationController.moveCategory(groupIds, categoryId);
        }

        private quitGroup(groupId: string) {
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
            const controller: GroupBusinessController = app.appContext.getMaterial(GroupBusinessController);
            controller.quit(groupId, back);
        }

        private disband(groupId: string) {
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
            this.$Modal.confirm({
                title: '确定',
                content: '<div><H3>确定解散群？</H3></div>',
                onOk: () => {
                    const controller: GroupBusinessController = app.appContext.getMaterial(GroupBusinessController);
                    controller.disband(groupId, back);
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
