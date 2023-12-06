import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import "remixicon/fonts/remixicon.css";
import "@/styles/index.scss";

// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";
// element icons
import * as Icons from "@element-plus/icons-vue";

// custom directives
import directives from "@/directives/index";
import elementPlus from "element-plus";
// import "element-plus/theme-chalk/index.css";
import "@/styles/element/var.scss";

const app = createApp(App);
app.use(directives);
app.use(router);
app.use(I18n);
app.use(pinia);
app.use(elementPlus);

app.config.errorHandler = errorHandler;
// register the element Icons component
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
});

app.mount("#app");
