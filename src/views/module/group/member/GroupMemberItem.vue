<template>
    <div :class="'icon-item-simple'" @contextmenu="$emit('contextmenu', $event)">
        <div class="avatar">
            <img :class="'img'" :src="avatar" alt="头像">
        </div>
        <div class="info">
            <h3 class="nickname">
                <span class="nickname-text">{{name}}</span>
            </h3>
        </div>
        <div class="extend">
            <slot name="extend"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class GroupMemberItem extends Vue {
        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private avatar!: string;

        @Prop({
            type: String,
            required: false,
            default: () => (''),
        })
        private name!: string;

    }
</script>

<style scoped>


    .icon-item-simple {
        overflow: hidden;
        padding: 2px 18px 2px;
        /*border-bottom: 1px solid #647481;*/
        position: relative
    }

    .icon-item-simple.extend {
        float: right;
    }


    .icon-item-simple.top {
        background-color: #2e3641
    }

    .icon-item-simple:hover {
        background: #cbced0
    }

    .icon-item-simple.active .extend, .icon-item-simple.active .info .msg {
        color: #181818
    }

    .icon-item-simple .avatar {
        float: left;
        margin-right: 10px;
        position: relative;
        cursor: pointer;
    }

    .icon-item-simple .avatar .img {
        display: block;
        width: 24px;
        height: 24px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .icon-item-simple .avatar .icon {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #fff;
        font-style: normal;
        font-size: 12px;
        text-align: center
    }

    .icon-item-simple .info {
        overflow: hidden
    }

    .icon-item-simple .info .nickname {
        font-weight: 400;
        font-size: 13px;
        color: #0a0a0a;
        line-height: 20px
    }

    .icon-item-simple .info .nickname-text {
        width: 100%;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .icon-item-simple .info .nickname_count, .icon-item-simple .info .nickname-text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top
    }

    .icon-item-simple .info .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em
    }

    .icon-item-simple .extend {
        float: right;
        color: #6b6f7c;
        font-size: 13px;
        text-align: right
    }

    .icon-item-simple .extend .attr {
        height: 19px;
        line-height: 1.5
    }
</style>
