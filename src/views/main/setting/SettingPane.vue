<template>
    <Modal
            v-model="data.show"
            width="660"
            footer-hide
            class-name="vertical-center-modal"
    >
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>设置</span>
        </p>
        <div v-if="data.show" :style="getHeightStyle">
            <div style="float: left;width: 120px; height: 100%;border-right-color: #6b6f7c">
                <Radio-group v-model="tab">
                    <Row>
                        <Radio label="contactHarassSettingPane">好友添加验证</Radio>
                    </Row>
                </Radio-group>
            </div>
            <div id="setting-list-pane" style="overflow-y:auto;overflow: hidden;left: 150px; height: 100%">
                <!--                                <component v-bind:is="tab"></component>-->
                <div v-if="data.show">
                    <ContactHarassSettingPane></ContactHarassSettingPane>
                </div>
                <!--                <div id="systemSetting">-->
                <!--                    <div v-if="tab === 'systemSetting'">-->
                <!--                        system-->
                <!--                    </div>-->

                <!--                </div>-->
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import SettingMapper from '@/views/main/setting/SettingMapper';

    import ContactHarassSettingPane from '@/views/module/contact/ContactHarassSettingPane.vue';


    @Component({
        components: {
            ContactHarassSettingPane,
        },
    })
    export default class SettingPane extends Vue {
        @Prop({
            type: SettingMapper,
            required: false,
            default: () => (new SettingMapper()),
        })
        private data!: SettingMapper;
        private tab = 'contactHarassSettingPane';
        private currentComponent = 'contactHarassSettingPane';

        get getHeightStyle() {
            const clientHeight = document.body.clientHeight;
            const height = clientHeight - 100;
            return {
                height: height + 'px',
            };
        }
    }
</script>

<style lang="less">

    /*.setting-anchor-pane {*/
    /*    height: 100%;*/

    /*    > div {*/
    /*        height: 100%;*/
    /*    }*/

    /*    .ivu-anchor-wrapper {*/
    /*        height: 100%;*/

    /*        .ivu-anchor {*/
    /*            height: 100%;*/
    /*        }*/
    /*    }*/
    /*}*/

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
