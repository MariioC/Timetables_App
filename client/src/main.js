import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Service
import AppService from "./services/appService";

// Socket
import VueSocketIO from "vue-socket.io";

Vue.prototype.$AppService = AppService;

Vue.use(
    new VueSocketIO({
        connection: "http://localhost:3000",
        options: { transports: ['websocket', 'polling', 'flashsocket'] } //Optional options
    })
);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
