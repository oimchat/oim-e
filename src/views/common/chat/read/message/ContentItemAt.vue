<template>
    <a name="at" :value="data.userId" contenteditable="false" href="javascript:void(0)">{{data.text}}</a>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import AtValue from '@/app/com/common/chat/item/AtValue';

    @Component({
        components: {},
    })
    export default class ContentItemAt extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: AtValue;
    }
</script>

<style scoped>

</style>
