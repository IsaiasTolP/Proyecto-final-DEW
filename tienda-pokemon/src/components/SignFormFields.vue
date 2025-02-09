<template>
    <LangSwitcher class="justify-center" />
    <!-- Email -->
    <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">
        {{ $t('login.email') }}
    </label>
    <InputText
        id="email1"
        type="text"
        placeholder="Email address"
        class="w-full mb-4"
        v-model="email"
    />
    <!-- Password -->
    <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">
        {{ $t('login.password') }}
    </label>
    <InputText
        id="password1"
        type="password"
        placeholder="Password"
        class="w-full mb-4"
        v-model="password"
    />
    <!-- Este slot se usará para rellenar si hay algun campo que falta -->
    <slot></slot>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import InputText from 'primevue/inputtext';
import LangSwitcher from '@/components/LangSwitcher.vue';

    /*
        * Definimos las propiedades email y password que serán recibidas desde el componente padre.
        * Emitimos los eventos update:email y update:password para que el componente padre pueda actualizar las propiedades.
        * Usamos watch para emitir los eventos cuando las propiedades cambien.
    */

    interface Props {
        email: string;
        password: string;
    };
    const props = defineProps<Props>();
    const emit = defineEmits<{
        (event: 'update:email', value: string): void;
        (event: 'update:password', value: string): void;
    }>();

    const email = ref(props.email);
    const password = ref(props.password);

    watch(email, (newValue) => {
        emit('update:email', newValue);
    });
    watch(password, (newValue) => {
        emit('update:password', newValue);
    });
</script>