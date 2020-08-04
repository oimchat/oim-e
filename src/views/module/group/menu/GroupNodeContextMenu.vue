<template>
    <div>
        <ContextMenu :list="menu.list" :underline="true" :arrow="true" :name="menu.name"></ContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContextMenu from '@/views/common/menu/ContextMenu.vue';

    import app from '@/app/App';
    import GroupListBox from '@/app/com/main/box/GroupListBox';
    import GroupCategoryController from '@/app/com/main/controller/GroupCategoryController';

    @Component({
        components: {
            ContextMenu,
        },
    })
    export default class GroupNodeContextMenu extends Vue {

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

            const groupListBox: GroupListBox = app.appContext.getMaterial(GroupListBox);
            const categoryList = groupListBox.getCategoryList();
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
                                own.updateRank(categoryId, i);
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
            const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
            groupCategoryController.delete(categoryId);
        }

        private updateRank(categoryId: string, rank: number) {
            const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
            groupCategoryController.updateRank(categoryId, rank);
        }

        private openUpdateName(categoryId: string) {
            const groupCategoryController: GroupCategoryController = app.appContext.getMaterial(GroupCategoryController);
            const groupListBox: GroupListBox = app.appContext.getMaterial(GroupListBox);
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
