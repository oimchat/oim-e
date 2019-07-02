<template>
    <div class="wrap" @click="onClick">
        <img class="sidebar-tab-icon" :src="data.image" :alt="data.prompt" height="36" width="36"/>
        <div :class="data.red?'sidebar-tab-notice':''">{{data.redCount>0?data.redCount:''}}</div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import SideTabBox from './SideTabBox';
    import SideTabData from './SideTabData';

    @Component({})
    export default class SideTab extends Vue {
        @Prop({
            type: SideTabData,
            required: false,
            default: () => (new SideTabData()),
        })
        private data!: SideTabData;

        @Prop({
            type: SideTabBox,
            required: false,
            default: () => (new SideTabBox()),
        })
        private box!: SideTabBox;


        public mounted() {
            if (this.data && this.data.selected) {
                this.onClick();
            }
        }

        public onClick() {
            if (this.box) {
                this.box.select(this.data);
                // this.selectedWatch();
            }
        }

        private selectedWatch() {
            if (this.data && this.data.selected) {
                // this.$emit('on-selected','122');
                this.selected(this.data.key);
            }
        }

        @Emit('on-selected')
        private selected(key: string) {
            // 选中
        }
    }
</script>

<style scoped>

</style>
