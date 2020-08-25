<template>
    <codemirror v-model="data.content" :options="option"/>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import CodeValue from '@/app/com/common/chat/item/CodeValue';
import CodeMirrorBox from '@/common/web/common/code/CodeMirrorBox';
import app from '@/app/App';

@Component({
    components: {},
})
export default class ContentItemCode extends Vue {
    @Prop({
        type: CodeValue,
        required: false,
        default: () => (''),
    })
    private data!: CodeValue;

    get option() {
        const data = this.data;
        const box: CodeMirrorBox = app.appContext.getMaterial(CodeMirrorBox);
        const name = box.getMime(data.language);
        const mode = (name) ? name : 'text/javascript';
        return {
            tabSize: 4,
            styleActiveLine: true,
            theme: 'default',
            lineNumbers: true,
            line: true,
            readOnly: true,
            mode,
            // more CodeMirror options...
        };
    }
}
</script>

<style scoped>

</style>
