<template>
    <div class="only-full-pane outer" style="overflow-y: auto;overflow-x: hidden"
         @scroll="handleScroll" @mousewheel="handleMousewheel" v-viewer="viewerOptions">
        <div class="inner">
            <template v-for="item of items">
                <template v-if="item.type===wrapType.message">
                    <ContentPane :data="item"></ContentPane>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContentPane from '@/views/common/chat/ContentPane.vue';
    import ContentWrap from "@/common/vue/data/content/ContentWrap";
    import ContentWrapType from "@/common/vue/data/content/ContentWrapType";

    @Component({
        components: {
            ContentPane,
        },
    })
    export default class ReadPane extends Vue {
        private wrapType = ContentWrapType;
        @Prop({
            type: Array,
            required: false,
            default: () => (new Array<ContentWrap>()),
        })
        private items!: ContentWrap[];

        private scrollData = {
            scrollTopCount: 0,
        }

        private viewerOptions = {
            toolbar: true, url: 'data-source', className: 'chat-img', filter: (img: any) => {
                let mark = false;
                if (img) {
                    const about = img.getAttribute('chat');
                    mark = about === 'chat_image';
                }
                return mark;
            },
        };


        private handleMousewheel(e: Event) {
            const own = this;
            if (e instanceof WheelEvent) {
                const ev: WheelEvent = e as WheelEvent;

                const deltaY = e.deltaY;

                if (deltaY < 0) {
                    // 向上
                    const target = ev.target;
                    const node = target as Element;
                    const height = node.scrollHeight;
                    const top = node.scrollTop;

                    const clientHeight = node.clientHeight;
                    let position = '';
                    const a = (height - top);
                    const b = (clientHeight + 25);

                    if (height === clientHeight) {
                        // 滚动条没有出来
                        if (top === 0) {
                            own.scrollData.scrollTopCount++;
                            if (own.scrollData.scrollTopCount > 3) {
                                own.scrollData.scrollTopCount = 0;
                                own.onTop();
                            }
                        }
                    } else {
                        if (top === 0) {
                            own.scrollData.scrollTopCount++;
                            if (own.scrollData.scrollTopCount > 3) {
                                own.scrollData.scrollTopCount = 0;
                                own.onTop();
                            }
                        }
                    }
                }
            }
        }

        private handleScroll(e: Event) {
            const own = this;
            const target = e.target;
            if (target instanceof Element) {
                const node = target as Element;
                const height = node.scrollHeight;
                const top = node.scrollTop;

                const clientHeight = node.clientHeight;
                let position = '';

                const a = (height - top);
                const b = (clientHeight + 25);

                if (a < b) {
                    position = 'bottom';
                } else if (top === 0) {
                    position = 'top';
                } else {
                    position = 'middle';
                }

                const info = {event: e, scrollHeight: height, scrollTop: top, scrollPosition: position};
                this.onScroll(info);
            }
        }

        private onScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            this.$emit('on-scroll', info);
        }

        private onTop() {
            this.$emit('on-top');
        }
    }
</script>

<style scoped>
    /*.outer:hover .inner {*/
    /*    width: calc(100% + 17px);*/
    /*}*/
</style>
