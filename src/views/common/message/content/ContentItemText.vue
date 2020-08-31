<template>
    <label v-html="data"></label>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class ContentItemText extends Vue {
        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private data!: string;
    }
</script>

<style scoped>

</style>
