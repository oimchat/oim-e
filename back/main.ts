import platformInitialize from '@/platform/initialize/PlatformInitialize';

platformInitialize.initialize();

import Vue from 'vue';
import App from './App.vue';
import routerManager from './router/RouterManager';
import store from './platform/store/store';

import './styles/iview/theme/index.less';
import ViewUI from 'view-design';

import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
// import 'iview/dist/styles/iview.css'; // 使用 CSS

import './platform/e/styles/top.css';
import './styles/compatible.less';
import './styles/drag.scss';
// @ts-ignore
import i18n from './platform/locale';

import 'viewerjs/dist/viewer.css';
// @ts-ignore
import Viewer from 'v-viewer';

Vue.use(Viewer);
Viewer.setDefaults({
    zIndexInline: 9999,
});


Vue.config.productionTip = false;
// 绑定i18n到全局变量上
Vue.prototype.i18n = i18n;
Vue.use(ViewUI);
Vue.use(elementUI);
// Vue.use(iView, {
//     i18n: (key: string, value: string) => i18n.t(key, value),
// });

const router = routerManager.getRouter();
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');


import './quasar';


