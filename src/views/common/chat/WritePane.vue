<template>
    <div>
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
            </div>
            <FacePane ref="facePane" @on-selected="onFaceSelected"></FacePane>
            <div class="content ">
                <pre ref='inputArea' @paste.native.capture.prevent="handlePaste"
                     @keypress="onKeypress"
                     @keyup="onKeyup"
                     class="flex edit_area"
                     contenteditable="true"></pre>
                <span class="caret_pos_helper"></span>
            </div>
            <div class="action">
                <span class="desc ">按下Shift+Enter换行</span>
                <a @click='send' class="oim_button oim_button_send" href="javascript:;">发送</a>
            </div>
        </div>
        <!--end FT-->
        <div class="catch-drop-area"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import FacePane from '@/views/common/chat/FacePane.vue';
    import DocumentUtil from '@/app/common/util/DocumentUtil';
    import app from '@/app/App';
    import {ServerType, Protocol} from '@/app/common/config/constant/ServerConstant';
    import ServerController from '@/app/com/main/controller/ServerController';
    import emojiImageBox from '@/app/lib/EmojiImageBox';

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

                    if (e instanceof ClipboardEvent) {
                        const ce: ClipboardEvent = e as ClipboardEvent;
                        // Prevent the default pasting event and stop bubbling
                        e.preventDefault();
                        e.stopPropagation();

                        // Get the clipboard data
                        let html = '';
                        let text = '';
                        const clipboardData = ((window as any).clipboardData || e.clipboardData);
                        if (clipboardData) {
                            html = (clipboardData).getData('text/html');
                            text = (clipboardData).getData('text/plain');

                            const items = clipboardData.items;
                            for (const item of items) {
                                if (item.kind === 'file') {
                                    const file = item.getAsFile();
                                    if (file) {
                                        // todo
                                    }
                                }
                            }
                        }
                        if (html !== '') {
                            // .replace(/<br([^<>]+|\s?)>/ig,‘||||‘);//替换br标签
                            html = html.replace(/<(?!(img|IMG))[^>]*>/ig, '');
                        } else {
                            html = text;
                        }
                        if (html !== '') {
                            own.insertHtmlAtCursor(html);
                        }
                    }
                });

                // inputAreaElement.addEventListener('',(e:KeyboardEvent)=>{})
            }


            const serverController: ServerController = app.appContext.getMaterial(ServerController);
            const address = serverController.getAddress(ServerType.file, Protocol.HTTP);
            if (!address || !address.enabled) {
                this.uploadInfo.fileDisabled = true;
                this.uploadInfo.imageDisabled = true;
            } else {
                const fileHttp = address.address + '/v1/file/upload';
                const imageHttp = address.address + '/v1/image/upload';
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

            if (data && data.body && data.body.data) {


                const imageData = data.body.data;
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
    }

</script>

<style lang="less">
    .chat_send_file_list {
        > .ivu-upload-list {
            float: right;
            overflow-y: auto;
            max-height: 130px;
        }
    }
</style>
