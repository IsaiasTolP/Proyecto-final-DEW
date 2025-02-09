<template>
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <router-link to="/" class="text-lg font-bold">{{ $t('logo') }}</router-link>

        <div class="flex items-center gap-4">
            <template v-if="!isLoggedIn">
                <router-link to="/login" class="hover:text-gray-400">{{ $t('goToLogin') }}</router-link>
                <router-link to="/register" class="hover:text-gray-400">{{ $t('goToRegister') }}</router-link>
            </template>

            <template v-else>
                <span class="text-green-400">{{ $t('logged') }}</span>
                <router-link to="/purchase-history" class="hover:text-gray-400">
                    {{ $t('purchaseHistory') }}
                </router-link>
                <button @click="logout" class="hover:text-red-500">{{ $t('logout') }}</button>
            </template>

            <Cart />

            <button @click="toggleDarkMode" class="hover:text-gray-400">
                <i v-if="isDarkMode" class="pi pi-sun text-xl"></i>
                <i v-else class="pi pi-moon text-xl"></i>
            </button>

            <LangSwitcher />
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ConnectToFirebase, app } from '@/firebase.ts';
import { UserAuth } from '@/services/auth.ts';
import Cart from '@/components/Cart.vue';
import LangSwitcher from '@/components/LangSwitcher.vue';

export default defineComponent({
    name: 'navigation',
    components: { Cart, LangSwitcher },
    setup() {
        const isLoggedIn = ref(false);
        const router = useRouter();
        const firebaseService = new ConnectToFirebase();
        const authServices = new UserAuth(app);
        const isDarkMode = ref(document.body.classList.contains('p-dark'));

        const toggleDarkMode = () => {
            isDarkMode.value = !isDarkMode.value;
            if (isDarkMode.value) {
                document.documentElement.classList.add('p-dark');
            } else {
                document.documentElement.classList.remove('p-dark');
            }
        };

        // Detectar cambios en el estado de autenticación
        onMounted(() => {
            firebaseService.onAuthStateChanged((user) => {
                isLoggedIn.value = !!user;
            });
        });

        // Función para cerrar sesión
        const logout = async () => {
            try {
                await authServices.signOut();
                isLoggedIn.value = false;
                router.push('/login');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        };

        return { isLoggedIn, logout, isDarkMode, toggleDarkMode };
    },
});
</script>
