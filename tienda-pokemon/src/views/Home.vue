<template>
    <navigation />
    <div class="container mx-auto px-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <PokemonCard
                v-for="pokemon in pokemonStore.pokemons"
                :key="pokemon.id"
                :pokemon="pokemon"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/PokemonStore.ts';
import navigation from "@/components/navbar.vue";
import PokemonCard from '@/components/PokemonCard.vue';

    const pokemonStore = usePokemonStore();

    onMounted(() => {
        pokemonStore.loadPokemons();
    });
</script>
