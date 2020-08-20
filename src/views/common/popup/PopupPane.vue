<template>
    <div class="popup-container" :style="axisComputed" v-show="data.show">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import PopupMapper from '@/views/common/popup/PopupMapper';

    @Component({
        components: {},
    })
    export default class PopupPane extends Vue {
        @Prop({
            type: PopupMapper,
            required: true,
            default: () => new PopupMapper(),
        })
        private data!: PopupMapper;

        get axisComputed() {

            return {
                top: this.data.y + this.data.offsetY + 'px',
                left: this.data.x + this.data.offsetX + 'px',
            };
        }
    }
</script>
<style scoped>

</style>

<style lang="scss">
    .popup-container {
        overflow: hidden;
        max-height: calc(100% - 20px);
        position: fixed;
        min-width: 120px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        z-index: 9999;
        border-radius: 6px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        box-shadow: 0 2px 10px #999;
        -moz-box-shadow: #999 0 2px 10px;
        -webkit-box-shadow: #999 0 2px 10px;
        background-color: #ffffff;
    }
</style>
