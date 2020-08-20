<template>
    <popup-pane class="popup-pane" :data="data.popupMapper"></popup-pane>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import PopupPane from '@/views/common/popup/PopupPane.vue';
    import AtListMapper from '@/views/component/at/AtListMapper';

    @Component({
        components: {
            PopupPane,
        },
    })
    export default class AtListPane extends Vue {
        @Prop({
            type: AtListMapper,
            required: true,
            default: () => new AtListMapper(),
        })
        private data!: AtListMapper;
    }
</script>

<style lang="scss">
    .popup-pane {
        height: 150px;
        width: 100px;
    }
</style>
