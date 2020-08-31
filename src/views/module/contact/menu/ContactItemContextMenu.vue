<template>
    <div>
        <NavMenu :name="menu.name" :data="navMenu"></NavMenu>
        <ContactMoveCategoryPane ref="contactMoveCategoryPane"></ContactMoveCategoryPane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import NavMenu from '@/views/component/menu/NavMenu.vue';
    import NavMenuData from '@/views/component/menu/NavMenuData';
    import NavMenuItemData from '@/views/component/menu/NavMenuItemData';


    import ContactMoveCategoryPane from '@/views/module/contact/ContactMoveCategoryPane.vue';

    import app from '@/app/App';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import ContactRelationController from '@/app/com/main/module/business/contact/controller/ContactRelationController';
    import ContactCategoryBox from '@/app/com/main/module/business/contact/box/ContactCategoryBox';

    @Component({
        components: {
            NavMenu,
            ContactMoveCategoryPane,
        },
    })
    export default class ContactItemContextMenu extends Vue {
        private navMenu: NavMenuData = new NavMenuData();
        private menu = {
            name: 'userItemContextMenu',
            list: [],
        };


        public mounted() {
            // init
        }

        public show(e: MouseEvent, userId: string) {
            const own = this;
            const contactListBox: ContactCategoryBox = app.appContext.getMaterial(ContactCategoryBox);
            const list: any = [];
            const items: NavMenuItemData[] = [];
            let item = new NavMenuItemData();

            const categoryList = contactListBox.getCategoryList();
            if (categoryList.length > 1) {
                const nodeList: NavMenuItemData[] = [];
                for (const data of categoryList) {
                    const id = data.id;
                    const name = data.name;

                    item = new NavMenuItemData();
                    item.text = name;
                    // item.icon = 'fas fa-edit';
                    item.addClickEvent(() => {
                        own.moveCategory(userId, id);
                    });
                    nodeList.push(item);
                }


                item = new NavMenuItemData();
                item.text = '移动分组';
                // item.icon = 'fas fa-edit';
                item.addClickEvent(() => {
                    // no
                });
                items.push(item);
                item.children = nodeList;
            }

            item = new NavMenuItemData();
            item.text = '删除联系人';
            // item.icon = 'fas fa-edit';
            item.addClickEvent(() => {
                // no
                own.delete(userId);
            });
            items.push(item);

            this.navMenu.items = items;
            if (items.length > 0) {
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
