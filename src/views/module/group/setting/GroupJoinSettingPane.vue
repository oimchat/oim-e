<template>
    <div v-if="data.isOwner">
        <Row>
            <Radio-group v-model="data.setting.joinType">
                <Row>
                    <Radio label="1">允许任何人加入</Radio>
                </Row>
                <Row>
                    <Radio label="2">需要验证消息</Radio>
                </Row>
                <Row>
                    <Radio label="3">需要回答正确问题</Radio>
                    <div style="padding-left: 50px">
                        <div v-if="data.setting.joinType==='3'">
                            <Input type="text" v-model="data.setting.question" placeholder="问题"></Input>
                            <Input type="text" v-model="data.setting.answer" placeholder="答案"></Input>
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
        <div v-if="data.setting.joinType==='4'">
            <Form ref="questionData" :model="data.questionData" :label-width="60" style="width: 500px">
                <Row v-for="(item, index) in data.questionData.questions" :key="index">
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
    import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
    import GroupJoinSettingMapper from '@/views/module/group/setting/GroupJoinSettingMapper';

    @Component({
        components: {},
    })
    export default class GroupJoinSettingPane extends Vue {
        @Prop({
            type: GroupJoinSettingMapper,
            required: false,
            default: () => (''),
        })
        private data!: GroupJoinSettingMapper;


        public created() {
            // this.loadData();
        }

        public mounted() {
            // do not
            // console.log('哈哈');
        }

        private addQuestion(): void {
            this.data.addQuestion();
        }

        private removeQuestion(index: number): void {
            this.data.removeQuestion(index);
        }

        private save() {
            const own = this;
            this.data.save((success, message) => {
                if (success) {
                    Prompt.notice('修改成功', '成功', 'success');
                } else {
                    Prompt.notice(message, '失败！', 'warn');
                }
            });
        }
    }
</script>

<style scoped>

</style>
