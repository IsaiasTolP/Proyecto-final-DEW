<template>
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div class="text-lg font-bold">Mi Tienda Pokémon</div>

        <div class="flex gap-4">
            <template v-if="!isLoggedIn">
                <router-link to="/login" class="hover:text-gray-400">Ir a Login</router-link>
                <router-link to="/register" class="hover:text-gray-400">Registrarse</router-link>
            </template>

            <template v-else>
                <span class="text-green-400">¡Estás logueado!</span>
                <button @click="logout" class="hover:text-red-500">Cerrar Sesión</button>
            </template>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ConectToFirebase, app } from '@/firebase.ts';
import { UserAuth } from '@/services/auth.ts';

export default defineComponent({
    name: 'navigation',
    setup() {
        const isLoggedIn = ref(false);
        const router = useRouter();
        const firebaseService = new ConectToFirebase();
        const authServices = new UserAuth(app);

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

        return { isLoggedIn, logout };
    },
});
</script>
