<template>
    <div style="overflow-y:auto" class="scroll-wrapper contact_list scrollbar">
        <Menu width="280" :theme="menuTheme" style="z-index: 9">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-people"/>
                    查找
                </template>
                <MenuItem to="/module/find.user" name="module_find.user">添加联系人</MenuItem>
                <MenuItem to="/module/find.group" name="module_find.group">加入群</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-paper"/>
                    消息通知
                </template>
                <MenuItem to="/module/notice" name="module_notice">查看通知</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class ModuleMenu extends Vue {
        private menuTheme: string = 'light';

        private findUser(): void {
            this.$router.push({path: '/module/find.user'});
        }
    }
</script>

<style scoped>

</style>
