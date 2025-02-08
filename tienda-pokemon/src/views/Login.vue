<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <img src="" alt="Logo pokemon">

                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome Back</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>
                <router-link to="/register" class="font-medium no-underline ml-2 text-primary cursor-pointer">Create today!</router-link>
            </div>

            <div>
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email</label>
                <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-4" v-model="email" />
                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password1" type="password" placehoder="Password" class="w-full mb-4" v-model="password" />
                <Button label="Sign In" icon="pi pi-user" class="w-full" @click="signIn" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.ts';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const router = useRouter();

const signIn = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
        router.push('/');
    } catch (error) {
        console.error('Error during login:',  error);
    }
}
</script>
