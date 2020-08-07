<template>
    <div class="box">
        <div class="box_hd with_border">
            <div class="title_wrap">
                <div class="title">详细信息</div>
            </div>
        </div>
        <div class="box_bd">

            <div v-if="showInfo" class="">
                <div class="profile">

                    <div class="avatar">
                        <img class="img" :src="user.avatar" alt="">
                    </div>

                    <div class="nickname_area">
                        <h4 class="nickname">{{user.nickname}}</h4>
                        <i v-if="user.gender==='1'" class="oim_chat_men"></i>
                        <i v-if="user.gender==='2'" class="oim_chat_women"></i>
                    </div>

                    <p class="signature">{{user.signature}}</p>

                    <div class="meta_area compatible">
                        <div class="meta_item">
                            <label class="label ">备注：{{relation.remark}}
                                <a v-if="remarkEdit" @click="updateRemark">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                </a>
                            </label>
                        </div>
                        <div class="meta_item">
                            <label class="label ">账号：{{user.account}}</label>
                        </div>
                        <div class="meta_item">
                            <label class="label ">Email：{{user.email}}</label>
                        </div>
                        <div class="meta_item ">
                            <label class="label">地区：</label>
                            <p class="value">{{user.locationAddress}}</p>
                        </div>
                    </div>

                    <div class="action_area">
                        <a @click="openSend" class="button" href="#">发消息</a>
                    </div>
                </div>
            </div>


            <div v-if="!showInfo" class="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style="position: absolute;">
                <div class="box_bd chat_bd scrollbar-dynamic scroll-content"
                     style="margin-bottom: 0px; margin-right: 0px; height: 369px;">
                    <div class="message_empty ">
                        <img src="../../../images/main/pane/no.png" height="128" width="128"/>
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
    import User from '../../src/app/com/main/module/business/user/bean/User';
    import ContactRelation from '../../src/app/com/main/module/business/contact/bean/ContactRelation';
    import app from '@/app/App';
    import UserBox from '../../src/app/com/main/module/business/user/box/UserBox';
    import ContactListBox from '../../src/app/com/main/module/business/contact/box/ContactListBox';
    import ContactRelationController from '../../src/app/com/main/module/business/contact/controller/ContactRelationController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';

    @Component({
        components: {},
    })
    export default class UserInfoPane extends Vue {
        private userId: string = '';
        private user: User = new User();
        private relation: ContactRelation = new ContactRelation();
        private remarkEdit: boolean = false;
        private showInfo: boolean = false;

        public setUserId(userId: string) {
            this.userId = userId;
            const userBox: UserBox = app.appContext.getMaterial(UserBox);
            const contactListBox: ContactListBox = app.appContext.getMaterial(ContactListBox);
            const user: User = userBox.getUser(userId);
            let relation: ContactRelation = new ContactRelation();
            const list = contactListBox.getContactInContactRelationListByUserId(userId);
            if (list && list.length > 0) {
                relation = list[0];
            }
            this.setUser(user, relation);
        }

        public setUser(user: User, relation: ContactRelation) {
            if (user) {
                this.user = user;
                this.showInfo = true;
            } else {
                this.showInfo = false;
                this.user = new User();
            }

            if (relation) {
                this.relation = relation;
                this.remarkEdit = true;
            } else {
                this.relation = new ContactRelation();
                this.remarkEdit = false;
            }
        }

        private openSend() {
            const userId = this.userId;
            this.onOpenSend(userId);
        }

        @Emit('on-to-send')
        private onOpenSend(key: string) {
            // no
        }

        private updateRemark(): void {
            const own = this;
            const contactUserId = this.userId;
            const oldRemark = (this.relation) ? this.relation.remark : '';
            let text = '';

            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                own.relation.remark = text;
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


            this.$Modal.confirm({
                title: '修改备注',
                render: (h: any) => {
                    return h('Input', {
                        props: {
                            value: oldRemark,
                            autofocus: true,
                            placeholder: '输入备注',
                        },
                        on: {
                            input: (t: string) => {
                                text = t;
                            },
                        },
                    });
                },
                onOk: () => {
                    if (!text) {
                        text = '';
                    }
                    ccc.updateRemark(contactUserId, text, back);
                },
                onCancel: () => {
                    // no
                },
            });
        }
    }
</script>

<style scoped>

</style>
