<template>
    <div class="only-full-pane" style="overflow: hidden">
        <div class="container">
            <div class="header">
                <div class="toolbar">
                    <button @click="showFacePane" title="表情" class="tool-icon-warp">
                        <i class="fas fa-laugh"></i>
                    </button>
                    <button class="tool-icon-warp" title="文件">
                        <el-upload
                            style="height: 20px;"
                            ref="fileUploadView"
                            multiple
                            :disabled="uploadInfo.fileDisabled"
                            :show-file-list="true"
                            :on-success="handleFileSuccess"
                            :action="uploadInfo.fileAction">
                            <i class="fas fa-folder-plus"></i>
                        </el-upload>
                    </button>
                    <button class="tool-icon-warp" itle="图片">
                        <el-upload
                            style="height: 20px;"
                            multiple
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PNG,.GIF,.BMP'"
                            :disabled="uploadInfo.imageDisabled"
                            :show-file-list="true"
                            :on-success="handleImageSuccess"
                            :before-upload="beforeImageUpload"
                            :action="uploadInfo.imageAction">
                            <i class="fas fa-image"></i>
                        </el-upload>
                    </button>
                    <button @click="openCode" class="tool-icon-warp" title="代码">
                        <i class="fas fa-code"></i>
                    </button>
                    <button v-if="writeExtendFunction.screenshot.has"
                            @click="writeExtendInvoke(writeExtendFunction.screenshot)"
                            class="tool-icon-warp"
                            href="javascript:void(0)"
                            title="截屏">
                        <i class="fas fa-cut"></i>
                    </button>
                    <slot></slot>
                </div>
            </div>
            <div class="middle">
                <div class="content ">
                    <pre ref='inputArea'
                         @keypress="onKeypress"
                         @keyup="onKeyup"
                         @input="onInput"
                         class="edit-area input-area"
                         contenteditable="true"/>
                    <span class="caret_pos_helper"></span>
                </div>
                <UploadListPane :data="uploadListMapper"></UploadListPane>
            </div>
            <div class="footer">
                <div class="action">
                    <span class="desc ">按下Shift+Enter换行</span>
                    <a @click='send' class="button button-send only-component-color" href="javascript:;">发送</a>
                </div>
            </div>
        </div>
        <FacePane ref="facePane" :data="faceModel" @on-selected="onFaceSelected"></FacePane>

        <Modal
            v-model="showCode"
            width="560"
            class="form-modal"
        >
            <p slot="header" style="text-align:center">
                <Icon type="ios-film-outline"></Icon>
                <span>发送代码</span>
            </p>
            <div style="width: 100%;height: 100%">
                <Card>
                    <div>
                        <Form :label-width="80">
                            <Form-item label="语言" prop="name">
                                <Select v-model="codeLanguage" filterable>
                                    <template v-for="name of codeNames">
                                        <Option :value="name">{{ name }}</Option>
                                    </template>
                                </Select>
                            </Form-item>
                            <Form-item label="代码" prop="introduce">
                                <Input v-model="codeContent" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                                       placeholder="请输入..."></Input>
                            </Form-item>
                        </Form>
                    </div>
                </Card>
            </div>
            <div slot="footer">
                <Button type="primary" @click="sendCode">
                    确定
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import FacePane from '@/views/component/face/FacePane.vue';
import DocumentUtil from '@/common/web/util/DocumentUtil';
import app from '@/app/App';
import {ServerType, Protocol} from '@/app/common/config/constant/ServerConstant';
import ServerController from '@/app/com/main/module/business/server/controller/ServerController';
import FileSeverApi from '@/app/com/main/module/support/file/constant/FileSeverApi';
import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
import PasteHandlerUtil from '@/common/web/util/PasteHandlerUtil';
import FileCheckUtil from '@/app/common/util/FileCheckUtil';
import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';
import FaceImageUtil from '@/common/web/common/face/FaceImageUtil';
import FaceModel from '@/views/component/face/FaceModel';
import WebContentAnalysisUtil from '@/common/web/util/WebContentAnalysisUtil';
import WriteMapper from '@/views/component/chat/WriteMapper';
import Content from '@/app/com/common/chat/Content';
import WebFileSupportUtil from '@/common/web/util/WebFileSupportUtil';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Section from '@/app/com/common/chat/Section';
import Item from '@/app/com/common/chat/Item';
import FileValue from '@/app/com/common/chat/item/FileValue';
import ContentUploadFileService from '@/app/com/main/module/support/file/service/ContentUploadFileService';
import FileNameUtil from '@/app/common/util/FileNameUtil';
import ImageValue from '@/app/com/common/chat/item/ImageValue';
import CodeValue from '@/app/com/common/chat/item/CodeValue';
import CodeMirrorBox from '@/common/web/common/code/CodeMirrorBox';
import ImageToFileUtil from '@/common/web/util/ImageToFileUtil';
import UploadListPane from '@/views/component/upload/UploadListPane.vue';
import UploadListMapper from '@/views/component/upload/UploadListMapper';
import DragHandlerUtil from '@/common/web/util/DragHandlerUtil';
import WriteExtendData from '@/views/component/chat/extend/WriteExtendData';
import WriteExtendFunction from '@/views/component/chat/extend/WriteExtendFunction';

@Component({
    components: {
        FacePane,
        UploadListPane,
    },
})
export default class WritePane extends Vue {
    private uploadInfo = {
        fileAction: '',
        fileDisabled: false,
        imageAction: '',
        imageDisabled: false,
    };

    @Prop({
        type: WriteMapper,
        required: false,
        default: () => (new WriteMapper()),
    })
    private data!: WriteMapper;

    private faceModel: FaceModel = new FaceModel();
    private showCode = false;
    private codeLanguage: string = '';
    private codeContent: string = '';
    private codeNames: string[] = [];
    private uploadListMapper: UploadListMapper = new UploadListMapper();
    private writeExtendFunction: WriteExtendFunction = new WriteExtendFunction();

    public mounted() {
        this.initializeCodes();
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

    private initializeCodes() {
        const box: CodeMirrorBox = app.appContext.getMaterial(CodeMirrorBox);
        this.codeNames = box.names;
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
                        own.insertImage(file);
                    }, (files: File[]) => {
                        own.uploadFiles(files);
                    });
            });

            inputAreaElement.addEventListener('drop', (e: Event) => {
                DragHandlerUtil.handle(e,
                    (html: string) => {
                        own.insertHtmlAtCursor(html);
                    },
                    (file: File) => {
                        own.insertImage(file);
                    }, (files: File[]) => {
                        own.uploadFiles(files);
                    });
            }, false);
            inputAreaElement.addEventListener('dragleave', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            inputAreaElement.addEventListener('dragenter', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            inputAreaElement.addEventListener('dragover', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            this.data.setElement(inputAreaElement);
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
        this.doOnKeyup(e, inputArea as Element);
    }

    private onInput(e: InputEvent) {
        const inputAreaPaneName = 'inputArea';
        const inputArea = this.$refs[inputAreaPaneName];
        this.doOnInput(e, inputArea as Element);
    }


    private showFacePane(e: Event) {
        if (e instanceof MouseEvent) {
            const me = e as MouseEvent;
            this.faceModel.show(me.clientX, me.clientY);
        }
    }

    private shot(e: Event) {
        const own = this;
        // const path=screenShot.getPath();
        // this.$Notice.warning({
        //     title: 'Path',
        //     desc: path,
        // });

        // screenShot.shot((file: File) => {
        //     own.uploadImage(file);
        // });
    }

    private writeExtendInvoke(extend: WriteExtendData) {
        if (extend) {
            const data = this.data;
            extend.invoke(data);
        }
    }

    private onFaceSelected(face: FaceItem) {
        if (face) {
            const html = FaceImageUtil.createFaceImageHtml(face);
            this.insertHtmlAtCursor(html);
        }
    }


    private send() {
        const own = this;
        const inputAreaPaneName = 'inputArea';
        const inputArea = this.$refs[inputAreaPaneName];
        if (inputArea) {
            const area = inputArea as any;
            const childNodes = area.childNodes;
            if (childNodes) {
                const content = WebContentAnalysisUtil.getContent(childNodes);
                if (content) {
                    own.onSend(content);
                }
            }
        }
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
    }


    private handleFileSuccess(data: any, file: any, fileList: File[]) {
        if (file.raw) {
            file = file.raw;
        }
        this.handleFileSend(data, file);
        if (fileList) {
            const index = fileList.indexOf(file);
            if (index > -1) {
                fileList.splice(index, 1);
            } else {
                fileList.splice(0, fileList.length);
            }
        }
    }

    private handleImageSuccess(data: any, file: any, fileList: File[]) {
        if (fileList) {
            const index = fileList.indexOf(file);
            if (index > -1) {
                fileList.splice(index, 1);
            } else {
                fileList.splice(0, fileList.length);
            }
        }

        if (data && data.body) {

            let type = '';
            if (file.raw) {
                type = file.raw.type;
            } else {
                type = file.type;
            }


            const imageData = data.body;
            const id = imageData.id;
            const name = imageData.name;
            const size = imageData.size;
            const url = imageData.url;
            const path = imageData.path;

            const iv: ImageValue = new ImageValue();
            iv.id = id;
            iv.name = name;
            iv.url = url;
            iv.size = size;
            iv.type = type;
            iv.extension = FileNameUtil.getSuffixName(name);

            const value = BaseUtil.objectToJson(iv);
            const html = '<img style="max-width: 60%" src="' + url + '" value=\'' + value + '\' />';
            this.insertHtmlAtCursor(html);
        }
    }


    private beforeImageUpload(file: File) {
        const maxSiz = (1024 * 1024 * 2);
        const isImage = WebFileSupportUtil.isSupportImageByFile(file);
        let checkMaxSize = false;
        if (!isImage) {
            this.handleImageFormatError(file);
        } else {
            checkMaxSize = FileCheckUtil.checkMaxSize(maxSiz, file);
            if (!checkMaxSize) {
                this.handleImageMaxSize(file);
            }
        }
        return isImage && checkMaxSize;
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

    private insertImage(file: File): void {
        const own = this;
        ImageToFileUtil.imageFile2Base64(file, (base64) => {
            const html = '<img style="max-width: 60%" src="' + base64 + '"  />';
            own.insertHtmlAtCursor(html);
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
                    const type = file.type;

                    const data = ur.result.body;
                    const id = data.id;
                    const name = data.name;
                    const size = data.size;
                    const url = data.url;

                    const iv: ImageValue = new ImageValue();
                    iv.id = id;
                    iv.name = name;
                    iv.url = url;
                    iv.size = size;
                    iv.type = type;
                    iv.extension = FileNameUtil.getSuffixName(name);

                    const value = BaseUtil.objectToJson(iv);
                    const html = '<img style="max-width: 60%" src="' + url + '" value=\'' + value + '\' />';
                    own.insertHtmlAtCursor(html);
                }
            }
        });
    }


    private uploadFiles(files: File[]): void {
        if (files) {
            const own = this;
            const uploadListMapper = this.uploadListMapper;
            for (const f of files) {
                uploadListMapper.upload(f, (data, file) => {
                    own.handleFileSend(data, file);
                });
            }
        }
    }

    private uploadFile(file: File): void {
        const own = this;
        const key = '1.png';
        const map: Map<string, File> = new Map<string, File>();
        map.set(key, file);
        const uploadFileService: ContentUploadFileService = app.appContext.getMaterial(ContentUploadFileService);
        uploadFileService.uploadFile(file, (success, uploadResult, message) => {
            if (uploadResult && uploadResult.result && uploadResult.result.body) {
                const data = uploadResult.result;
                own.handleFileSend(data, file);
            }
        });
    }

    private handleFileSend(data: any, file: File) {
        const own = this;
        if (data && data.body) {

            const type = file.type;

            const fileData = data.body;
            const id = fileData.id;
            const name = fileData.name;
            const size = fileData.size;
            const url = fileData.url;
            const path = fileData.path;


            const content: Content = new Content();
            const section: Section = new Section();
            content.sections.push(section);


            const item: Item = new Item();
            item.type = Item.TYPE_FILE;

            const iv: FileValue = new FileValue();
            iv.id = id;
            iv.name = name;
            iv.size = size;
            iv.url = url;
            iv.type = type;
            iv.extension = FileNameUtil.getSuffixName(name);

            item.value = iv;
            section.items.push(item);

            const isVideo = WebFileSupportUtil.isSupportVideoByName(name);
            const isAudio = WebFileSupportUtil.isSupportAudioByName(name);
            const isImage = WebFileSupportUtil.isSupportImageByName(name);
            if (isVideo) {
                iv.url = path;
                item.type = Item.TYPE_VIDEO;
            } else if (isAudio) {
                iv.url = path;
                item.type = Item.TYPE_AUDIO;
            } else if (isImage) {
                iv.url = path;
                item.type = Item.TYPE_IMAGE;
            }
            own.onFile(content);
        }
    }

    private openCode() {
        this.showCode = !this.showCode;
    }

    private sendCode() {
        const own = this;
        this.showCode = false;
        const codeContent = this.codeContent;
        const codeLanguage = this.codeLanguage;
        if (BaseUtil.isNotEmpty(codeContent)) {
            this.codeContent = '';

            const cv: CodeValue = new CodeValue();
            cv.content = codeContent;
            cv.language = codeLanguage;

            const item: Item = new Item();
            item.type = Item.TYPE_CODE;
            item.value = cv;

            const section: Section = new Section();
            section.items.push(item);

            const content: Content = new Content();
            content.sections.push(section);

            own.onFile(content);
        }
    }

    @Emit('on-send')
    private onSend(content: Content) {
        // no
    }

    @Emit('on-key-press')
    private keypress(evt: KeyboardEvent, e: Element) {
        // no
    }

    @Emit('on-key-up')
    private doOnKeyup(evt: KeyboardEvent, e: Element) {
        // no
    }

    @Emit('on-input')
    private doOnInput(evt: InputEvent, e: Element) {
        // no
    }

    @Emit('on-file-content')
    private onFile(content: Content) {
        // no
    }
}
</script>
<style lang="scss">
.tool-icon-warp {
    .el-upload-list {
        position: absolute;
        right: 20px;
        z-index: 1024;
    }
}
</style>
<style lang="scss" scoped>

.container {
    background: #fff;
    margin: 0 auto;
    height: 100%;
}

.header {
    height: 40px;
    /*background: pink;*/
}

.middle {
    height: calc(100% - 80px);
}

.footer {
    min-height: 40px;
    height: 40px;
    padding: 0px;
    /*background: pink;*/
}


.toolbar {
    height: 100%;
    padding: 8px 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}

.tool-icon-warp {
    //text-align: center;
    //display: inline-block;
    padding: 2px 2px;
    margin-left: 5px;
    margin-right: 5px;
    //cursor: pointer;
    background: transparent;
    border: transparent;
    //overflow: hidden;
    //text-overflow: ellipsis;
    //white-space: nowrap;
    //word-wrap: normal;
    //vertical-align: middle;

    justify-content: center;
    border-radius: 4px;
    align-items: center;

    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    outline: 0;
    position: relative;

    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    vertical-align: middle;
    white-space: nowrap;

    i {
        color: #979797;
        font-size: 1.3rem;
    }
}

.tool-icon-warp:hover {
    background-color: #d0caca;
}

.content {
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    border: 0;
    font-size: 14px;
}

.input-area {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border: 0;
    outline: 0;
    line-height: inherit;
    background-color: transparent;
    color: inherit;
    font-family: inherit
}

.edit-area {
    position: relative
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
</style>
