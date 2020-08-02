<template>
    <q-menu
            touch-position
            auto-close
            :context-menu="contextMenu"
            :target="target"
    >
        <q-list dense style="min-width: 100px">
            <template v-for="(item, index) in list">
                <q-item clickable v-close-popup @click="onClick(item)">
                    <template v-if="item.icon && item.icon.length > 0">
                        <q-item-section side>
                            <q-icon size="14px" :name="item.icon"></q-icon>
                        </q-item-section>
                    </template>
                    <q-item-section>{{item.text}}</q-item-section>
                    <template v-if="item.children && item.children.length > 0">
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right"/>
                        </q-item-section>
                        <popup-menu :list="item.children"></popup-menu>
                    </template>
                </q-item>
            </template>
        </q-list>
    </q-menu>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MenuItemData from './MenuItemData';

    @Component({
        components: {},
    })
    export default class PopupMenu extends Vue {

        @Prop({
            type: String || Boolean,
            required: false,
            default: () => (false),
        })
        private target!: string | boolean;

        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private contextMenu!: boolean;

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


        private onClick(item: any) {
            const onClick = item.onClick;
            if (typeof onClick === 'function') {
                onClick(item, '');
            }
        }
    }


</script>

<style scoped>
    .q-item:hover {
        background-color: rgba(205, 205, 205, 0.8);
    }
</style>
