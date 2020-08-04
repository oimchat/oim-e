<template>
    <div>
        <template v-if="!hasNodes">
            <el-menu-item @click="onClick"
                          :class="{'submenu-title-noDropdown':!isNest}">
                <template slot="text">
                    <i :class="data.icon + ' svg-external-icon svg-icon'"></i>
                    <span slot='text'>{{data.text}}</span>
                </template>
            </el-menu-item>
        </template>
        <el-submenu v-else :index="data.key" popper-append-to-body>
            <template slot="text">
                <i :class="data.icon + ' svg-external-icon svg-icon'"></i>
                <span slot='text'>{{'data.text'}}</span>
            </template>
            <template v-if="hasNodes" v-for="node in data.children">
                <nav-menu-item
                        :data="node"
                        :is-nest="true"
                        class="nest-menu"
                />
            </template>
        </el-submenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';


    import NavMenuItemData from './NavMenuItemData';


    @Component({
        components: {},
    })
    export default class NavMenuItem extends Vue {
        @Prop({
            type: NavMenuItemData,
            required: true,
            default: () => new NavMenuItemData(),
        })
        private data!: NavMenuItemData;

        @Prop({
            type: Boolean,
            required: false,
            default: () => false,
        })
        private isNest!: boolean;

        @Prop({
            type: String,
            required: false,
            default: () => '',
        })
        private basePath!: string;

        get hasNodes(): boolean {
            let has = false;
            if (this.data.children) {
                has = this.data.children.length > 0;
            }
            return has;
        }

        get classData() {
            return {};
        }

        private onClick(e: any) {
            const data = this.data;
            if (data && typeof data.click === 'function') {
                data.click(e);
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        font-size: 24px;
    }

    .svg-external-icon {
        /*background-color: currentColor;*/
        mask-size: cover !important;
        /*display: inline-block;*/
    }
</style>
