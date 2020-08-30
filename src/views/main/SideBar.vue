<template>
    <div class="sidebar">
        <div class="sidebar-tab">
            <ul>
                <li v-for="item of tabs">
                    <SideTab :data="item" :box="box" v-on:on-selected="selectedTab"></SideTab>
                </li>
            </ul>
        </div>
        <div class="sidebar-tab-more" id="tab-more">
            <a id="bottom_menu" @click="onMenuClick" href="javascript:void(0);">
<!--                <img src="" alt=""/>-->
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import SideTab from './SideTab.vue';
    import SideTabBox from './SideTabBox';
    import SideTabData from './SideTabData';

    @Component({
        components: {
            SideTab,
        },
    })
    export default class SideBar extends Vue {
        private showMenu: boolean = false;
        // 接受父组件的值
        @Prop({
            type: Array, // 父组件传递给子组件的数据类型
            required: false, // 是否必填
            default: () => (new Array<SideTabData>()), // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
        })
        private tabs !: SideTabData[];

        @Prop({
            type: SideTabBox,
            required: false,
            default: () => (new SideTabBox()),
        })
        private box!: SideTabBox;

        public mounted() {
            //
        }

        private selectedTab(key: string) {
            this.onTabSelected(key);
        }

        @Emit('on-tab-selected')
        private onTabSelected(key: string) {
            // 选中
        }

        @Emit('on-button-click')
        private onMenuClick() {
            // 选中
        }
    }
</script>

<style scoped>

</style>
