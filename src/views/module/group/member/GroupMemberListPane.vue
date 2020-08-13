<template>
    <div ref="messageScrollPane"
         class="only-full-pane outer"
         style="overflow-y: auto;overflow-x: hidden"
    >
        <template v-for="item of entity.users">
            <group-member-item
                    :avatar="item.avatar"
                    :name="getNickname(item)"
                    @contextmenu='memberContextMenu($event,item)'
            >

            </group-member-item>
        </template>
        <GroupMemberContextMenu ref='groupMemberContextMenu'></GroupMemberContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import GroupMemberItem from '@/views/module/group/member/GroupMemberItem.vue';

    import GroupMemberContextMenu from '@/views/module/group/member/menu/GroupMemberContextMenu.vue';

    import GroupMemberListEntity from '@/views/module/group/member/GroupMemberListEntity';
    import User from '@/app/com/main/module/business/user/bean/User';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

    @Component({
        components: {
            GroupMemberItem,
            GroupMemberContextMenu,
        },
    })
    export default class GroupMemberListPane extends Vue {
        private entity: GroupMemberListEntity = new GroupMemberListEntity();
        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private groupId!: string;

        public mounted() {
            // no
            this.updateList();
        }

        private updateList() {
            const groupId = this.groupId;
            const entity = this.entity;
            entity.initialize(groupId);
        }

        private getNickname(user: User): string {
            let nickname = '';
            if (user) {
                nickname = this.entity.getNickname(user.id);
                if (BaseUtil.isEmpty(nickname)) {
                    nickname = UserInfoUtil.getShowName(user);
                }
            }
            return nickname;
        }

        private memberContextMenu(e: MouseEvent, user: User) {
            const groupId = this.entity.groupId;
            const userId = user.id;
            const menuName = 'groupMemberContextMenu';
            const menu: any = this.$refs[menuName];
            menu.show(e, groupId, userId);
        }

        @Watch('groupId')
        private update() {
            this.updateList();
        }
    }
</script>

<style scoped>

</style>
