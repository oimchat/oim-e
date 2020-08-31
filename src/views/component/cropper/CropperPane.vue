<template>
    <div class="cropper-wrapper">
        <div class="img-box">
            <img class="cropper-image" :id="imgId" alt="">
        </div>
        <div class="right-con">
            <div v-if="preview" class="preview-box" :id="previewId"></div>
            <div class="button-box">
                <slot>
                    <Upload action="image/upload" :before-upload="beforeUpload"
                            :format="['jpg','jpeg','png']">
                        <Button style="width: 150px;" type="primary">上传图片</Button>
                    </Upload>
                </slot>
                <div v-show="insideSrc">
                    <div>
                        <button @click="rotate">
                            <i class="fas fa-sync-alt"/>
                        </button>
                    </div>
                    <div>
                        <button @click="shrink">
                            <i class="fas fa-compress-arrows-alt"/>
                        </button>
                        <button @click="magnify">
                            <i class="fas fa-search-plus"/>
                        </button>
                        <button @click="scale('X')">
                            <i class="fas fa-angle-double-down"/>
                        </button>
                        <button @click="scale('Y')">
                            <i class="fas fa-angle-double-up"/>
                        </button>
                    </div>
                    <div>
                        <button @click="move(0, -moveStep)">
                            <i class="fas fa-arrow-up"/>
                        </button>
                        <button @click="move(-moveStep, 0)">
                            <i class="fas fa-arrow-left"/>
                        </button>
                        <button @click="move(0, moveStep)">
                            <i class="fas fa-arrow-down"/>
                        </button>
                        <button @click="move(moveStep, 0)">
                            <i class="fas fa-arrow-right"/>
                        </button>
                        <button style="width: 150px;margin-top: 10px;" @click="crop">{{ cropButtonText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import CropperJs from 'cropperjs';
    import './index.less';
    import 'cropperjs/dist/cropper.min.css';
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class CropperPane extends Vue {
        private cropper: CropperJs | null = null;
        private insideSrc = '';


        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private src!: string;
        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private preview !: boolean;

        @Prop({
            type: Number,
            required: false,
            default: () => (4),
        })
        private moveStep!: number;
        @Prop({
            type: String,
            required: false,
            default: () => ('裁剪'),
        })
        private cropButtonText !: string;

        public mounted() {
            this.initialize();
        }

        public initialize() {
            this.$nextTick(() => {
                const dom = document.getElementById(this.imgId);
                if (dom) {
                    this.cropper = new CropperJs(dom as HTMLImageElement, {
                        preview: `#${this.previewId}`,
                        checkCrossOrigin: true,
                    });
                }
            });
        }

        private beforeUpload(file: File) {
            const own = this;
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent) => {
                if (event && event.target) {
                    if (event.target instanceof FileReader) {
                        const u = (event.target as FileReader).result;
                        if (typeof u === 'string') {
                            own.insideSrc = u.toString();
                        }
                    }
                }
            };
            reader.readAsDataURL(file);
            return false;
        }

        private replace(src: string) {
            if (this.cropper) {
                this.cropper.replace(src);
            }
            this.insideSrc = src;
        }

        private rotate() {
            if (this.cropper) {
                this.cropper.rotate(90);
            }
        }

        private shrink() {
            if (this.cropper) {
                this.cropper.zoom(-0.1);
            }
        }

        private magnify() {
            if (this.cropper) {
                this.cropper.zoom(0.1);
            }
        }

        private scale(d: string) {
            if (this.cropper) {
                (this.cropper as any)[`scale${d}`](-(this.cropper as any).getData()[`scale${d}`]);
            }
        }

        private move(offsetX: number, offsetY?: number) {
            if (this.cropper) {
                this.cropper.move(offsetX, offsetY);
            }
        }

        private crop() {
            const own = this;
            if (this.cropper) {
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                    // this.$emit("on-crop", blob);
                    own.onCrop(blob as any);
                });
            }
        }


        @Watch('src')
        private srcUpdate(src: string) {
            this.replace(src);
        }

        @Watch('insideSrc')
        private insideSrcUpdate(src: string) {
            this.replace(src);
        }

        @Emit('on-crop')
        private onCrop(blob: Blob) {
            // no
        }

        get imgId() {
            const uid = (this as any)._uid;
            return `cropper${uid}`;
        }

        get previewId() {
            const uid = (this as any)._uid;
            return `cropper_preview${uid}`;
        }
    }
</script>
<style scoped>

    button {
        border: none;
        color: white;
        overflow: hidden;
        margin: 5px;
        padding: 7px;
        cursor: pointer;
        background-color: #00897b;
        border-radius: 7px;
    }
</style>
