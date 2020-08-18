<template>
    <div class="video">
        <div style="width:320px;">
            <video width="320" controls>
                <source :src="data.url">
                不支持播放的格式，请下载文件播放';
            </video>
        </div>
        <br>
        <label>文件： + {{data.name}} + |{{sizeText}}</label>
        <br>
        <a :file-url="data.url" target="_blank" :href="data.url" :download="data.name">点击下载</a>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';
    import VideoValue from '@/app/com/common/chat/item/VideoValue';

    @Component({
        components: {},
    })
    export default class ContentItemVideo extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any | VideoValue;


        get sizeText(): string {
            const data = this.data;
            const size = data.size;
            return ByteSizeUtil.getSizeText(size);
        }
    }
</script>

<style scoped>
    .video {
        position: relative;
    }

    .video img {
        max-width: 200px;
        max-height: 150px
    }

    .video .oim_chat_paly {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -27px;
        margin-left: -27px
    }

    .video .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        filter: alpha(opacity=50);
        -moz-opacity: .5;
        -khtml-opacity: .5;
        opacity: .5
    }


    .video .loading img {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -8px;
        margin-top: -8px
    }
</style>
