<template>
    <Modal
            v-model="show"
            width="560"
            class="form-modal"
    >
        <p slot="header" style="text-align:center">
            <Icon type="ios-film-outline"></Icon>
            <span>移动联系人</span>
        </p>
        <div style="width: 100%;height: 100%">
            <Card>
                <div>
                    <Radio-group v-model="categoryId">
                        <CellGroup>
                            <Cell v-for='item in list' title="Only show titles">
                                <Radio :label="item.id">&nbsp;</Radio>
                            </Cell>
                        </CellGroup>
                    </Radio-group>
                </div>
            </Card>
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit">
                确定
            </Button>
        </div>
    </Modal>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import app from '@/app/App';
import DataBackAction from '@/app/base/net/DataBackAction';
import Prompt from '@/platform/web/common/Prompt';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import ContactRelationController from '@/app/com/main/module/business/contact/controller/ContactRelationController';
import ContactCategoryBox from '@/app/com/main/module/business/contact/box/ContactCategoryBox';


@Component({
    components: {},
})
export default class ContactMoveCategoryPane extends Vue {
    private show: boolean = false;
    private userId: string = '';
    private categoryId: string = '';
    private list: ContactCategory[] = [];

    public mounted() {
        // TODO
    }

    public setShow(show: boolean): void {
        this.show = show;
    }

    public setUserId(userId: string) {
        this.userId = userId;
        this.loadList();
    }

    public loadList() {
        const contactListBox: ContactCategoryBox = app.appContext.getMaterial(ContactCategoryBox);
        this.list = contactListBox.getCategoryList();
    }

    private handleSubmit() {
        const userId: string = this.userId;
        const categoryId: string = this.categoryId;
        this.moveCategory(userId, categoryId);
    }

    private moveCategory(userId: string, categoryId: string) {
        const userIds = [userId];

        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info) {
                        if (info.success) {
                            // no
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
        const contactRelationController: ContactRelationController = app.appContext.getMaterial(ContactRelationController);
        contactRelationController.moveCategory(userIds, categoryId);
    }
}
</script>

<style scoped>

</style>
