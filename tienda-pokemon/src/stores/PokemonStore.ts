import { defineStore } from 'pinia';
import { PokemonComposable } from '@/composables/PokemonComposable';
import { type Pokemon } from '@/models/Pokemon.ts';
import { ref } from 'vue';

const pokemonComposable = new PokemonComposable();
export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([]);
    const loadPokemons = async () => {
        await pokemonComposable.loadPokemons();
        pokemons.value = pokemonComposable.getAllPokemons();
    };  
    return {
        pokemons,
        loadPokemons,
    };
});