<template>
    <div class="im-top" style="-webkit-app-region: drag">
        <a class="window-button" href="javascript:void(0)" @click="close" style="-webkit-app-region: no-drag">
            <!--            <Icon type="ios-close" class="text-right"></Icon>-->
            <q-icon name="mdi-window-close"></q-icon>
        </a>
        <a class="window-button" v-if="!windowDecorated.isMax" href="javascript:void(0)" @click="max"
           style="-webkit-app-region: no-drag">
            <!--            <Icon type="ios-square-outline" class="text-right"></Icon>-->
            <q-icon name="mdi-window-maximize"></q-icon>
        </a>
        <a class="window-button" v-if="windowDecorated.isMax" href="javascript:void(0)" @click="restore"
           style="-webkit-app-region: no-drag">
            <q-icon name="mdi-window-restore"></q-icon>
            <!--            <Icon type="ios-browsers-outline" class="text-right"></Icon>-->
        </a>
        <a class="window-button" href="javascript:void(0)" @click="min" style="-webkit-app-region: no-drag">
            <!--            <Icon type="ios-remove" class="text-right"></Icon>-->
            <q-icon name="mdi-window-minimize"></q-icon>
        </a>
    </div>
</template>

<script lang="ts">

    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import decorated from '@/platform/e/window/WindowDecorated';

    @Component({
        components: {},
    })
    export default class WindowDecorated extends Vue {
        private icon: string = 'ios-square-outline';
        private windowDecorated = decorated;

        private min() {
            decorated.min();
        }

        private max() {
            decorated.max();
            this.windowDecorated.isMax = true;
            this.icon = this.icon === 'ios-square-outline' ? 'ios-browsers-outline' : 'ios-square-outline';
        }

        private restore() {
            decorated.restore();
            this.windowDecorated.isMax = false;
            this.icon = this.icon === 'ios-square-outline' ? 'ios-browsers-outline' : 'ios-square-outline';
        }

        private close() {
            decorated.hide();
        }
    }
</script>

<style lang="scss">
    $top-height: 4rem;
    $color-online: #d1ffe9;
    $color-write: #ffffff;
    $color-main: #2590c2;
    $color-light-main: #69cbe9;
    $color-gray: #dddddd;
    $color-light-gray: #eeeeee;
    $color-default: #000000;
    $box-shadow: #aaaaaa;
    $color-message-bg: #5fb878;

    .im-top {
        /* height: $top-height; */
        position: absolute;
        z-index: 9999;
        right: 0;
        width: 100%;

        a {
            display: inline-block;
            color: $color-write;
            float: right;

            i {
                color: $color-default;
                font-weight: bolder;
                font-size: 1.2rem;
                width: 30px;
            }

            :hover {
                background-color: $color-gray;
            }

            .text-right {
                float: right;
                width: 2.4rem;
                height: 2.4rem;
                display: inline-block;
                padding: 0.5rem;
                text-align: center;
            }
        }

        .window-button {
            /*width: 28px;*/
            /*height: 25px;*/
        }
    }
</style>
