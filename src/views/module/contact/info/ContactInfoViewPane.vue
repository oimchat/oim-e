<template>
    <div class="only-card only-full-pane">
        <div class="top">
            <div class="title-wrap">
                <div class="title">用户详细信息</div>
                <div></div>
            </div>
        </div>
        <div class="content only-full-pane only-scrollbar-y">

            <div v-if="model.hasUser" class="">
                <div class="oim-info">
                    <div class="oim-avatar-wrap">
                        <div class="oim-avatar">
                            <img class="img only-shadow" :src="model.user.avatar" alt="">
                        </div>
                    </div>
                    <div class="oim-nickname-area">
                        <h4 class="oim-nickname">{{model.user.nickname}}</h4>
                        <i v-if="model.user.gender==='1'" class="fas fa-male"
                           style="color: #2d91fc;font-size: 28px"></i>
                        <i v-if="model.user.gender==='2'" class="fas fa-female"
                           style="color: #ff68ca;font-size: 28px"></i>
                    </div>
                    <p class="oim-signature">{{model.user.signature}}</p>
                    <div class="only-center-pane">
                        <div class="oim-meta-area-pane compatible">
                            <div class="oim-meta-area-item">
                                <label class="label ">备注：{{model.relation.remark}}
                                    <a v-if="model.isContact">
                                        <i class="fa fa-edit" aria-hidden="true"></i>
                                        <q-popup-edit v-model="model.relation.remark"
                                                      @save="setRemark"
                                        >
                                            <template
                                                    v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                                                <q-input
                                                        autofocus
                                                        dense
                                                        :value="model.relation.remark"
                                                        hint="备注"
                                                        @input="emitValue"
                                                >
                                                    <template v-slot:after>
                                                        <q-btn flat dense color="negative" icon="cancel"
                                                               @click.stop="cancel"/>
                                                        <q-btn flat dense color="positive" icon="check_circle"
                                                               @click.stop="set"/>
                                                    </template>
                                                </q-input>
                                            </template>
                                        </q-popup-edit>
                                    </a>
                                </label>
                            </div>
                            <div class="oim-meta-area-item">
                                <label class="label ">账号：{{model.user.account}}</label>
                            </div>
                            <div class="oim-meta-area-item">
                                <label class="label ">Email：{{model.user.email}}</label>
                            </div>
                            <div class="oim-meta-area-item ">
                                <label class="label">地区：</label>
                                <p class="value">{{model.user.locationAddress}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="oim-action-area">
                        <a @click="openSend" class="oim-primary-button" href="#">发消息</a>
                    </div>
                </div>
            </div>
            <div v-if="!model.hasUser" class="only-table-pane only-full-pane">
                <div class="only-table-pane-cell">
                    <div>
                        <img :src="noLogo" height="128" width="128"/>
                        <i class="no_one_icon"></i>
                        <p class="">未选择联系人</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import User from '@/app/com/main/module/business/user/bean/User';
    import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';
    import app from '@/app/App';
    import UserBox from '@/app/com/main/module/business/user/box/UserBox';
    import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
    import ContactRelationController from '@/app/com/main/module/business/contact/controller/ContactRelationController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import contactInfoViewModel from '@/platform/vue/view/model/ContactInfoViewModel';
    import CommonIcon from '@/platform/common/web/CommonIcon';


    @Component({
        components: {},
    })
    export default class ContactInfoViewPane extends Vue {
        private model = contactInfoViewModel;
        private noLogo = CommonIcon.noLogo;

        public setUserId(userId: string) {
            const userBox: UserBox = app.appContext.getMaterial(UserBox);
            const contactListBox: ContactRelationBox = app.appContext.getMaterial(ContactRelationBox);
            const user: User = userBox.getUser(userId);
            let relation: ContactRelation = new ContactRelation();
            const list = contactListBox.getContactInContactRelationListByUserId(userId);
            if (list && list.length > 0) {
                relation = list[0];
            }
            this.setUser(user, relation);
        }

        public setUser(user: User, relation: ContactRelation) {
            this.model.setUser(user);
            this.model.setRelation(relation);
        }

        private openSend() {
            const userId = this.model.userId;
            this.onOpenSend(userId);
        }

        @Emit('on-to-send')
        private onOpenSend(key: string) {
            // no
        }

        private setRemark(remark: string) {
            const own = this;
            const contactUserId = this.model.userId;
            const oldRemark = (this.model.relation) ? this.model.relation.remark : '';
            if (!remark) {
                return;
            }

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                own.model.relation.remark = remark;
                            }
                        }
                    }
                },
                lost(data: any): void {
                    Prompt.notice('请求失败！');
                },
                timeOut(data: any): void {
                    Prompt.notice('请求超时！');
                },
            } as DataBackAction;
            const ccc: ContactRelationController = app.appContext.getMaterial(ContactRelationController);
            ccc.updateRemark(contactUserId, remark, back);
        }
    }
</script>

<style scoped>

</style>
