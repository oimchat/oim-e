<template>
    <div>
        <Row>
            <Radio-group v-model="setting.verifyType">
                <Row>
                    <Radio label="1">允许任何人添加</Radio>
                </Row>
                <Row>
                    <Radio label="2">需要验证</Radio>
                </Row>
                <Row>
                    <Radio label="3">需要回答正确的问题</Radio>
                    <div style="padding-left: 50px">
                        <div v-if="setting.verifyType==='3'">
                            <Input type="text" v-model="setting.question" placeholder="问题"></Input>
                            <Input type="text" v-model="setting.answer" placeholder="答案"></Input>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Radio label="4">需要回答问题并由我确认</Radio>
                </Row>
            </Radio-group>
        </Row>
        <div v-if="setting.verifyType==='4'">
            <Form ref="questionData" :model="questionData" :label-width="80" style="width: 500px">
                <Row v-for="(item, index) in questionData.questions" :key="index">
                    <FormItem
                            :key="'question'+index"
                            :label="'问题'+(index+1)"
                            :prop="'questions.' + index + '.question'"
                            :rules="{required: true, message: '不能为空！', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="item.question"
                                       placeholder="问题"></Input>
                            </Col>
                            <Col span="4" offset="1">
                                <Button @click="removeQuestion(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Row>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" @click="addQuestion" icon="md-add">新建问题</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </div>
        <Row style="text-align: center">
            <Button @click='save' type="primary">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContactHarassSetting from '@/app/com/main/module/business/contact/bean/ContactHarassSetting';
    import ContactVerifyQuestion from '@/app/com/main/module/business/contact/data/ContactVerifyQuestion';

    import app from '@/app/App';
    import ContactHarassSettingController from '@/app/com/main/module/business/contact/controller/ContactHarassSettingController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';

    @Component({
        components: {},
    })
    export default class ContactHarassSettingPane extends Vue {
        private setting: ContactHarassSetting = new ContactHarassSetting();
        private questionData: {
            questions: ContactVerifyQuestion[],
        } = {
            questions: [],
        };

        public mounted() {
            // do not
            // console.log('哈哈');
            this.loadData();
        }

        private addQuestion(): void {
            const length = this.questionData.questions.length;
            if (length < 3) {
                this.questionData.questions.push(new ContactVerifyQuestion());
            }
        }

        private removeQuestion(index: number): void {
            this.questionData.questions.splice(index, 1);
        }

        private loadData() {


            const own = this;
            const back: DataBackAction = {
                back(d: any): void {
                    if (d) {
                        const info = d.info;
                        if (info) {
                            if (info.success && d.body) {
                                const questionList: ContactVerifyQuestion[] = d.body.questions;
                                const data: ContactHarassSetting = d.body.setting;
                                own.setSetting(data, questionList);
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
            const controller: ContactHarassSettingController = app.appContext.getMaterial(ContactHarassSettingController);
            controller.get(back);
        }

        private setSetting(data: ContactHarassSetting, list: ContactVerifyQuestion[]) {
            if (!data) {
                data = new ContactHarassSetting();
            }
            if (!list) {
                list = [];
            }
            this.setting = data;
            this.questionData.questions = list;
        }

        private save() {
            const own = this;
            const back: DataBackAction = {
                back(d: any): void {
                    if (d) {
                        const info = d.info;
                        if (info && info.success) {
                            Prompt.notice('修改成功', '成功', 'success');
                        } else {
                            Prompt.message(info, '修改成功', '修改失败！');
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

            const controller: ContactHarassSettingController = app.appContext.getMaterial(ContactHarassSettingController);
            controller.update(this.setting, this.questionData.questions, back);
        }
    }
</script>

<style scoped>

</style>
