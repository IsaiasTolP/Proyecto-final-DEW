<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <!-- Encabezado -->
            <div class="text-center mb-8">
                <img src="../assets/Poke_Ball_icon.svg.png" alt="Logo pokemon" class="inline" width="100" height="100" />
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                <!-- Muestra título según el modo -->
                <template v-if="mode === 'login'">{{ $t('login.welcomeBack') }}</template>
                <template v-else>{{ $t('login.welcome') }}</template>
                </div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">
                <!-- Mensaje según el modo -->
                <template v-if="mode === 'login'">{{ $t('login.noAccount') }}</template>
                <template v-else>{{ $t('login.haveAccount') }}</template>
                </span>
                <!-- Enlace para cambiar de modo -->
                <router-link
                    v-if="mode === 'login'"
                    to="/register"
                    class="font-medium no-underline ml-2 text-primary cursor-pointer"
                >
                    {{ $t('login.createToday') }}
                </router-link>
                <router-link
                    v-else
                    to="/login"
                    class="font-medium no-underline ml-2 text-primary cursor-pointer"
                >
                    {{ $t('login.signInHere') }}
                </router-link>
            </div>

            <!-- Formulario -->
            <div>
                <SignFormFields
                    v-model:email="email"
                    v-model:password="password"
                >
                    <template v-if="mode === 'register'">
                        <label for="confirmPassword" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">
                            {{ $t('login.confirmPwd') }}
                        </label>
                        <InputText
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            class="w-full mb-4"
                            v-model="confirmPassword"
                        />
                    </template>
                </SignFormFields>

                <!-- Botón: Sign In para login, Sign Up para registro -->
                <Button
                    v-if="mode === 'login'"
                    label="Sign In"
                    icon="pi pi-user"
                    class="w-full"
                    @click="signIn"
                />
                <Button
                    v-else
                    label="Sign Up"
                    icon="pi pi-user"
                    class="w-full"
                    @click="registerUser"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { app } from '@/firebase.ts';
import { UserAuth } from '@/services/auth.ts';
import SignFormFields from '@/components/SignFormFields.vue';

    /* Este es un componente unificado para el login y registro de usuarios
        * Se basa en la URL actual para determinar si se trata de un login o registro.
        * El formulario se adapta según el modo.
        * Se utiliza el servicio de autenticación para manejar el login y registro.
        * Al iniciar sesión o registrarse, se guarda el token en el almacenamiento local y se redirige a la página principal.
        * Es un tanto más complejo que hacerlo por componentes separados, pero es más limpio y fácil de mantener.
    */

    // Accedemos a la ruta actual para determinar el modo
    const route = useRoute();
    const router = useRouter();

    // Computed para definir el modo según la URL
    const mode = computed(() => {
        // Si la ruta contiene "register", se asume que es registro; de lo contrario, login.
        return route.path.includes('register') ? 'register' : 'login';
    });

    // Estados para el formulario
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    // Instancia del servicio de autenticación
    const userAuthentication = new UserAuth(app);

    // Función para iniciar sesión
    const signIn = async () => {
        try {
            const userCredential = await userAuthentication.login(email.value, password.value);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            router.push('/'); // Redirige a la página principal
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Función para registrar al usuario
    const registerUser = async () => {
    // Validar que las contraseñas coincidan
        if (password.value !== confirmPassword.value) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const userCredential = await userAuthentication.register(email.value, password.value);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            router.push('/');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
</script>
