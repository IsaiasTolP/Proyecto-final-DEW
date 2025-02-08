<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <img src="" alt="Logo pokemon">

                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Already have an account?</span>
                <router-link to="/login" class="font-medium no-underline ml-2 text-primary cursor-pointer">Sign in Here</router-link>
            </div>

            <div>
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email</label>
                <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-4" v-model="email" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password1" type="password" placehoder="Password" class="w-full mb-4"  v-model="password"/>

                <label for="confirmPassword" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Confirm Password</label>
                <InputText id="confirmPassword" type="password" placehoder="Confirm Password" class="w-full mb-4"  v-model="confirmPassword"/>

                <Button label="Sign Up" icon="pi pi-user" class="w-full" @click="registerUser"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import { app } from '@/firebase.ts';
import { ref } from 'vue';
import { UserAuth } from '@/services/auth.ts';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const userAuthentication = new UserAuth(app);

const registerUser = async () => {
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
        console.error('Error during registration:',  error);
    }
    

}
</script>