<template>
    <div class="voice">
        <div style="width:320px;">
            <audio width="320" controls>
                <source :src="data.url">
                不支持播放的格式，请下载文件播放';
            </audio>
        </div>
        <br>
        <label>文件： + {{data.name}} + </label>
        <br>
        <label>
            <a :file-url="data.url" target="_blank" :href="data.url"
               :download="data.name">点击下载</a>|<span>{{sizeText}}</span>
        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';
    import AudioValue from '@/app/com/common/chat/item/AudioValue';

    @Component({
        components: {},
    })
    export default class ContentItemVideo extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any | AudioValue;


        get sizeText(): string {
            const data = this.data;
            const size = data.size;
            return ByteSizeUtil.getSizeText(size);
        }
    }
</script>

<style scoped>
    .voice i {
        float: right
    }

    .right .voice .duration {
        left: -80px;
        text-align: right
    }
</style>
