<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <img src="" alt="Logo pokemon">

                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Already have an account?</span>
                <a class="font-medium no-underline ml-2 text-primary cursor-pointer">Sign in Here</a>
            </div>

            <div>
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email</label>
                <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-4" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password1" type="password" placehoder="Password" class="w-full mb-4" />

                <Button label="Sign Up" icon="pi pi-user" class="w-full" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';

import { ref } from 'vue';

const checked1 = ref(true);
</script>