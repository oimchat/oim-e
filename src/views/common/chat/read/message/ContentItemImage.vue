<template>
    <a rel="image_group" href="javascript:void(0);">
        <img chat="chat_image" :data-source="data.url" :src="data.url">
    </a>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ImageValue from '@/app/com/common/chat/item/ImageValue';

    @Component({
        components: {},
    })
    export default class ContentItemImage extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any | ImageValue;
    }
</script>

<style scoped>

</style>
