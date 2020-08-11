<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="text-align:center">
            <Icon type="ios-film-outline"></Icon>
            <span>添加联系人</span>
        </p>

        <Card style="width: 100%;height: 100%">
            <div v-if="!isBlocked">
                <Row>
                    <Input v-model="apply.remark" placeholder="备注名" style="width: 200px"/>
                    <label>分组：</label>
                    <Select v-model="apply.categoryId" style="width: 220px">
                        <Option v-for="item in categoryList" :value="item.id" :key="item.id">
                            {{item.name}}
                        </Option>
                    </Select>
                </Row>

                <Row v-if="'3'===verifyType">
                    <p slot="title">回答问题</p>
                    <Row>
                        <Col span="18">
                            <span>问题:</span>
                            <label>
                                {{apply.question}}
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="apply.answer" placeholder="答案"></Input>
                        </Col>
                    </Row>
                </Row>

                <Row v-if="'4'===verifyType">
                    <p slot="title">回答问题</p>
                    <Row v-for="(item, index) in answerList" :key="index">
                        <Row>
                            <Col span="18">
                                <span>问题:</span>
                                <label>
                                    {{item.question}}
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="item.answer" placeholder="答案"></Input>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </div>
            <div v-if="isBlocked">
                对方拒绝添加好友！
            </div>
        </Card>
        <div slot="footer">
            <Button v-if="!isBlocked" @click="sendAddRequest" type="primary" icon="plus">确定</Button>
        </div>
    </Modal>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import app from '@/app/App';
import ContactVerifyAnswer from '@/app/com/main/module/business/contact/data/ContactVerifyAnswer';
import ContactAddApplyData from '@/app/com/main/module/business/contact/data/ContactAddApplyData';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import ContactController from '@/app/com/main/module/business/contact/controller/ContactController';
import DataBackAction from '@/app/base/net/DataBackAction';
import Prompt from '@/platform/web/common/Prompt';
import ContactVerifySettingData from '@/app/com/main/module/business/contact/data/ContactVerifySettingData';
import ContactVerifyQuestion from '@/app/com/main/module/business/contact/data/ContactVerifyQuestion';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import ContactCategoryBox from '@/app/com/main/module/business/contact/box/ContactCategoryBox';


@Component({
    components: {},
})
export default class AddUser extends Vue {
    private show: boolean = false;
    private userId: string = '';
    private apply: ContactAddApplyData = new ContactAddApplyData();
    private answerList: ContactVerifyAnswer[] = [];
    private categoryList: ContactCategory[] = [];
    private verifyType: string = '0';
    private isBlocked: boolean = false;

    public mounted() {
        //
    }

    public setShow(show: boolean): void {
        this.show = show;
    }

    public setUserId(userId: string) {
        this.userId = userId;
        this.initialize();
        this.loadSetting(userId);
    }

    private initialize(): void {
        this.apply = new ContactAddApplyData();
        this.answerList = [];
        this.verifyType = '0';

        const contactListBox: ContactCategoryBox = app.appContext.getMaterial(ContactCategoryBox);
        this.categoryList = contactListBox.getCategoryList();
        if (this.categoryList.length > 0) {
            const category = this.categoryList[0];
            this.apply.categoryId = category.id;
        }
    }

    private loadSetting(userId: string) {

        const own = this;
        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success && data.body) {
                            const questionList: ContactVerifyQuestion[] = data.body.questions;
                            const verifySetting: ContactVerifySettingData = data.body.setting;
                            own.setSetting(verifySetting, questionList);
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
        const contactController: ContactController = app.appContext.getMaterial(ContactController);
        contactController.getContactAddVerifySetting(userId, back);
    }

    private setSetting(verifySetting: ContactVerifySettingData, questionList: ContactVerifyQuestion[]) {

        if (verifySetting) {
            this.verifyType = verifySetting.verifyType;
            this.apply.question = verifySetting.question;
        }

        if (questionList) {
            for (const q of questionList) {
                const a: ContactVerifyAnswer = new ContactVerifyAnswer();
                a.questionId = q.id;
                a.question = q.question;
                this.answerList.push(a);
            }
        }
    }

    private sendAddRequest() {
        const own = this;
        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success) {
                            own.setShow(false);
                        } else {
                            Prompt.message(info, '', '');
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

        const apply: ContactAddApplyData = this.apply;
        const answerList: ContactVerifyAnswer[] = this.answerList;
        const contactController: ContactController = app.appContext.getMaterial(ContactController);
        const personalBox: PersonalBox = app.appContext.getMaterial(PersonalBox);
        apply.targetUserId = this.userId;
        apply.applyUserId = personalBox.getUserId();
        contactController.sendAddRequest(apply, answerList, back);
    }
}
</script>

<style scoped>

</style>
