<template>
    <div @contextmenu="showMenu" style="width: 100px;height: 100px;background: red;">
        <vue-context-menu :contextMenuData="contextMenuData"
                          @savedata="savedata"
                          @newdata="newdata">
        </vue-context-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import VueContextMenu from "@/views/component/menu/VueContextMenu.vue";

    @Component({
        components: {
            VueContextMenu,
        },
    })
    export default class VueContextMenuShow extends Vue {
        private contextMenuData = {// contextmenu data (菜单数据)
            // the contextmenu name(1.4.1+ updated)
            menuName: 'demo',
            // The coordinates of the display(菜单显示的位置)
            axis: {
                x: 0,
                y: 0
            },
            // Menu options (菜单选项)
            menulists: [
                {
                    fnHandler: 'savedata', // Binding events(绑定事件)
                    icoName: 'fa fa-home fa-fw', // icon (icon图标 )
                    btnName: 'Saveggggggdsssssssdsdsdddddddddddddddd' // The name of the menu option (菜单名称)
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New',
                    children: [{
                        fnHandler: 'newdata',
                        icoName: 'fa fa-home fa-fw',
                        btnName: 'New'
                    },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New',
                            children: [{
                                fnHandler: 'newdata',
                                icoName: 'fa fa-home fa-fw',
                                btnName: 'New'
                            },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New'
                                },
                                {
                                    fnHandler: 'newdata',
                                    icoName: 'fa fa-home fa-fw',
                                    btnName: 'New',
                                    children: [{
                                        fnHandler: 'newdata',
                                        icoName: 'fa fa-home fa-fw',
                                        btnName: 'New'
                                    },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        },
                                        {
                                            fnHandler: 'newdata',
                                            icoName: 'fa fa-home fa-fw',
                                            btnName: 'New'
                                        }]
                                }]
                        }]
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                },
                {
                    fnHandler: 'newdata',
                    icoName: 'fa fa-home fa-fw',
                    btnName: 'New'
                }
            ]
        };

        private showMenu(event: MouseEvent): void {
            event.preventDefault()
            const x = event.clientX
            const y = event.clientY
            // Get the current location
            this.contextMenuData.axis = {
                x: x, y: y
            };
        }

        private savedata(): void {
            alert(1);
        }

        private newdata(): void {
            console.log('newdata!');
        }
    }
</script>

<style scoped>

</style>
