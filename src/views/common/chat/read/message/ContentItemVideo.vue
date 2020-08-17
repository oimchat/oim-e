<template>
    <div class="video">
        <img height="120" width="160" class="msg-img " src="" style="height: 960px; width: 540px;">
        <i class="oim_chat_paly "></i>
        <i class="arrow "></i>
        <p class="loading ng-hide">
            <img src="" alt="">
        </p>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import App from '@/app/App';
    import FileIconBox from '@/app/com/main/module/support/file/box/FileIconBox';
    import FileNameUtil from '@/app/common/util/FileNameUtil';
    import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';

    @Component({
        components: {},
    })
    export default class ContentItemVideo extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any | FileValue;

        get src(): string {
            const data = this.data;
            const fileName = data.name;
            const extension = FileNameUtil.getSuffixName(fileName);
            const fileIconBox: FileIconBox = App.appContext.getMaterial(FileIconBox);
            let src = fileIconBox.getIcon(extension);
            return src;
        }

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
        cursor: pointer
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
