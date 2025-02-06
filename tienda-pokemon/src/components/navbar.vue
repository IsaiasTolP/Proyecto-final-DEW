<template>
    <nav>
        <div>
            <button>Ir a Login</button>
            <button>Registrarse</button>
            <button>Cerrar Sesión</button>
        </div>
    </nav>
    
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
export default {
    name: 'navigation',
}
</script>