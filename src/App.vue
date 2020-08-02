<template>
    <div id="app" class="app-main">
        <WindowDecorated></WindowDecorated>
        <router-view/>
    </div>
</template>
<script lang="ts">
    import './styles/oim/layout.css';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import WindowDecorated from '@/platform/e/view/WindowDecorated.vue';

    @Component({
        components: {
            WindowDecorated,
        },
    })
    export default class App extends Vue {
    }
</script>
<style lang="scss">
    .app-main {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
</style>
