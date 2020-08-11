<template>
    <div style="height: 100%">
        <IconListPane :items="items" :box="box" @on-item-selected="onItemSelected"></IconListPane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import IconListPane from '../../common/list/IconListPane.vue';
    import IconItemData from '../../common/list/IconItemData';
    import messageListModel from '@/platform/vue/view/model/MessageListModel';
    import IconItemBox from '@/views/common/list/IconItemBox';

    @Component({
        components: {
            IconListPane,
        },
    })
    export default class MessageListPane extends Vue {
        private items: IconItemData[] = messageListModel.list;
        private box: IconItemBox = messageListModel.box;

        public mounted() {
            // TODO
        }

        public onItemSelected(data: IconItemData) {
            // TODO
        }
    }
</script>

<style scoped>

</style>
