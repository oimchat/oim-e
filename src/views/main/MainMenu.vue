<template>
    <div>
        <popup-menu :data="menuData"></popup-menu>
        <AddGroup ref="addGroupView"></AddGroup>
        <UpdatePassword ref="updatePasswordView"></UpdatePassword>
        <UpdateData ref="updateDataView"></UpdateData>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContextMenu from '@/views/component/menu/ContextMenu.vue';
    import PopupMenu from '@/views/component/menu/PopupMenu.vue';
    import PopupMenuData from '@/views/component/menu/PopupMenuData';

    import AddGroup from '@/views/module/group/info/GroupAddPane.vue';
    import UpdatePassword from '@/views/module/personal/UpdatePasswordPane.vue';
    import UpdateData from '@/views/module/personal/UpdateDataPane.vue';
    import app from '@/app/App';

    import ContactCategoryController from '@/app/com/main/module/business/contact/controller/ContactCategoryController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupCategoryController from '@/app/com/main/module/business/group/controller/GroupCategoryController';

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
            }],
        };


        public mounted() {
            // init
            this.menuData.target = '#main-down-menu';
            this.menuData.list = this.mainDownMenu.list;
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
    }
</script>

<style scoped>

</style>
