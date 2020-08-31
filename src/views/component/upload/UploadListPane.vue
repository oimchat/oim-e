<template>
    <ul class="upload-list-pane">
        <template v-for="item of data.items">
            <li>
                <process-bar :progress="item.progress"></process-bar>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import UploadListMapper from '@/views/component/upload/UploadListMapper';
    import ProcessBar from '@/views/common/progress/ProcessBar.vue';

    @Component({
        components: {
            ProcessBar,
        },
    })
    export default class UploadListPane extends Vue {
        @Prop({
            type: UploadListMapper,
            required: false,
            default: () => (new UploadListMapper()),
        })
        private data!: UploadListMapper;
    }
</script>

<style lang="scss" scoped>
    .upload-list-pane {
        position: absolute;
        z-index: 1024;
        margin: 0;
        padding: 0;
        list-style: none;
        top: 35px;
        right: 20px;
        height: 100px;
        width: 150px;
    }
</style>
