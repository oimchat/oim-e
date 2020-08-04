<template>
    <div>
        <!--        <ContextMenu :list="mainDownMenu.list" :underline="true" :arrow="true" :name="mainDownMenu.name"></ContextMenu>-->
        <popup-menu :data="menuData"></popup-menu>
        <AddGroup ref="addGroupView"></AddGroup>
        <UpdatePassword ref="updatePasswordView"></UpdatePassword>
        <UpdateData ref="updateDataView"></UpdateData>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContextMenu from '@/views/common/menu/ContextMenu.vue';
    import PopupMenu from '@/views/common/menu/PopupMenu.vue';
    import PopupMenuData from '@/views/common/menu/PopupMenuData';

    import AddGroup from '@/views/module/group/AddGroupPane.vue';
    import UpdatePassword from '@/views/module/personal/UpdatePasswordPane.vue';
    import UpdateData from '@/views/module/personal/UpdateDataPane.vue';
    import app from '@/app/App';

    import ContactCategoryController from '@/app/com/main/controller/ContactCategoryController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupCategoryController from '@/app/com/main/controller/GroupCategoryController';

    @Component({
        components: {
            PopupMenu,
            ContextMenu,
            AddGroup,
            UpdatePassword,
            UpdateData,
        },
    })
    export default class MainMenu extends Vue {
        private menuData: PopupMenuData = new PopupMenuData();

        private mainDownMenu = {
            name: 'mainDownMenu',
            list: [{
                text: '新建联系人分组',
                icon: 'fas fa-address-book',
                onClick: (item: any, data: any) => {
                    this.addContactCategory();
                },
            }, {
                text: '新建群分组',
                icon: 'fas fa-address-book',
                onClick: (item: any, data: any) => {
                    this.addGroupCategory();
                },
            }, {
                text: '新建群',
                icon: 'fas fa-users',
                onClick: (item: any, data: any) => {
                    this.handleAddGroup();
                },
            }, {
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
                text: '退出',
                icon: 'fas fa-power-off',
                onClick: (item: any, data: any) => {
                    this.logout();
                },
            }],
        };


        public mounted() {
            // init
            this.menuData.target = '#main-down-menu';
            this.menuData.list = this.mainDownMenu.list;
        }

        private logout(): void {
            this.$store.commit('logout');
            this.$router.push({path: '/login'});
        }

        private addContactCategory(): void {
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
            const ccc: ContactCategoryController = app.appContext.getMaterial(ContactCategoryController);

            let text = '';
            this.$Modal.confirm({
                title: '新增分组',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: '',
                            autofocus: true,
                            placeholder: '名称',
                        },
                        on: {
                            input: (t: string) => {
                                text = t;
                            },
                        },
                    });
                },
                onOk: () => {
                    if ('' !== text && null !== text) {
                        ccc.addCategory(text, back);
                    }
                },
                onCancel: () => {
                    // no
                },
            });
        }

        private addGroupCategory(): void {
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
            const ccc: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);

            let text = '';
            this.$Modal.confirm({
                title: '新增分组',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: '',
                            autofocus: true,
                            placeholder: '名称',
                        },
                        on: {
                            input: (t: string) => {
                                text = t;
                            },
                        },
                    });
                },
                onOk: () => {
                    if ('' !== text && null !== text) {
                        ccc.addCategory(text, back);
                    }
                },
                onCancel: () => {
                    // no
                },
            });
        }

        private handleAddGroup() {
            const addGroupViewName = 'addGroupView';
            const addGroupView: any = this.$refs[addGroupViewName];
            addGroupView.setShow(true);
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
