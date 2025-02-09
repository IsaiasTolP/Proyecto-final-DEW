import '@/assets/base.css';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { NoirPreset } from '@/themes/app-theme';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(i18n);


app.use(PrimeVue, {
    theme: {
        preset: NoirPreset,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false
        }
    }
});

app.mount('#app');
