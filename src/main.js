import { createApp } from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';

const app = createApp(App);


import { createPinia } from 'pinia';
const pinia = createPinia();

app.use(pinia);
app.use(VTooltip);
app.mount('#app');