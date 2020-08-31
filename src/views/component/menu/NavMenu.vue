<template>
    <div ref="menuContainer" class="menu-container" :style="axisComputed" v-show="isShow">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="data.activeMenu"
                    :collapse="data.collapse"
                    :unique-opened="false"
                    :collapse-transition="false"
                    :background-color="data.backgroundColor"
                    :text-color="data.textColor"
                    :active-text-color="data.activeTextColor"
                    mode="vertical"
            >
                <template v-for="(item,index) in data.items">
                    <NavMenuRoot :data="item" :index="index+''"/>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import NavMenuRoot from '@/views/component/menu/NavMenuRoot.vue';
    import NavMenuData from '@/views/component/menu/NavMenuData';

    @Component({
        components: {
            NavMenuRoot,
        },
    })
    export default class NavMenu extends Vue {
        @Prop({
            type: NavMenuData,
            required: true,
            default: () => new NavMenuData(),
        })
        private data!: NavMenuData;
        // 是否显示
        private isShow: boolean = false;
        // 触发点坐标
        private axis: any = {
            x: 0,
            y: 0,
        };


        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private name!: string;
        // 显示点偏移量
        @Prop({
            type: Object,
            required: false,
            default: () => ({x: 6, y: 2}),
        })
        private offset!: { x: 6, y: 2 };

        public mounted(): void {
            const own = this;
            this.$root.$on('openOnlyContextMenu', (axis: any) => {
                if (axis.name === own.name) {
                    own.isShow = true;
                    own.axis = axis;
                }
            });
            document.addEventListener('click', (e: Event) => {
                own.isShow = false;
            }, true);
        }

        public show(axis: any): void {
            if (axis) {
                this.isShow = true;
                this.axis = axis;
            }
        }

        get axisComputed() {
            return {
                top: this.axis.y + this.offset.y + 'px',
                left: this.axis.x + this.offset.x + 'px',
            };
        }


        @Watch('axis')
        private axisWatch(): void {
            const itemWidth = 160;
            const itemHeight = 35;
            const list = this.data.items;
            const length = (list) ? list.length : 0;
            const offsetWidth = document.body.offsetWidth;
            const offsetHeight = document.body.offsetHeight;

            let height = itemHeight * length;
            if (height > offsetHeight) {
                height = offsetHeight;
            }

            let x = this.axis.x + this.offset.x;
            let y = this.axis.y + this.offset.y;

            if (y + height > offsetHeight) {
                y = offsetHeight - height - this.offset.y;
            }

            if (y < 5) {
                y = 5;
            }
            this.axis.y = y;

            if (x + itemWidth >= offsetWidth) {
                x = offsetWidth - itemWidth - this.offset.x;
            }

            if (x < 5) {
                x = 5;
            }
            this.axis.x = x;
        }


        private onClick(item: any) {
            const onClick = item.onClick;
            if (typeof onClick === 'function') {
                const data = this.axis.data;
                onClick(item, data);
            }
        }
    }
</script>
<style scoped>

</style>

<style lang="scss">
    .scrollbar-wrapper {
        margin-bottom: 0 !important;
    }

    .menu-container {
        overflow-y: auto;
        max-height: calc(100% - 20px);
        position: fixed;
        min-width: 200px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        z-index: 9999;
        border-radius: 6px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        box-shadow: 0 2px 10px #999;
        -moz-box-shadow: #999 0 2px 10px;
        -webkit-box-shadow: #999 0 2px 10px;
        background-color: #ffffff;
    }

    .svg-icon {
        width: 1em;
        fill: currentColor;
        overflow: hidden;
        font-size: 14px;
    }

    .svg-external-icon {
        /*background-color: currentColor;*/
        mask-size: cover !important;
        /*display: inline-block;*/
    }

    .el-scrollbar {
        max-height: 100%;
    }

    .el-menu {
        border-radius: 6px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        box-shadow: 0 2px 10px #999;
        -moz-box-shadow: #999 0 2px 10px;
        -webkit-box-shadow: #999 0 2px 10px;
    }

    .el-menu--collapse {
        width: unset;
        /* width: 64px; */
    }

    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }

    .el-menu-item {
        height: 35px;
        line-height: 35px;
    }

    .el-menu-item, .el-submenu__title {
        height: 35px;
        line-height: 35px;
        padding-left: 24px;
    }

    .el-submenu__icon-arrow {
        right: 15px;
    }

    .el-scrollbar__wrap {
        margin-bottom: 0;
    }

    // when function collapsed
    .el-menu--vertical {
        & > .el-menu {
            .icon {
                margin-right: 15px;
            }
        }

        .nest-menu .el-submenu > .el-submenu__title,
        .el-menu-item {
            &:hover {
                // you can use $subMenuHover background-color: $menuHover !important;
            }
        }

        // the scroll bar appears when the subMenu is too long

        > .el-menu--popup {
            max-height: 100vh;
            overflow-y: auto;

            &::-webkit-scrollbar-track-piece {
                background: #d3dce6;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background: #99a9bf;
                border-radius: 20px;
            }
        }
    }
</style>
