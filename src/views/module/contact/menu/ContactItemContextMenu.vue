<template>
    <div>
        <ContextMenu :list="menu.list" :underline="true" :arrow="true" :name="menu.name"></ContextMenu>
        <ContactMoveCategoryPane ref="contactMoveCategoryPane"></ContactMoveCategoryPane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContextMenu from '@/views/common/menu/ContextMenu.vue';

    import ContactMoveCategoryPane from '@/views/module/contact/ContactMoveCategoryPane.vue';

    import app from '@/app/App';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import ContactListBox from '@/app/com/main/module/business/contact/box/ContactListBox';
    import ContactRelationController from '@/app/com/main/module/business/contact/controller/ContactRelationController';

    @Component({
        components: {
            ContextMenu,
            ContactMoveCategoryPane,
        },
    })
    export default class ContactItemContextMenu extends Vue {

        private menu = {
            name: 'userItemContextMenu',
            list: [],
        };


        public mounted() {
            // init
        }

        public show(e: MouseEvent, userId: string) {
            const own = this;
            const contactListBox: ContactListBox = app.appContext.getMaterial(ContactListBox);
            const list: any = [];

            const categoryList = contactListBox.getCategoryList();
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
                            own.moveCategory(userId, id);
                        },
                    });
                }

                list.push({
                    text: '移动分组',
                    icon: 'of address-book',
                    children: nodeList,
                    // onClick: (item: any, d: any) => {
                    //     // todo
                    //     own.openContactMoveCategoryPane(userId);
                    // },
                });
            }
            list.push({
                text: '删除联系人',
                icon: 'of address-book',
                onClick: (item: any, data: any) => {
                    // todo
                    own.delete(userId);
                },
            });

            this.menu.list = list;

            if (this.menu.list.length > 0) {
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

        private delete(userId: string) {
            const contactRelationController: ContactRelationController = app.appContext.getMaterial(ContactRelationController);
            contactRelationController.delete(userId);
        }

        private openContactMoveCategoryPane(userId: string) {
            const viewName = 'contactMoveCategoryPane';
            const view: any = this.$refs[viewName];
            view.setUserId(userId);
            view.setShow(true);
        }

        private moveCategory(userId: string, categoryId: string) {
            const userIds = [userId];

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
            const contactRelationController: ContactRelationController = app.appContext.getMaterial(ContactRelationController);
            contactRelationController.moveCategory(userIds, categoryId);
        }
    }
</script>

<style scoped>

</style>
