<template>
    <div class="cm-container" :style="axisComputed" v-if="isShow">
        <svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
            <symbol id="icon-youjiantou" viewBox="0 0 1024 1024">
                <path d="M288.791335 65.582671l446.41733 446.417329-446.41733 446.417329z"></path>
            </symbol>
        </svg>
        <!--first-->
        <ul class="cm-ul cm-ul-1 easy-cm-ul" :class="underline?'cm-underline':''">
            <li v-for="(item, index) in list" :style="liStyle">
                <div @click.stop="onClick(item)" :class="firstLeft?'cm-left':''">
                    <i :class="item.icon"></i>
                    <span>{{item.text}}</span>
                    <svg class="icon" aria-hidden="true"
                         v-if="arrow && item.children && item.children.length > 0">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <!--second-->
                <ul class="cm-ul cm-ul-2 easy-cm-ul" :style="secondBorderCheck(index)"
                    :class="underline?'cm-underline':''"
                    v-if="item.children && item.children.length > 0">
                    <li v-for="(second, si) in item.children"
                        :style="liStyle">
                        <div @click.stop="onClick(second)"
                             :class="secondLeft?'cm-left':''">
                            <i :class="second.icon"></i>
                            <span>{{second.text}}</span>
                            <svg class="icon" aria-hidden="true"
                                 v-if="arrow && second.children && second.children.length > 0">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                        <!--third-->
                        <ul class="cm-ul cm-ul-3 easy-cm-ul"
                            :style="thirdBorderCheck(index,si)"
                            :class="underline?'cm-underline':''"
                            v-if="second.children && second.children.length > 0">
                            <li v-for="(third, ti) in second.children"
                                :style="liStyle">
                                <div @click.stop="onClick(third)">
                                    <i :class="third.icon"></i>
                                    <span>{{third.text}}</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MenuItemData from './MenuItemData';

    @Component({
        components: {},
    })
    export default class ContextMenu extends Vue {
        // 是否显示
        private isShow: boolean = false;
        // 触发点坐标
        private axis: any = {
            x: 0,
            y: 0,
        };

        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private name!: string;

        @Prop({
            type: Array,
            required: true,
            default: () => ([]),
        })
        private list!: any[];

        // 是否开启下划线
        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private underline!: boolean;

        // 是否开启箭头
        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private arrow!: boolean;

        // 是否开启边界检测
        @Prop({
            type: Boolean,
            required: false,
            default: () => (true),
        })
        private border!: boolean;

        // 列表项宽度
        @Prop({
            type: Number,
            required: false,
            default: () => (140),
        })
        private itemWidth!: number;

        // 列表项高度
        @Prop({
            type: Number,
            required: false,
            default: () => (36),
        })
        private itemHeight!: number;

        // 列表项字体
        @Prop({
            type: Number,
            required: false,
            default: () => (14),
        })
        private itemSize!: number;

        // 显示点偏移量
        @Prop({
            type: Object,
            required: false,
            default: () => ({x: 6, y: 2}),
        })
        private offset!: { x: 6, y: 2 };

        // 边界距离
        @Prop({
            type: Number,
            required: false,
            default: () => (6),
        })
        private borderWidth!: number;

        public mounted(): void {
            const own = this;
            this.$root.$on('openOnlyContextMenu', (axis: any) => {
                if (axis.name === own.name) {
                    own.isShow = true;
                    own.axis = axis;
                }
            });
            document.addEventListener('click', () => {
                own.isShow = false;
            }, true);
        }

        public show(axis: any): void {
            if (axis) {
                this.isShow = true;
                this.axis = axis;
            }
        }

        get axisComputed() {
            return {
                top: this.axis.y + this.offset.y + 'px',
                left: this.axis.x + this.offset.x + 'px',
            };
        }

        get liStyle() {
            return {
                width: this.itemWidth + 'px',
                height: this.itemHeight + 'px',
                lineHeight: this.itemHeight + 'px',
                fontSize: this.itemSize + 'px',
            };
        }

        get firstLeft() {
            const bw = document.body.offsetWidth;
            return this.axis.x + this.itemWidth * 2 >= bw;
        }

        get secondLeft() {
            const bw = document.body.offsetWidth;
            return this.axis.x + this.itemWidth * 3 >= bw;
        }

        @Watch('axis')
        private axisWatch(): void {
            if (this.border) {
                const bw = document.body.offsetWidth;
                const bh = document.body.offsetHeight;
                if (this.axis.x + this.offset.x + this.itemWidth >= bw) {
                    this.axis.x = bw - this.itemWidth - this.borderWidth - this.offset.x;
                }
                if (this.axis.y + this.offset.y + this.itemHeight * this.list.length >= bh) {
                    this.axis.y = bh - this.itemHeight * this.list.length - this.borderWidth - this.offset.y;
                }
            }
        }

        private secondBorderCheck(i: number) {
            const bw = document.body.offsetWidth;
            const bh = document.body.offsetHeight;
            const cy = this.axis.y + (i + this.list[i].children.length) * this.itemHeight;
            const maxH = bh - 50;
            return {
                left: this.axis.x + this.itemWidth * 2 >= bw ? '-100%' : '100%',
                top: bh >= cy ? 0 + 'px' : (-(this.list[i].children.length - 1) * this.itemHeight) + 'px',
                maxHeight: maxH,
            };
        }

        private secondBorderChecks(i: number) {
            const bw = document.body.offsetWidth;
            const bh = document.body.offsetHeight;
            const cy = this.axis.y + (i + this.list[i].children.length) * this.itemHeight;
            const maxH = bh - 50;
            return {
                left: this.axis.x + this.itemWidth * 2 >= bw ? '-100%' : '100%',
                top: bh >= cy ? 0 + 'px' : (-(this.list[i].children.length - 1) * this.itemHeight) + 'px',
                maxHeight: maxH,
            };
        }


        private thirdBorderCheck(i: number, si: number) {
            const bw = document.body.offsetWidth;
            const bh = document.body.offsetHeight;
            const h = this.itemHeight | 36;
            const cy = this.axis.y + this.list[i].children[si].children.length * h + (i + si) * this.itemHeight + parseInt(this.secondBorderCheck(i).top + '', 10);
            return {
                left: '', // this.axis.x + this.itemWidth * 3 >= bw ? '-100%' : '100%',
                top: '', // cy > bh ? -(this.list[i].children[si].children.length - 1) * this.itemHeight + 'px' : 0,
            };
        }

        private onClick(item: any) {
            const onClick = item.onClick;
            if (typeof onClick === 'function') {
                const data = this.axis.data;
                onClick(item, data);
            }
        }
    }


</script>

<style scoped>
    .icon {
        width: 0.9em;
        height: 0.9em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        position: absolute;
        right: 0%;
        top: 50%;
        transform: translateY(-50%);
    }

    .cm-container {
        position: fixed;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        z-index: 9999;
    }

    .cm-ul {
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
        box-shadow: 0 0 1px #666;
        background-color: #ffffff;
        color: #2e2e2e;
    }

    .cm-ul li {
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        cursor: pointer;
    }

    .cm-ul li:hover > ul {
        display: block;
    }

    .cm-ul li div {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 0.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
    }

    .cm-ul li i {
        display: inline-block;
        width: 1em;
        font-size: 1.3em;
        text-align: center;
    }

    .cm-ul li div:hover {
        background-color: #666666;
        color: #fff;
    }

    .cm-ul-2, .cm-ul-3 {
        position: absolute;
        top: 0;
        display: none;
        z-index: 10000;
    }

    .cm-left svg {
        transform: translateY(-50%) rotate(180deg);
        left: 0;
    }

    .cm-underline li div:after {
        content: '';
        width: 90%;
        position: absolute;
        left: 5%;
        top: 0;
        height: 1px;
        background-color: #cccccc;
        z-index: 10001;
    }

    .cm-underline li div:hover:after, .cm-underline > li:first-child > div:after {
        display: none;
    }
</style>
