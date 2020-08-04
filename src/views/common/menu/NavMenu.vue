<template>
    <div class="menu-container" :style="axisComputed" v-if="isShow">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   :collapse="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
<!--        <el-menu-->
<!--                :default-active="data.activeMenu"-->
<!--                :collapse="data.collapse"-->
<!--                :unique-opened="false"-->
<!--                :collapse-transition="false"-->
<!--                :background-color="data.backgroundColor"-->
<!--                :text-color="data.textColor"-->
<!--                :active-text-color="data.activeTextColor"-->
<!--                mode="vertical"-->
<!--        >-->
<!--            <template v-for="item in data.items">-->
<!--                <nav-menu-item-->
<!--                        :data="item"/>-->
<!--            </template>-->
<!--        </el-menu>-->
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import NavMenuItem from '@/views/common/menu/NavMenuItem.vue';
    import NavMenuData from '@/views/common/menu/NavMenuData';

    @Component({
        components: {
            NavMenuItem,
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
        private isShow: boolean = true;
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
            document.addEventListener('click', () => {
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
            // if (this.border) {
            //     const bw = document.body.offsetWidth;
            //     const bh = document.body.offsetHeight;
            //     if (this.axis.x + this.offset.x + this.itemWidth >= bw) {
            //         this.axis.x = bw - this.itemWidth - this.borderWidth - this.offset.x;
            //     }
            //     if (this.axis.y + this.offset.y + this.itemHeight * this.list.length >= bh) {
            //         this.axis.y = bh - this.itemHeight * this.list.length - this.borderWidth - this.offset.y;
            //     }
            // }
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
    .menu-container {
        position: fixed;
        min-width: 160px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        z-index: 9999;
    }
</style>
