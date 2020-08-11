<template>
    <div>
        <ContextMenu :list="menu.list" :underline="true" :arrow="true" :name="menu.name"></ContextMenu>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import ContextMenu from '@/views/common/menu/ContextMenu.vue';

import app from '@/app/App';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import ContactCategoryController from '@/app/com/main/module/business/contact/controller/ContactCategoryController';
import ContactCategoryBox from '@/app/com/main/module/business/contact/box/ContactCategoryBox';

@Component({
    components: {
        ContextMenu,
    },
})
export default class ContactNodeContextMenu extends Vue {

    private menu = {
        name: 'userNodeContextMenu',
        list: [],
    };


    public mounted() {
        // init
    }

    public show(e: MouseEvent, categoryId: string) {
        const own = this;
        const list: any = [];

        list.push({
            text: '重命名',
            icon: 'of address-book',
            onClick: (item: any, data: any) => {
                // todo
                own.openUpdateName(categoryId);
            },
        });
        list.push({
            text: '删除分组',
            icon: 'of address-book',
            onClick: (item: any, data: any) => {
                // todo
                own.delete(categoryId);
            },
        });

        const contactListBox: ContactCategoryBox = app.appContext.getMaterial(ContactCategoryBox);
        const categoryList = contactListBox.getCategoryList();
        const size = categoryList.length;
        if (size > 0) {
            const nodeList = [];
            for (let i = 0; i < size; i++) {
                const data = categoryList[i];
                const id = data.id;
                const name = data.name;
                if (categoryId !== id) {
                    nodeList.push({
                        text: (i + 1),
                        icon: 'of address-book',
                        onClick: (item: any, d: any) => {
                            // todo
                            own.updateSort(categoryId, i);
                        },
                    });
                }
            }

            list.push({
                text: '修改排序',
                icon: 'of address-book',
                children: nodeList,
            });
        }

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

    private delete(categoryId: string) {
        const contactCategoryController: ContactCategoryController = app.appContext.getMaterial(ContactCategoryController);
        contactCategoryController.delete(categoryId);
    }

    private updateSort(categoryId: string, sort: number) {
        const contactCategoryController: ContactCategoryController = app.appContext.getMaterial(ContactCategoryController);
        contactCategoryController.updateSort(categoryId, sort);
    }

    private openUpdateName(categoryId: string) {
        const contactCategoryController: ContactCategoryController = app.appContext.getMaterial(ContactCategoryController);
        const contactListBox: ContactCategoryBox = app.appContext.getMaterial(ContactCategoryBox);
        const category = contactListBox.getCategory(categoryId);
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
                    contactCategoryController.updateName(categoryId, name);
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
