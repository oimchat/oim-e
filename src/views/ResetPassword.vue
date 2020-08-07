<template>
    <q-card class="reset-password-card">
        <q-card-section class="bg-main-theme text-white">
            <div class="text-h6">重置密码</div>
            <div class="text-subtitle2">通过密保问题重置密码</div>
        </q-card-section>

        <q-separator/>
        <div class="q-pa-md reset-password-card-pane">

            <q-stepper
                    v-model="step"
                    ref="stepper"
                    color="primary"
                    animated
            >
                <q-step
                        :name="0"
                        title="输入账号"
                        caption="输入登录账号，获取密保问题"
                        icon="fas fa-user-circle "
                        :done="step > 0"
                >
                    <q-input v-model="model.account" label="请输入账号" :dense="false"/>
                    <q-stepper-navigation>
                        <q-btn @click="getQuestions" :label="'下一步'" color="primary"/>
                        <q-btn @click="login()" label="返回" color="primary" flat class="q-ml-sm"/>
                    </q-stepper-navigation>
                </q-step>

                <q-step
                        :name="1"
                        title="回答密保问题"
                        caption="回答密保问题重置密码"
                        icon="settings"
                        :done="step > 1"
                >

                    <q-form ref="form">
                        <q-input v-model="model.user.tempPassword"
                                 label="输入密码"
                                 :type="isPassword ? 'password' : 'text'"
                                 lazy-rules
                                 :rules="rule1"
                                 placeholder="输入密码"
                                 :dense="false">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-lock"/>
                            </template>
                            <template v-slot:append>
                                <q-icon
                                        :name="isPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPassword = !isPassword"
                                />
                            </template>
                        </q-input>
                        <q-input v-model="model.user.repeatPassword"
                                 label="确认密码"
                                 :type="isPassword ? 'password' : 'text'"
                                 lazy-rules
                                 :rules="rule2"
                                 placeholder="确认密码"
                                 :dense="false">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-lock"/>
                            </template>
                            <template v-slot:append>
                                <q-icon
                                        :name="isPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPassword = !isPassword"
                                />
                            </template>
                        </q-input>

                        <q-list bordered separator>
                            <q-item-label header>回答问题</q-item-label>
                            <template v-for="(item, index) in model.questionData.questions">
                                <q-slide-item>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>问题{{index + 1}}：{{item.question}}</q-item-label>
                                            <q-input v-model="item.answer"
                                                     label="请输入答案"
                                                     :type="'text'"
                                                     lazy-rules
                                                     :rules="[val=> val && val.length > 0 || '不能为空']"
                                                     :dense="false">
                                            </q-input>
                                        </q-item-section>
                                    </q-item>
                                </q-slide-item>
                            </template>
                        </q-list>

                    </q-form>
                    <q-stepper-navigation>
                        <q-btn @click="updatePassword" color="primary" :label="'确定'"/>
                        <q-btn @click="$refs.stepper.previous()" color="primary" label="返回" flat class="q-ml-sm"/>
                        <q-btn style="float: right" @click="login" color="primary" :label=" '去登录'"/>
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
        </div>
    </q-card>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import resetPasswordViewModel from '@/platform/vue/view/model/ResetPasswordViewModel';
    import app from '@/app/App';
    import PromptType from '@/app/com/client/define/prompt/PromptType';

    @Component({
        components: {},
    })
    export default class ResetPassword extends Vue {
        private step: number = 1;
        private isPassword: boolean = true;

        private model = resetPasswordViewModel;

        private rule1 = [
            (val: any) => val && val.length > 0 || '请输入密码',
            (val: any) => val && (val.length >= 6 && val.length <= 30) || '不能小于6位大于30位'];
        private rule2 = [
            (val: any) => val && val.length > 0 || '请输入密码',
            (val: any) => val && (val.length >= 6 && val.length <= 30) || '不能小于6位大于30位',
            (val: any) => val === this.model.user.tempPassword || '两次密码不匹配'];

        public mounted() {
            this.setCurrent(0);
            resetPasswordViewModel.initialize();
        }

        private setCurrent(current: number): void {
            this.step = current;
        }

        private save(): void {
            this.$router.push({path: '/login'});
        }

        private getQuestions(): void {
            const own = this;
            this.model.getQuestions(
                (success: boolean, message: string) => {
                    if (!success) {
                        app.prompt(message, '信息', PromptType.warn);
                    } else {
                        own.setCurrent(1);
                    }
                },
            );
        }

        private updatePassword(): void {
            const own = this;
            const formName = 'form';
            const form: any = this.$refs[formName];
            form.validate().then((v: boolean) => {
                if (v) {
                    resetPasswordViewModel.updatePassword((success: boolean) => {
                        if (success) {
                            app.prompt('修改成功', '成功', PromptType.success);
                            own.resetValidation();
                        }
                    });
                } else {
                    // 哦，不，用户至少
                    // 填写了一个无效值
                }
            });
        }

        private resetValidation() {
            const formName = 'form';
            const form: any = this.$refs[formName];
            form.resetValidation();
        }

        private login(): void {
            this.$router.push({path: '/login'});
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/styles/oim/oim.variables';

    .reset-password-card {
        width: 100%;
        height: 100%;
    }

    .reset-password-card-pane {
        position: absolute;
        width: 100%;
        top: 90px;
        bottom: 0;
        overflow-y: auto;
    }

    .question-list {
        position: absolute;
        top: 130px;
        bottom: 0;
        overflow-y: auto;
    }

    .bg-main-theme {
        background-color: $oim-main-theme-color;
    }
</style>
