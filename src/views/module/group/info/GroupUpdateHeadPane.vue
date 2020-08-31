<template>
    <Modal
            v-model="show"
            width="660"
            class="form-modal"
    >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>上传头像</span>
        </p>
        <div style="width: 100%;height: 100%">
            <CropperPane @on-crop="onCrop"></CropperPane>
        </div>
        <div slot="footer">
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import CropperPane from '@/views/component/cropper/CropperPane.vue';

    import app from '@/app/App';
    import GroupBusinessController from '@/app/com/main/module/business/group/controller/GroupBusinessController';

    @Component({
        components: {
            CropperPane,
        },
    })
    export default class GroupUpdateHeadPane extends Vue {
        private show: boolean = false;
        private groupId: string = '';

        public mounted() {
            // no
        }

        public setShow(show: boolean): void {
            this.show = show;
        }

        public setGroupId(groupId: string) {
            this.groupId = groupId;
        }

        private onCrop(blob: Blob) {
            const own = this;
            if (blob) {
                const groupId = this.groupId;
                const lastModified: number = new Date().getTime();
                const fp = {
                    type: 'image/png',
                    lastModified,
                } as FilePropertyBag;


                const file = new File([blob], 'head.png', fp);
                const controller: GroupBusinessController = app.appContext.getMaterial(GroupBusinessController);

                controller.updateHead(groupId, file, (success: boolean, url: string) => {
                    if (success) {
                        own.$Notice.success({
                            title: '成功',
                            desc: '修改成功',
                        });
                        own.setShow(false);
                        own.onDone(url);
                    } else {
                        own.$Notice.warning({
                            title: '失败',
                            desc: '上传失败',
                        });
                    }
                });
            }
        }

        @Emit('on-done')
        private onDone(url: string) {
            // no
        }
    }
</script>

<style scoped>

</style>
