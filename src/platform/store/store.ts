import Vue from 'vue';
import Vuex from 'vuex';

import appObject from '@/app/App';
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
            platformInitialize.initialize();
        },
    },
    actions: {},
});
