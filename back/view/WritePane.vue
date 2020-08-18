<template>
    <div class="only-full-pane" style="overflow: hidden">
        <div class="box_ft">
            <div class="toolbar">
                <a @click="showFacePane" unselectable="on" onmousedown="return false;" class="oim_chat_face"
                   href="javascript:;" title="表情"></a>
                <!--                <a class="oim_chat_screencut " href="javascript:;" title="截屏"></a>-->
                <Upload class='chat_send_file_list' style="display: inline;"
                        multiple
                        :disabled="uploadInfo.fileDisabled"
                        :show-upload-list="true"
                        :on-success="handleSuccess"
                        :action="uploadInfo.fileAction">
                    <a class="oim_chat_pic" title="文件">
                    </a>
                </Upload>
                <Upload class='chat_send_file_list' style="display: inline;"
                        multiple
                        :format="['jpg','jpeg','png','gif','bmp']"
                        :max-size="2048"
                        :disabled="uploadInfo.imageDisabled"
                        :show-upload-list="true"
                        :on-success="handleImageSuccess"
                        :on-format-error="handleImageFormatError"
                        :on-exceeded-size="handleImageMaxSize"
                        :action="uploadInfo.imageAction">
                    <Icon type="ios-image" style="font-size: 30px" title="图片"/>
                </Upload>
                <div class='chat_send_file_list' style="display: inline;height: 30px">
                    <div style="position: absolute;display: inline;padding-top: 2px;padding-left: 3px;">
                        <i @click="shot" class="fa fa-scissors fa-2x" aria-hidden="true"
                           style="color: #2b2b2b;"
                        ></i>
                    </div>
                </div>
            </div>
            <FacePane ref="facePane" @on-selected="onFaceSelected"></FacePane>
            <div class="content ">
                <pre ref='inputArea'
                     @keypress="onKeypress"
                     @keyup="onKeyup"
                     class="flex edit-area"
                     contenteditable="true">
                </pre>
                <span class="caret_pos_helper"></span>
            </div>
            <div class="action">
                <span class="desc ">按下Shift+Enter换行</span>
                <a @click='send' class="button button-send" href="javascript:;">发送</a>
            </div>
        </div>

        <!--end FT-->
        <div class="catch-drop-area"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import FacePane from '../../src/views/common/face/FacePane.vue';
    import DocumentUtil from '@/common/web/util/DocumentUtil';
    import app from '@/app/App';
    import {ServerType, Protocol} from '@/app/common/config/constant/ServerConstant';
    import ServerController from '@/app/com/main/module/business/server/controller/ServerController';
    import emojiImageBox from '@/app/lib/EmojiImageBox';
    import FileSeverApi from '@/app/com/main/module/support/file/constant/FileSeverApi';
    import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
    import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
    import screenShot from '@/platform/e/module/ScreenShotInvoke';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import TextJudgeUtil from '@/app/lib/util/TextJudgeUtil';
    import TextValueJudgeUtil from '@/common/web/util/TextValueJudgeUtil';
    import PasteHandlerUtil from '@/common/web/util/PasteHandlerUtil';

    @Component({
        components: {
            FacePane,
        },
    })
    export default class WritePane extends Vue {

        private uploadInfo = {
            fileAction: '',
            fileDisabled: false,
            imageAction: '',
            imageDisabled: false,
        };

        public mounted() {
            this.initialize();
        }

        public insertHtmlAtCursor(html: string) {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            DocumentUtil.insertAtCursor(inputArea as Element, html);
        }

        public setInnerHTML(html: string) {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            (inputArea as Element).innerHTML = html;
        }

        public getInnerHTML(): string {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            return (inputArea as Element).innerHTML;
        }

        private initialize() {
            const own = this;
            // todo
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            if (inputArea instanceof Element) {
                const inputAreaElement = inputArea as Element;
                (inputArea as Element).addEventListener('paste', (e: Event) => {
                    PasteHandlerUtil.handle(e,
                        (html: string) => {
                            own.insertHtmlAtCursor(html);
                        },
                        (file: File) => {
                            own.uploadImage(file);
                        }, (file: File) => {
                            own.uploadImage(file);
                        });
                });
                // inputAreaElement.addEventListener('',(e:KeyboardEvent)=>{})
            }


            const serverController: ServerController = app.appContext.getMaterial(ServerController);
            const address = serverController.getAddress(ServerType.file, Protocol.HTTP);
            if (!address || !address.enabled) {
                this.uploadInfo.fileDisabled = true;
                this.uploadInfo.imageDisabled = true;
            } else {
                const fileHttp = address.address + FileSeverApi.FILE_UPLOAD;
                const imageHttp = address.address + FileSeverApi.IMAGE_UPLOAD;
                this.uploadInfo.fileDisabled = false;
                this.uploadInfo.imageDisabled = false;
                this.uploadInfo.fileAction = fileHttp;
                this.uploadInfo.imageAction = imageHttp;
            }
        }

        private onKeypress(e: KeyboardEvent) {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            this.keypress(e, inputArea as Element);
            if (!e.shiftKey && e.keyCode === 13) {
                e.returnValue = false;
                this.send();
                return false;
            }
        }

        private onKeyup(e: KeyboardEvent) {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            this.keyup(e, inputArea as Element);
        }

        private showFacePane(e: Event) {
            const facePaneName = 'facePane';
            const facePane: any = this.$refs[facePaneName];
            facePane.setShow(true);
        }

        private shot(e: Event) {
            const own = this;
            // const path=screenShot.getPath();
            // this.$Notice.warning({
            //     title: 'Path',
            //     desc: path,
            // });
            screenShot.shot((file: File) => {
                own.uploadImage(file);
            });
        }

        private onFaceSelected(categoryId: string, value: string) {
            if (categoryId === 'emoji') {
                const p = emojiImageBox.getPictureByKey(value);
                if (p) {
                    const html = '<img src="assets/images/common/face/' + categoryId + '/' + p + '" value="' + categoryId + ',' + value + '" name="face" />';
                    this.insertHtmlAtCursor(html);
                } else {
                    this.insertHtmlAtCursor(value);
                }
            } else if (categoryId === 'classical') {
                const html = '<img src="assets/images/common/face/classical/gif/' + value + '.gif" value="' + categoryId + ',' + value + '" name="face" />';
                this.insertHtmlAtCursor(html);
            } else {
                const html = '<img src="assets/images/common/face/' + categoryId + '/' + value + '.png" value="' + categoryId + ',' + value + '" name="face" />';
                this.insertHtmlAtCursor(html);
            }
        }

        private send() {
            const inputAreaPaneName = 'inputArea';
            const inputArea = this.$refs[inputAreaPaneName];
            this.onSend(inputArea as Element);
        }

        private imageReader(item: DataTransferItem) {
            // var file = item.getAsFile(),
            //     reader = new FileReader();
            //
            // // 读取文件后将其显示在网页中
            // reader.onload = function( e ){
            //     var img = new Image();
            //
            //     img.src = e.target.result;
            //     document.body.appendChild( img );
            // };
            // // 读取文件
            // reader.readAsDataURL( file );
        };

        @Emit('on-send')
        private onSend(e: Element, files?: File[]) {
            // no
        }

        @Emit('on-key-press')
        private keypress(evt: KeyboardEvent, e: Element) {
            // no
        }

        @Emit('on-key-up')
        private keyup(evt: KeyboardEvent, e: Element) {
            // no
        }

        @Emit('on-file')
        private onFile(data: any, file: File) {
            // no
        }

        private handleSuccess(data: any, file: File, fileList: File[]) {
            this.onFile(data, file);
            if (fileList) {
                const index = fileList.indexOf(file);
                if (index > -1) {
                    fileList.splice(index, 1);
                } else {
                    fileList.splice(0, fileList.length);
                }
            }
        }

        private handleImageSuccess(data: any, file: File, fileList: File[]) {
            if (fileList) {
                const index = fileList.indexOf(file);
                if (index > -1) {
                    fileList.splice(index, 1);
                } else {
                    fileList.splice(0, fileList.length);
                }
            }

            if (data && data.body) {


                const imageData = data.body;
                const id = imageData.id;
                const name = imageData.name;
                const size = imageData.size;
                const url = imageData.url;


                const html = '<img style="max-width: 60%" src="' + url + '"/>';
                this.insertHtmlAtCursor(html);
            }
        }

        private handleImageFormatError(file: File) {
            this.$Notice.warning({
                title: '文件格式不支持',
                desc: '文件 ' + file.name + ' 不支持, 请选择图片文件！',
            });
        }

        private handleImageMaxSize(file: File) {
            this.$Notice.warning({
                title: '图片过大',
                desc: '图片文件  ' + file.name + ' 过大, 不能超过 2M！',
            });
        }

        private uploadImage(file: File): void {
            const own = this;
            const key = '1.png';
            const map: Map<string, File> = new Map<string, File>();
            map.set(key, file);
            const cuis: ContentUploadImageService = app.appContext.getMaterial(ContentUploadImageService);
            cuis.uploadImages(map, (success: boolean, rm: Map<string, UploadResult>, message?: string) => {
                if (success) {
                    const ur = rm.get(key);
                    if (ur && ur.result && ur.result.body) {
                        const data = ur.result.body;
                        const id = data.id;
                        const name = data.name;
                        const size = data.size;
                        const url = data.url;
                        const html = '<img style="max-width: 60%" src="' + url + '"/>';
                        own.insertHtmlAtCursor(html);
                    }
                }
            });
        }
    }

</script>

<style lang="scss" scoped>
    .chat_send_file_list {
        > .ivu-upload-list {
            float: right;
            overflow-y: auto;
            max-height: 130px;
        }
    }

    .box_ft {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0
    }

    .toolbar {
        height: 30px;
        padding: 5px 17px
    }

    .content .flex {
        height: 6em;
        overflow-y: auto;
        overflow-x: hidden;
        padding-left: 20px;
        outline: none;
        border: 0;
        font-size: 14px
    }

    .content input {
        border: 0;
        outline: 0;
        line-height: inherit;
        background-color: transparent;
        color: inherit;
        font-family: inherit
    }

    .action {
        text-align: right;
        margin-top: 5px;
        margin-right: 25px;
    }

    .desc {
        color: #888;
        font-size: 12px;
        margin-left: 10px;
        margin-right: 7px
    }

    .button {
        display: inline-block;
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        padding: 3px 20px;
        font-size: 14px
    }

    .button-send {
        background-color: #fff;
        color: #222;
        padding-left: 30px;
        padding-right: 30px
    }

    .button-send:hover {
        background-color: #f8f8f8
    }

    .edit-area .caret_pos_helper {
        position: relative
    }


    .container {
        background: #fff;
        margin: 0 auto;
        text-align: left;
    }

    .header {
        padding: 10px 0;
        background: pink;
    }

    .middle {
        padding: 10px 0;
    }

    .footer {
        padding: 0px;
        background: pink;
    }
</style>
