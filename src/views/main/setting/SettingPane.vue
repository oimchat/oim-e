<template>
    <Modal
            v-model="show"
            width="660"
            class="form-modal"
    >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>设置</span>
        </p>
        <div style="height: 400px">
            <div style="float: left;width: 120px; height: 100%;border-right-color: #6b6f7c">
                <!--                <Anchor show-ink class="setting-anchor-pane">-->
                <!--                    <AnchorLink href="#contactHarassSetting" title="好友添加验证"/>-->
                <!--                    <AnchorLink href="#systemSetting" title="系统设置"/>-->
                <!--                </Anchor>-->
                <Radio-group v-model="tab">
                    <Row>
                        <Radio label="contactHarassSettingPane">好友添加验证</Radio>
                    </Row>
                </Radio-group>
            </div>
            <div id="setting-list-pane"
                 style="overflow-y:auto;/** float: right; **/overflow: hidden;left: 150px; height: 100%">
                <!--                                <component v-bind:is="tab"></component>-->
                <div v-if="show">
                    <ContactHarassSettingPane></ContactHarassSettingPane>
                </div>
                <!--                <div id="systemSetting">-->
                <!--                    <div v-if="tab === 'systemSetting'">-->
                <!--                        system-->
                <!--                    </div>-->

                <!--                </div>-->
            </div>
        </div>
        <div slot="footer">
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import ContactHarassSettingPane from '@/views/module/contact/ContactHarassSettingPane.vue';

    @Component({
        components: {
            ContactHarassSettingPane,
        },
    })
    export default class SettingPane extends Vue {
        private show: boolean = false;
        private tab = 'contactHarassSettingPane';
        private currentComponent = 'contactHarassSettingPane';

        public setShow(show: boolean): void {
            this.show = show;
        }

        private showTab(id: string) {
            this.tab = id;
            // const pane = document.getElementById('setting-list-pane');
            // if (pane) {
            //     const e = document.getElementById(id);
            //     if (e) {
            //         pane.scrollIntoView(e);
            //     }
            // }

        }
    }
</script>

<style lang="less">

    .setting-anchor-pane {
        height: 100%;

        > div {
            height: 100%;
        }

        .ivu-anchor-wrapper {
            height: 100%;

            .ivu-anchor {
                height: 100%;
            }
        }
    }
</style>
