<template>
    <div class="box ">
        <div class="box_hd with_border">
            <div class="title_wrap">
                <div class="title">详细信息</div>
            </div>
        </div>
        <div class="box_bd">
            <!-- ngIf: currentContact -->
            <div class="">
                <div class="box_bd">
                    <!-- ngIf: currentContact -->
                    <div class="">
                        <div class="profile_bd">
                            <div class="meta compatible">
                                <div class="item">
                                    <label class="label">微信号</label>
                                    <span class="value">UserName</span>
                                </div>
                                <div class="item" ng-if="user.Signature">
                                    <span class="value" ng-bind-html="user.Signature"></span>
                                </div>
                                <div class="item location" ng-if="user.Province">
                                    <span class="value">Province City</span>
                                </div>
                            </div>
                        </div>
                        <div class="profile_ft">
                            <div class="action">
                                <a class="send" ui-sref="chat({userName:user.UserName})" href="javascript:;">发消息</a>
                            </div>
                        </div>
                    </div>
                </div><!-- end ngIf: currentContact -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {

        },
    })
    export default class PersonalInfoPane extends Vue {
    }
</script>

<style scoped>

</style>
