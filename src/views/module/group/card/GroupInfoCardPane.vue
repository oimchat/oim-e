<template>
    <div class="only-full-pane">
        <div class="only-card only-full-pane">
            <div class="top">
                <div class="title-wrap">
                    <div class="title">群详细信息</div>
                    <div></div>
                </div>
            </div>
            <div class="content only-full-pane only-scrollbar-y">

                <div v-if="data.hasGroup" class="">
                    <div class="oim-info">
                        <div class="oim-avatar-wrap">
                            <div class="oim-avatar">
                                <img class="img only-shadow" :src="data.group.avatar" alt="">
                            </div>
                        </div>
                        <div class="oim-nickname-area">
                            <h4 class="oim-nickname">{{data.group.name}}</h4>
                        </div>
                        <p class="oim-signature">{{data.group.introduce}}</p>
                        <div class="only-center-pane">
                            <div class="oim-meta-area-pane compatible">
                                <div class="oim-meta-area-item">
                                    <label class="label ">号码：{{data.group.number}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!data.hasGroup" class="only-table-pane only-full-pane">
                    <div class="only-table-pane-cell">
                        <div>
                            <img :src="noLogo" height="128" width="128"/>
                            <i class="no_one_icon"></i>
                            <p class="">未选择</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import CommonIcon from '@/platform/common/web/CommonIcon';
    import GroupInfoCardMapper from '@/views/module/group/card/GroupInfoCardMapper';

    @Component({
        components: {},
    })
    export default class GroupInfoCardPane extends Vue {

        @Prop({
            type: GroupInfoCardMapper,
            required: false,
            default: () => (new GroupInfoCardMapper()),
        })
        private data!: GroupInfoCardMapper;
        private noLogo = CommonIcon.noLogo;
    }
</script>

<style scoped>

</style>
