<template>
    <div v-show="data.visible" unselectable="on" onmousedown="return false;"
         :style="axisComputed"
         class="face-container" tabindex="-1">
        <div class="expression">
            <ul class="tab-bar">
                <template v-for="data of tabs">
                    <li @click="onTab(data.key)"
                        tab-name="face_tab"
                        :class="tab===data.key?'tab-bar-item active':'tab-bar-item'">
                        <a tab-name="face_tab" href="javascript:;">{{ data.name }}</a>
                    </li>
                </template>
            </ul>
            <div class="tab-pane-warp">
                <div class="tab-pane-warp-content">
                    <template v-for="item of items">
                        <div v-if="item.visible" :class="tab===item.id?'tab-pane active':'tab-pane'">
                            <div class="face">
                                <template v-for="face of item.faces">
                                    <a v-if="face.visible" :title="face.text" @click="onFace(face)"
                                       :style="getWarpSize(face)">
                                        <img :src="face.path" :title="face.text" :style="getImageSize(face)"
                                             alt="face"/>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import app from '@/app/App';
    import FaceBox from '@/app/com/main/module/support/face/box/FaceBox';
    import FaceCategory from '@/app/com/main/module/support/face/data/FaceCategory';
    import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';
    import FaceModel from '@/views/component/face/FaceModel';

    @Component({
        components: {},
    })
    export default class FacePane extends Vue {

        private tab = '';
        private tabs: Array<{ name: string, key: string }> = [];
        private items: FaceCategory[] = [];
        @Prop({
            type: FaceModel,
            required: false,
            default: () => (new FaceModel()),
        })
        private data!: FaceModel;


        public created() {
            this.initializeEvent();
        }

        public mounted() {
            this.initializeData();
        }

        private initializeData() {
            const own = this;
            const faceBox: FaceBox = app.appContext.getMaterial(FaceBox);
            this.items = faceBox.getFaceCategories();
            const items = this.items;
            const tabs: Array<{ name: string, key: string }> = [];
            for (const v of items) {
                if (v.visible) {
                    tabs.push({name: v.name, key: v.id});
                }
            }
            this.tabs = tabs;
            if (tabs.length > 0 && this.tab === '') {
                this.tab = tabs[0].key;
            }
        }

        private initializeEvent() {
            const own = this;
            document.addEventListener('click', (e) => {
                if (e.target instanceof Element) {
                    const n = e.target as Element;
                    const name = n.getAttribute('tab-name');
                    if (name !== 'face_tab') {
                        own.data.visible = false;
                    }
                } else {
                    own.data.visible = false;
                }

            }, true);
        }

        private onFace(value: FaceItem) {
            this.selected(value);
        }

        private onTab(tab: string) {
            this.tab = tab;
        }

        private getImageSize(face: FaceItem) {
            const height = face.height;
            const width = face.width;
            if (height && width) {
                return {
                    height: height + 'px',
                    width: width + 'px',
                };
            } else {
                return {};
            }
        }

        private getWarpSize(face: FaceItem) {
            let height = face.height;
            let width = face.width;
            if (height && width) {
                height = height + 4;
                width = width + 4;
                return {
                    height: height + 'px',
                    width: width + 'px',
                };
            } else {
                return {};
            }
        }

        get axisComputed() {
            const x = this.data.x;
            const y = this.data.y;
            const lx = x - 100;
            const ly = y - 250;
            return {
                top: ly + 'px',
                left: lx + 'px',
            };
        }

        @Emit('on-selected')
        private selected(value: FaceItem) {
            // 选中
        }
    }
</script>

<style scoped>

    .face-container {
        overflow-y: hidden;
        position: fixed;
        max-height: 250px;
        min-width: 160px;
        width: 420px;
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


    .tab-bar {
        padding: 8px 20px 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #dcdcdc
    }

    .tab-bar-item {
        float: left
    }

    .tab-bar-item.active {
        background-color: #fff;
        border-top-left-radius: 4px;
        -moz-border-radius-topleft: 4px;
        -webkit-border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        -moz-border-radius-topright: 4px;
        -webkit-border-top-right-radius: 4px
    }

    .tab-bar-item a {
        display: block;
        text-decoration: none;
        color: #333;
        padding: 5px 20px;
        font-size: 14px
    }

    .tab-pane-warp {
        position: relative;
        height: 210px;
        overflow-y: auto;
    }

    .tab-pane-warp-content {
        margin-bottom: 0px;
        margin-right: 0px;
    }


    .tab-pane {
        border-left: 1px solid #f0f0f0;
        border-top: 1px solid #f0f0f0;
        display: none;
        overflow: hidden;
        margin: 15px 10px;
        /*padding-right: 20px;*/
    }

    .tab-pane.active {
        display: block
    }


    .face {
        margin-right: -1px
    }

    .face a {
        float: left;
        /*width: 28px;*/
        /*height: 28px;*/
        font-size: 18px;

        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        cursor: pointer;
        text-align: center;
        /*padding-top: 2px;*/
        padding: 2px;
    }

    .face img {
        /*width: 24px;*/
        /*height: 24px;*/
        /*max-height: 50%;*/
        max-width: 100%;
    }

    .slide-top {
        /*transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94)*/
    }

    .expression {
        z-index: 20;
    }

    .expression:after, .expression:before {
        content: "";
        position: absolute;
        left: 16px;
        top: 100%;
        margin-left: -7px;
    }

    .expression:after {
        margin-top: -1px;
        border: 7px solid transparent;
        border-top-color: #fff
    }
</style>
