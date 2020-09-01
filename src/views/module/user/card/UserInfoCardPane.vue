<template>
    <div class="only-card only-full-pane">
        <div class="top">
            <div class="title-wrap">
                <div class="title">用户详细信息</div>
                <div></div>
            </div>
        </div>
        <div class="content only-full-pane only-scrollbar-y">

            <div v-if="data.hasUser" class="">
                <div class="oim-info">
                    <div class="oim-avatar-wrap">
                        <div class="oim-avatar">
                            <img class="img only-shadow" :src="data.user.avatar" alt="">
                        </div>
                    </div>
                    <div class="oim-nickname-area">
                        <h4 class="oim-nickname">{{data.user.nickname}}</h4>
                        <i v-if="data.user.gender==='1'" class="fas fa-male"
                           style="color: #2d91fc;font-size: 28px"></i>
                        <i v-if="data.user.gender==='2'" class="fas fa-female"
                           style="color: #ff68ca;font-size: 28px"></i>
                    </div>
                    <p class="oim-signature">{{data.user.signature}}</p>
                    <div class="only-center-pane">
                        <div class="oim-meta-area-pane compatible">
                            <div class="oim-meta-area-item">
                                <label class="label ">账号：{{data.user.account}}</label>
                            </div>
                            <div class="oim-meta-area-item">
                                <label class="label ">Email：{{data.user.email}}</label>
                            </div>
                            <div class="oim-meta-area-item ">
                                <label class="label">地区：</label>
                                <p class="value">{{data.user.locationAddress}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!data.hasUser" class="only-table-pane only-full-pane">
                <div class="only-table-pane-cell">
                    <div>
                        <img :src="noLogo" height="128" width="128"/>
                        <i class="no_one_icon"></i>
                        <p class="">未选择用户</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import CommonIcon from '@/platform/common/web/CommonIcon';
    import UserInfoCardMapper from '@/views/module/user/card/UserInfoCardMapper';

    @Component({
        components: {},
    })
    export default class UserInfoCardPane extends Vue {
        private noLogo = CommonIcon.noLogo;

        @Prop({
            type: UserInfoCardMapper,
            required: false,
            default: () => (new UserInfoCardMapper()),
        })
        private data!: UserInfoCardMapper;
    }
</script>

<style scoped>

</style>
