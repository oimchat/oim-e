<template>
    <div>
        <NavMenu :name="menu.name" :data="navMenu"></NavMenu>
        <InviteJoinGroup ref="inviteJoinGroup"></InviteJoinGroup>
        <UpdateGroupPane ref="updateGroupPane"></UpdateGroupPane>
        <ChangeGroupOwnerPane ref="changeGroupOwnerPane"></ChangeGroupOwnerPane>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import UpdateGroupPane from '@/views/module/group/info/GroupUpdatePane.vue';
import ChangeGroupOwnerPane from '@/views/module/group/operate/GroupOwnerChangePane.vue';

import app from '@/app/App';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';

import InviteJoinGroup from '@/views/module/group/operate/GroupJoinInvitePane.vue';
import GroupRelationController from '@/app/com/main/module/business/group/controller/GroupRelationController';
import DataBackAction from '@/app/base/net/DataBackAction';
import Prompt from '@/platform/web/common/Prompt';
import GroupBusinessController from '@/app/com/main/module/business/group/controller/GroupBusinessController';
import PopupMenuData from '@/views/component/menu/PopupMenuData';
import NavMenu from '@/views/component/menu/NavMenu.vue';
import NavMenuData from '@/views/component/menu/NavMenuData';
import NavMenuItemData from '@/views/component/menu/NavMenuItemData';
import GroupCategoryBox from '@/app/com/main/module/business/group/box/GroupCategoryBox';

@Component({
    components: {
        NavMenu,
        InviteJoinGroup,
        UpdateGroupPane,
        ChangeGroupOwnerPane,
    },
})
export default class GroupContextMenu extends Vue {
    private navMenu: NavMenuData = new NavMenuData();
    private menuData: PopupMenuData = new PopupMenuData();
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
        const groupListBox: GroupCategoryBox = app.appContext.getMaterial(GroupCategoryBox);
        const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const position = personalGroupMemberListBox.getPosition(groupId);
        const list: any = [];
        const items: NavMenuItemData[] = [];
        let item = new NavMenuItemData();
        const isOwner = GroupMember.POSITION_OWNER === position;
        if (isOwner) {
            item = new NavMenuItemData();
            item.text = '修改资料';
            item.icon = 'fas fa-edit';
            item.addClickEvent(() => {
                own.openUpdateGroup(groupId);
            });
            items.push(item);
        }

        const categoryList = groupListBox.getCategoryList();
        if (categoryList.length > 1) {
            const nodeList = [];
            for (const data of categoryList) {
                const id = data.id;
                const name = data.name;

                item = new NavMenuItemData();
                item.text = name;
                item.icon = 'fas fa-align-justify';
                item.addClickEvent(() => {
                    own.moveCategory(groupId, id);
                });
                nodeList.push(item);
            }


            item = new NavMenuItemData();
            item.text = '移动到';
            item.icon = 'fas fa-angle-double-right';
            item.children = nodeList;
            items.push(item);
        }

        item = new NavMenuItemData();
        item.text = '邀请加入';
        item.icon = 'fas fa-user-check';
        item.addClickEvent(() => {
            own.openInviteJoinGroup(groupId);
        });
        items.push(item);


        if (!isOwner) {
            item = new NavMenuItemData();
            item.text = '退出群';
            item.icon = 'fas fa-sign-out-alt';
            item.addClickEvent(() => {
                own.quitGroup(groupId);
            });
            items.push(item);
        }

        if (isOwner) {

            item = new NavMenuItemData();
            item.text = '转让群';
            item.icon = 'fas fa-exchange-alt';
            item.addClickEvent(() => {
                own.openChangeGroupOwner(groupId);
            });
            items.push(item);

            item = new NavMenuItemData();
            item.text = '解散群';
            item.icon = 'fas fa-users-slash';
            item.addClickEvent(() => {
                own.disband(groupId);
            });
            items.push(item);
        }
        this.navMenu.items = items;
        if (items.length > 0) {
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
