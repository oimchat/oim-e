import Vue from "vue";

import "./styles/quasar.sass";
import "quasar/dist/quasar.ie.polyfills";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import lang from "quasar/lang/zh-hans.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
// import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/eva-icons/eva-icons.css";
import {
    Quasar,
    Dialog,
    Notify,
} from "quasar";

Vue.use(Quasar, {
    config: {
        Notify: {},
    },
    components: {/* not needed if importStrategy is not 'manual' */},
    directives: {/* not needed if importStrategy is not 'manual' */},
    plugins: {
        Dialog,
        Notify,
    },
    lang: lang,
    iconSet: iconSet,
});
