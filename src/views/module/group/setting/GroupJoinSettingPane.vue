<template>
    <div>
        <Row>
            <Radio-group v-model="setting.joinType">
                <Row>
                    <Radio label="1">允许任何人加入</Radio>
                </Row>
                <Row>
                    <Radio label="2">需要验证消息</Radio>
                </Row>
                <Row>
                    <Radio label="3">需要回答正确问题</Radio>
                    <div style="padding-left: 50px">
                        <div v-if="setting.joinType==='3'">
                            <Input type="text" v-model="setting.question" placeholder="问题"></Input>
                            <Input type="text" v-model="setting.answer" placeholder="答案"></Input>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Radio label="4">需要回答问题并由管理员审核</Radio>
                </Row>
                <Row>
                    <Radio label="5">只允许邀请加入</Radio>
                </Row>
                <Row>
                    <Radio label="6">不允许任何人加入</Radio>
                </Row>
            </Radio-group>
        </Row>
        <div v-if="setting.joinType==='4'">
            <Form ref="questionData" :model="questionData" :label-width="60" style="width: 500px">
                <Row v-for="(item, index) in questionData.questions" :key="index">
                    <FormItem
                            :key="'question'+index"
                            :label="'问题'+(index+1)"
                            :prop="'questions.' + index + '.question'"
                            :rules="{required: true, message: '不能为空！', trigger: 'blur'}">
                        <Row>
                            <Col span="10">
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
    import GroupJoinSetting from '@/app/com/main/module/business/group/bean/GroupJoinSetting';
    import ContactVerifyQuestion from '@/app/com/main/module/business/contact/data/ContactVerifyQuestion';

    import app from '@/app/App';
    import GroupJoinSettingController from '@/app/com/main/module/business/group/controller/GroupSettingController';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupJoinVerifyQuestion from '@/app/com/main/module/business/group/bean/GroupJoinVerifyQuestion';

    @Component({
        components: {},
    })
    export default class GroupJoinSettingPane extends Vue {
        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private groupId!: string;

        private setting: GroupJoinSetting = new GroupJoinSetting();
        private questionData: {
            questions: GroupJoinVerifyQuestion[],
        } = {
            questions: [],
        };

        public created() {
            this.loadData();
        }

        public mounted() {
            // do not
            // console.log('哈哈');
            this.loadData();
        }

        private addQuestion(): void {
            const length = this.questionData.questions.length;
            if (length < 3) {
                this.questionData.questions.push(new GroupJoinVerifyQuestion());
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
                                const questionList: GroupJoinVerifyQuestion[] = d.body.questions;
                                const joinSetting: GroupJoinSetting = d.body.setting;
                                own.setSetting(joinSetting, questionList);
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
            const controller: GroupJoinSettingController = app.appContext.getMaterial(GroupJoinSettingController);
            controller.getJoinSetting(this.groupId, back);
        }

        private setSetting(data: GroupJoinSetting, list: GroupJoinVerifyQuestion[]) {
            if (!data) {
                data = new GroupJoinSetting();
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

            this.setting.groupId = this.groupId;
            const controller: GroupJoinSettingController = app.appContext.getMaterial(GroupJoinSettingController);
            controller.updateJoinSetting(this.setting, this.questionData.questions, back);
        }
    }
</script>

<style scoped>

</style>
