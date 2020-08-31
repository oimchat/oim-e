<template>
    <div>
        <!--        <ContextMenu :list="mainDownMenu.list" :underline="true" :arrow="true" :name="mainDownMenu.name"></ContextMenu>-->
        <popup-menu :data="menuData"></popup-menu>
        <UpdatePassword ref="updatePasswordView"></UpdatePassword>
        <UpdateData ref="updateDataView"></UpdateData>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContextMenu from '@/views/component/menu/ContextMenu.vue';
    import PopupMenu from '@/views/component/menu/PopupMenu.vue';
    import PopupMenuData from '@/views/component/menu/PopupMenuData';
    import UpdatePassword from '@/views/module/personal/UpdatePasswordPane.vue';
    import UpdateData from '@/views/module/personal/UpdateDataPane.vue';

    @Component({
        components: {
            PopupMenu,
            ContextMenu,
            UpdatePassword,
            UpdateData,
        },
    })
    export default class TabMenu extends Vue {
        private menuData: PopupMenuData = new PopupMenuData();

        private mainDownMenu = {
            name: 'mainDownMenu',
            list: [{
                text: '修改资料',
                icon: 'fas fa-user-edit',
                onClick: (item: any, data: any) => {
                    this.handleUpdateData();
                },
            }, {
                text: '修改密码',
                icon: 'fas fa-unlock-alt',
                onClick: (item: any, data: any) => {
                    this.handleUpdatePassword();
                },
            }, {
                text: '注销',
                icon: 'fas fa-power-off',
                onClick: (item: any, data: any) => {
                    this.logout();
                },
            }],
        };


        public mounted() {
            // init
            this.menuData.target = '#main-tab-menu';
            this.menuData.list = this.mainDownMenu.list;
        }

        private logout(): void {
            this.$store.commit('logout');
            this.$router.push({path: '/login'});
        }

        private handleUpdatePassword() {
            const updatePasswordViewName = 'updatePasswordView';
            const updatePasswordViewView: any = this.$refs[updatePasswordViewName];
            updatePasswordViewView.setShow(true);
        }

        private handleUpdateData() {
            const updateDataViewName = 'updateDataView';
            const updateDataView: any = this.$refs[updateDataViewName];
            updateDataView.setShow(true);
        }
    }
</script>

<style scoped>

</style>
