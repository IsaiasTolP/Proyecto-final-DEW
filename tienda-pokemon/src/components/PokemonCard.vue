<template>
    <div :id="`${pokemon.id}`" class="bg-white rounded-lg shadow-md p-4 m-4">
        <!-- Encabezado con datos de ataque y precio -->
        <div class="flex justify-between items-center mb-4">
            <div class="text-sm font-medium text-gray-600">
                {{ $t('stats.attack') }}: {{ pokemon.attack }}
            </div>
            <div class="text-lg font-bold text-green-600">
                {{ pokemon.price }}€
            </div>
        </div>
    
        <!-- Contenedor para la imagen con eventos de hover -->
        <div @mouseover="isHovered = true" @mouseleave="isHovered = false">
            <img
            v-if="displayedImage"
            :src="displayedImage"
            :alt="`${pokemon.name} ${isHovered ? 'back' : 'front'} view`"
            class="w-full object-contain mb-4"
            />
        </div>

        <!-- Información del Pokémon -->
        <div class="mb-4">
            <span class="text-sm text-gray-500">{{ pokemon.id }}.</span>
            <h3 class="text-xl font-bold text-gray-800">{{ pokemon.name }}</h3>
            <p class="text-sm text-gray-600">{{ $t('stats.weight') }}: {{ pokemon.weight }}</p>
        </div>

        <!-- Tipos del Pokémon -->
        <div class="flex flex-wrap gap-2">
            <span
            v-for="(type, index) in pokemon.pkm_type"
            :key="index"
            class="bg-indigo-600 text-white px-2 py-1 rounded text-xs"
            >
                {{ type.type.name }}
            </span>
        </div>
        <!-- Carrito -->
        <div class="mt-4">
            <button
                @click="addPokemonToCart"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
            {{ $t('cart.addToCart') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useCartStore } from '@/stores/CartStore';
import type { Pokemon } from '@/models/Pokemon.ts';

    const props = defineProps<{pokemon: Pokemon;}>();
    const cartStore = useCartStore();

    // Variable reactiva para detectar si el ratón está sobre el contenedor
    const isHovered = ref(false);

    // Computed que retorna la imagen a mostrar según el estado de "isHovered"
    const displayedImage = computed(() => {
        if (isHovered.value && props.pokemon.pkm_back) {
            return props.pokemon.pkm_back;
        }
    return props.pokemon.pkm_front;
    });

    // Función para añadir un Pokémon al carrito
    const addPokemonToCart = () => {
        cartStore.addToCart(props.pokemon);
    };
</script>