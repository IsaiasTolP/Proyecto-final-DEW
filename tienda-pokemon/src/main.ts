import '@/assets/base.css';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { NoirPreset } from '@/themes/app-theme';
import App from './App.vue';
import router from './router';

const app = createApp(App)

app.use(createPinia());
app.use(router);


app.use(PrimeVue, {
    theme: {
        preset: NoirPreset,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
});

app.mount('#app');
