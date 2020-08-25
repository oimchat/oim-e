<template>
    <div class="process-wrapper">
        <div class="process-child" :style="percentage">
            <p class="content">
                <label>{{progress+'%'}}</label>
            </p>
            <p class="process-animate"></p>
        </div>
        <label class="content" style="color: #0a0a0a;font-size: 10px">{{speedText}}</label>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class ProcessBar extends Vue {
        /**
         * 进度条百分比
         */
        @Prop({
            type: Number,
            required: false,
            default: () => (0),
        })
        private progress!: number;

        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private speedText!: string;

        private mounted() {
            this.$nextTick(() => {
                //
            });
        }

        get percentage() {
            const w = this.progress + '%';
            return {width: w};
        }
    }
</script>

<style lang="scss" scoped>
    .process-wrapper {
        /*width: 1.98rem;*/
        width: 100%;
        height: 0.6rem;
        margin: 0.12rem 0 0.1rem 0;
        border-radius: 0.1rem;
        background: #bababa;
        /*background: #fff;*/
        /*border: 0.01rem solid #ff6780;*/

        /*&.addGray {*/
        /*    background: #999;*/
        /*    border: 0.01rem solid #999;*/
        /*}*/
        text-align: center;


        .content {
            position: absolute;
            display: inline-block;
            font-size: 8px;
            color: #fff;
            z-index: 2;
        }

        .process-child {
            position: relative;
            height: 100%;
            // width: 100%;  //这个width就是动态变化。通过js改变
            border-radius: inherit;

            .process-animate {
                background: #6677fb;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                border-radius: inherit;
                animation: process 1s linear forwards;

                /*&.addGray {*/
                /*    background: #999 !important;*/
                /*    // border: 0.01rem solid #999;*/
                /*}*/

            }
        }
    }

    @keyframes process {
        0% {
            left: 0;
            right: 100%;
        }
        20% {
            right: 80%;
        }
        40% {
            right: 60%;
        }
        60% {
            right: 40%;
        }
        80% {
            right: 20%;
        }
        100% {
            right: 0;
        }
    }

</style>
