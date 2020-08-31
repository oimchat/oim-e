<template>
    <q-menu
            touch-position
            auto-close
            :context-menu="data.contextMenu"
            :target="data.target"
            :offset="data.offset"
            v-model="data.showing"
    >
        <q-list dense style="min-width: 100px">
            <template v-for="(item, index) in data.list">
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
    import PopupMenuData from '@/views/component/menu/PopupMenuData';

    @Component({
        components: {},
    })
    export default class PopupMenu extends Vue {

        @Prop({
            type: PopupMenuData,
            required: false,
            default: () => (new PopupMenuData()),
        })
        private data!: PopupMenuData;

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
