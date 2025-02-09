<template>
    <navigation />
    <div class="container mx-auto px-3">
        <!-- Componente de filtro -->
        <PokemonFilter class="my-2" />
        <!-- Listado de Pokémon: se muestran los filtrados si existen, o todos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <PokemonCard
            v-for="pokemon in displayPokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, provide } from 'vue';
import { usePokemonStore } from '@/stores/PokemonStore.ts';
import navigation from "@/components/navbar.vue";
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonFilter from '@/components/PokemonFilter.vue';

    const pokemonStore = usePokemonStore();

    // Cargamos la lista completa de Pokémon al montar el componente.
    onMounted(() => {
        pokemonStore.loadPokemons();
    });

    // Variable reactiva para almacenar la lista filtrada (inicialmente vacía)
    const filteredPokemons = ref([]);
    // Proveemos la variable para que otros componentes descendientes puedan inyectarla.
    provide('filteredPokemons', filteredPokemons);

    // Computed que decide qué lista mostrar: si hay filtros activos se usa la lista filtrada;
    // de lo contrario, se muestra la lista completa del store.
    const displayPokemons = computed(() => {
        return filteredPokemons.value.length > 0 ? filteredPokemons.value : pokemonStore.pokemons;
    });
</script>
