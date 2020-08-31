<template>
    <div>
        <NavMenu :name="menu.name" :data="navMenu"></NavMenu>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

import NavMenu from '@/views/component/menu/NavMenu.vue';
import NavMenuData from '@/views/component/menu/NavMenuData';
import NavMenuItemData from '@/views/component/menu/NavMenuItemData';

import app from '@/app/App';
import GroupRelationBox from '@/app/com/main/module/business/group/box/GroupRelationBox';
import GroupCategoryController from '@/app/com/main/module/business/group/controller/GroupCategoryController';
import GroupCategoryBox from '@/app/com/main/module/business/group/box/GroupCategoryBox';

@Component({
    components: {
        NavMenu,
    },
})
export default class GroupNodeContextMenu extends Vue {
    private navMenu: NavMenuData = new NavMenuData();
    private menu = {
        name: 'groupNodeContextMenu',
        list: [],
    };


    public mounted() {
        // init
    }

    public show(e: MouseEvent, categoryId: string) {
        const own = this;
        const list: any = [];
        const items: NavMenuItemData[] = [];
        let item = new NavMenuItemData();

        item = new NavMenuItemData();
        item.text = '重命名';
        item.icon = 'fas fa-edit';
        item.addClickEvent(() => {
            own.openUpdateName(categoryId);
        });
        items.push(item);


        item = new NavMenuItemData();
        item.text = '删除分组';
        // item.icon = 'fas fa-edit';
        item.addClickEvent(() => {
            own.delete(categoryId);
        });
        items.push(item);

        const groupListBox: GroupCategoryBox = app.appContext.getMaterial(GroupCategoryBox);
        const categoryList = groupListBox.getCategoryList();
        const size = categoryList.length;
        if (size > 0) {
            const nodeList: NavMenuItemData[] = [];
            for (let i = 0; i < size; i++) {
                const data = categoryList[i];
                const id = data.id;
                const name = data.name;
                if (categoryId !== id) {
                    item = new NavMenuItemData();
                    item.text = (i + 1) + '';
                    item.icon = 'fas fa-edit';
                    item.addClickEvent(() => {
                        own.updateSort(categoryId, i);
                    });
                    nodeList.push(item);
                }
            }

            item = new NavMenuItemData();
            item.text = '修改排序';
            // item.icon = 'fas fa-edit';
            item.addClickEvent(() => {
                // no
            });
            items.push(item);
            item.children = nodeList;
        }

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

    private delete(categoryId: string) {
        const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
        groupCategoryController.delete(categoryId);
    }

    private updateSort(categoryId: string, sort: number) {
        const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
        groupCategoryController.updateSort(categoryId, sort);
    }

    private openUpdateName(categoryId: string) {
        const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
        const groupListBox: GroupCategoryBox = app.appContext.getMaterial(GroupCategoryBox);
        const category = groupListBox.getCategory(categoryId);
        let name = category.name;
        this.$Modal.confirm({
            title: '重命名',
            render: (h: any) => {
                return h('Input', {
                    props: {
                        value: name,
                        autofocus: true,
                        placeholder: '输入名称',
                    },
                    on: {
                        input: (text: string) => {
                            name = text;
                        },
                    },
                });
            },
            onOk: () => {
                if ('' !== name && null !== name) {
                    groupCategoryController.updateName(categoryId, name);
                }
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
