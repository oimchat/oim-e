<template>
    <div class="" v-viewer="viewerOptions">
        <div v-for="item of items">
            <ContentPane :data="item"></ContentPane>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContentPane from './ContentPane.vue';
    import ContentData from '../../../platform/vue/view/model/chat/content/ContentData';

    @Component({
        components: {
            ContentPane,
        },
    })
    export default class MessagePane extends Vue {
        @Prop({
            type: Array,
            required: false,
            default: () => (new Array<ContentData>()),
        })
        private items!: ContentData[];

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

        private handleScroll(d: any) {
            const t = '';
        }
    }
</script>

<style scoped>

</style>
