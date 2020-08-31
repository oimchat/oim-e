<template>
    <div class="attach">
        <div class="attach_bd">
            <div class="cover">
                <img :src="icon" alt="icon">
            </div>
            <div class="cont">
                <p class="title ">{{data.name}}</p>
                <div class="opr">
                    <span class="">{{sizeText}}</span>
                </div>
            </div>
        </div>
        <div>
            <process-bar :progress="data.progress"></process-bar>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ProcessBar from '@/views/common/progress/ProcessBar.vue';
    import App from '@/app/App';
    import FileIconBox from '@/app/com/main/module/support/file/box/FileIconBox';
    import FileNameUtil from '@/app/common/util/FileNameUtil';
    import ByteSizeUtil from '@/app/common/util/ByteSizeUtil';
    import UploadValue from '@/views/common/message/data/UploadValue';

    @Component({
        components: {
            ProcessBar,
        },
    })
    export default class ContentItemFile extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any | UploadValue;

        get icon(): string {
            const data = this.data;
            const fileName = data.name;
            const extension = FileNameUtil.getSuffixName(fileName);
            const fileIconBox: FileIconBox = App.appContext.getMaterial(FileIconBox);
            const src = fileIconBox.getIcon(extension);
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
        margin-top: 20px
    }

    .attach_bd .cont .opr a {
        color: #35ac2f;
        text-decoration: none
    }

    .cover img {
        height: 65px;
        width: 65px;
    }

    .download {
        cursor: pointer;
        color: #00b0ff;
    }
</style>
