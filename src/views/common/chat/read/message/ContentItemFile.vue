<template>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class ContentItemFile extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any;
    }
</script>

<style scoped>

</style>
