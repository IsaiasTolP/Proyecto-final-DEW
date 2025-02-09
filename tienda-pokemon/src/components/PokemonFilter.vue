<template>
    <div class="p-4 border rounded mb-4">
        <h2 class="text-xl font-bold mb-4">{{ $t('filter.title' )}}</h2>
        <!-- Filtro por tipo -->
        <div class="mb-2">
            <label for="filterType" class="block mb-1">{{ $t('filter.type') }}</label>
            <input
                id="filterType"
                type="text"
                v-model="filterType"
                placeholder="Enter type"
                class="border p-2 w-full"
            />
        </div>
        <!-- Filtro por peso mínimo -->
        <div class="mb-2">
            <label for="filterWeight" class="block mb-1">{{ $t('filter.minWeight') }}</label>
            <input
                id="filterWeight"
                type="number"
                v-model.number="filterWeight"
                placeholder="Enter minimum weight"
                class="border p-2 w-full"
            /> 
        </div>
        <!-- Filtro por ataque mínimo -->
        <div class="mb-2">
            <label for="filterPower" class="block mb-1">{{ $t('filter.minAttack') }}</label>
            <input
                id="filterPower"
                type="number"
                v-model.number="filterPower"
                placeholder="Enter minimum attack"
                class="border p-2 w-full"
            />
        </div>
        <!-- Mensaje de no coincidencias -->
        <div v-if="filteredList.length === 0" class="text-red-500 mt-2">
            {{ $t('filter.noMatch') }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import type { Pokemon } from '@/models/Pokemon';
import { usePokemonStore } from '@/stores/PokemonStore.ts';

    // Inyectamos la variable reactiva "filteredPokemons" proporcionada por Home.
    const filteredPokemons = inject('filteredPokemons') as { value: Pokemon[] };
    if (!filteredPokemons) {
        throw new Error('filteredPokemons not provided');
    }

    // También usamos el store para obtener la lista completa de Pokémon.
    const pokemonStore = usePokemonStore();

    // Variables reactivas para cada criterio de filtro.
    const filterType = ref('');
    const filterWeight = ref(0);
    const filterPower = ref(0);

    // Computed que filtra la lista de Pokémon según los criterios.
    const filteredList = computed(() => {
        return pokemonStore.pokemons.filter((pkm) => {
        let matches = true;
        // Si se especifica un filtro por tipo, comprobamos que algún tipo del Pokémon coincida.
        if (filterType.value.trim()) {
            matches = pkm.pkm_type.some(t =>
            t.type.name.toLowerCase().includes(filterType.value.toLowerCase())
            );
        }
        // Comprobamos peso y ataque.
        return matches && pkm.weight >= filterWeight.value && pkm.attack >= filterPower.value;
    });
});

    // Actualizamos la variable inyectada cada vez que cambia el filtro.
    watch(filteredList, (newVal) => {
        filteredPokemons.value = newVal;
    }, { immediate: true });
    </script>