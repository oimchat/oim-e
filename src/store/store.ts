import Vue from 'vue';
import Vuex from 'vuex';

import appObject from '@/app/App';
import appInitialize from '@/impl/initialize/AppInitialize';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: appObject,
    },
    mutations: {
        logout() {
            appObject.logout();
            appInitialize.initialize();
        },
    },
    actions: {},
});
