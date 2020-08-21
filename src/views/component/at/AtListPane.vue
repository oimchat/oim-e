<template>
    <popup-pane class="popup-pane" :data="data.popupMapper" onmousedown="return false;">
        <div class="scrollbar-wrapper" unselectable="on" onmousedown="return false;">
            <AtListItem
                    unselectable="on" onmousedown="return false;"
                    :avatar="appData.logoInfo.logo48"
                    :name="'所有人'"
                    @click="onAt('0','所有人')"
            ></AtListItem>
            <template v-for="(item,index) in data.findUsers">
                <AtListItem
                        unselectable="on" onmousedown="return false;"
                        :avatar="item.avatar"
                        :name="item.remark"
                        @click="onAt(item.user.id,item.name)"
                ></AtListItem>
            </template>
        </div>
    </popup-pane>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import PopupPane from '@/views/common/popup/PopupPane.vue';
    import AtListMapper from '@/views/component/at/AtListMapper';
    import AtListItem from '@/views/component/at/AtListItem.vue';
    import appInfo from '@/platform/common/config/AppInfo';


    @Component({
        components: {
            PopupPane,
            AtListItem,
        },
    })
    export default class AtListPane extends Vue {
        @Prop({
            type: AtListMapper,
            required: true,
            default: () => new AtListMapper(),
        })
        private data!: AtListMapper;
        private appData = appInfo;

        public mounted(): void {
            const own = this;
            document.addEventListener('click', (e: Event) => {
                own.data.popupMapper.show = false;
            }, true);
        }

        private onAt(userId: string, name: string) {
            this.data.handleAt(userId, name);
        }
    }
</script>

<style lang="scss" scoped>
    .popup-pane {
        height: 150px;
        width: 100px;
    }

    .scrollbar-wrapper {
        height: 150px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
