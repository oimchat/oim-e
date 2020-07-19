import Vue from 'vue';
import Vuex from 'vuex';

import appObject from '@/app/App';
import appInitialize from '@/impl/initialize/AppInitialize';
import platformInitialize from '@/platform/initialize/PlatformInitialize';
import groupChatViewModel from '@/impl/data/GroupChatViewModel';
import userChatViewModel from '@/impl/data/UserChatViewModel';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: appObject,
    },
    mutations: {
        logout() {
            appObject.logout();
            groupChatViewModel.clear();
            userChatViewModel.clear();
            appInitialize.initialize();
            platformInitialize.initialize();
        },
    },
    actions: {},
});
