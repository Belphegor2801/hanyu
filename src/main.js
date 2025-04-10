import { createApp } from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';

const app = createApp(App);
app.use(VTooltip);
app.mount('#app');