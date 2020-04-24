import Vue from 'vue';
import VueI18n from 'vue-i18n';
import localLangUtil from '../../app/lib/util/LocalLangUtil';
import customZhCn from './lang/zh-CN';
import customEnUs from './lang/en-US';


Vue.use(VueI18n);

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = localLang || localLangUtil.localRead('local') || 'zh-CN';

// 定义系统包含的语言，第一个为默认语言
Vue.prototype.language = lang;

const messages = {
    'zh-CN': customZhCn,
    'en-US': customEnUs,
};
const i18n = new VueI18n({
    locale: lang,
    messages,
});

export default i18n;

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
