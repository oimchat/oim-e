<template>
    <div ref="messageScrollPane"
         class="only-full-pane outer"
         style="overflow-y: auto;overflow-x: hidden"
         @scroll="handleScroll" @mousewheel="handleMousewheel" v-viewer="viewerOptions">
        <div class="inner">
            <template v-for="item of items">
                <template v-if="item.type===wrapType.message">
                    <MessageContentPane :data="item"></MessageContentPane>
                </template>
                <template v-if="item.type===wrapType.prompt">
                    <PromptContentPane :data="item"></PromptContentPane>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessageContentPane from '@/views/common/message/MessageContentPane.vue';
    import PromptContentPane from '@/views/common/message/PromptContentPane.vue';
    import ContentWrapType from '@/common/vue/data/content/ContentWrapType';
    import ReadMapper from '@/views/component/chat/ReadMapper';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';

    @Component({
        components: {
            MessageContentPane,
            PromptContentPane,
        },
    })
    export default class ReadPane extends Vue {

        @Prop({
            type: Array,
            required: false,
            default: () => ([]),
        })
        public items!: ContentWrap [];
        private wrapType = ContentWrapType;

        @Prop({
            type: ReadMapper,
            required: false,
            default: () => (new ReadMapper()),
        })
        private data!: ReadMapper;

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

        public mounted() {
            this.initialize();
        }

        public initialize() {
            const messageScrollPaneName = 'messageScrollPane';
            const messageScrollPaneView: any = this.$refs[messageScrollPaneName];
            if (messageScrollPaneView instanceof Element) {
                const scrollElement = messageScrollPaneView as Element;
                this.data.setScrollElement(scrollElement);
            }
        }

        private handleMousewheel(e: Event) {
            const own = this;
            if (e instanceof WheelEvent) {
                const ev: WheelEvent = e as WheelEvent;

                const deltaY = e.deltaY;

                if (deltaY < 0) {
                    // 向上
                    const target = ev.target;
                    // const node = target as Element;
                    const node = this.data.getScrollElement();
                    const top = node.scrollTop;

                    if (top === 0) {
                        own.data.scrollData.scrollTopCount++;
                        if (own.data.scrollData.scrollTopCount > 3) {
                            own.data.scrollData.scrollTopCount = 0;
                            own.onTop();
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

        @Emit('on-scroll')
        private onScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            // no
        }

        @Emit('on-scroll-top')
        private onTop() {
            // no
        }
    }
</script>

<style lang="scss" scoped>
    /*.outer:hover .inner {*/
    /*    width: calc(100% + 17px);*/
    /*}*/
</style>
