<template>
    <div>
        <form ref='downloadForm' :action='action'></form>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import app from '@/app/App';
    import FileDownload from '@/app/com/main/component/FileDownload';

    @Component({
        components: {},
    })
    export default class DownloadFormPane extends Vue {
        private action = '';

        public mounted() {
            const own = this;
            const fileDownload: FileDownload = {
                download(url: string): void {
                    own.doDownload(url);
                },
            } as FileDownload;
            app.appContext.putObject(FileDownload, fileDownload);
        }

        private doDownload(url: string) {
            this.action = url;
            const paneName = 'downloadForm';
            const pane: any = this.$refs[paneName];
            pane.submit();
        }
    }
</script>

<style scoped>

</style>
