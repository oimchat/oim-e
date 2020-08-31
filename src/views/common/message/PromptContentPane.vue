<template>
    <div>
        <div class="prompt">
            <div v-if="data.timeVisible" class="prompt-time">
                <div class="content">{{data.timeText}}</div>
            </div>
            <p class="line">{{data.text}}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import PromptContentWrap from '@/common/vue/data/content/impl/prompt/PromptContentWrap';

    @Component({
        components: {},
    })
    export default class PromptContentPane extends Vue {
        @Prop({
            type: PromptContentWrap,
            required: false,
            default: () => (new PromptContentWrap()),
        })
        private data!: PromptContentWrap;
    }
</script>

<style lang="scss" scoped>
    .prompt-time {
        text-align: center;
        margin: 0 auto;
        max-width: 50%
    }

    .prompt-time .content {
        display: inline-block;
        font-size: 12px;
        color: #b2b2b2;
    }

    .prompt p.line {
        text-align: center;
        color: #d0d0d0;
        font-size: 12px;
        margin-bottom: 8px;
    }
</style>
