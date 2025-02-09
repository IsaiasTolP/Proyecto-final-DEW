<template>
    <div class="flex items-center space-x-4">
        <button
            @click="setLanguage('en')"
            :class="[
                'px-4 py-2 rounded transition-colors duration-200',
                currentLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
        >
            English
        </button>
        <button
            @click="setLanguage('es')"
            :class="[
                'px-4 py-2 rounded transition-colors duration-200',
                currentLanguage === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
        >
            Español
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    const currentLanguage = ref(locale.value);

    // Función para cambiar el idioma
    const setLanguage = (lang: string) => {
        locale.value = lang;
        currentLanguage.value = lang;
    };
</script>  