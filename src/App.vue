<template>
    <div class="app-root">
        <WindowDecorated></WindowDecorated>
        <router-view/>
    </div>
</template>
<script lang="ts">
    import './styles/oim/layout.css';
    import './styles/oim/app.scss';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import WindowDecorated from '@/platform/electron/view/WindowDecorated.vue';

    @Component({
        components: {
            WindowDecorated,
        },
    })
    export default class App extends Vue {
    }
</script>
<style lang="scss">
    .app-root {
        width: 100%;
        height: 100%;
    }
</style>
