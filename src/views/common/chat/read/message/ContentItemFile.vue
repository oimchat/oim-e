<template>
    <div class="attach">
        <div class="attach_bd">
            <div class="cover">
                <img :src="src" alt="icon">
            </div>
            <div class="cont">
                <p class="title ">{{data.name}}</p>
                <div class="opr">
                    <span class="">{{sizeText}}</span>
                    <span class="sep">|</span>
                    <a :href="data.url" :download="data.name" :file-url="data.url" class="" target="_blank">下载</a>
                </div>
            </div>
        </div>
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
    export default class ContentItemFile extends Vue {
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
    .attach {
        padding: 10px;
        background-color: #fff;
        min-height: 75px;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        min-width: 250px;
        max-width: 300px;
        margin: 2px;
        position: relative
    }

    .attach:after {
        display: none;
        content: "";
        position: absolute;
        top: 8px;
        right: -13px;
        z-index: 99;
        border: 7px solid transparent;
        border-left-color: #fff
    }

    .attach_bd .cover {
        display: table-cell;
        padding-right: 10px
    }

    .attach_bd .cont {
        display: table-cell;
        vertical-align: top
    }

    .attach_bd .cont .title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        max-width: 200px
    }

    .attach_bd .cont .opr {
        margin-top: 25px
    }

    .attach_bd .cont .opr a {
        color: #35ac2f;
        text-decoration: none
    }

    .cover img {
        height: 60px;
        width: 60px;
    }
</style>
