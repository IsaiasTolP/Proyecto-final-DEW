import { defineStore } from 'pinia';
import { PokemonModel } from '@/models/PokemonModel.ts';
import { type Pokemon } from '@/models/Pokemon.ts';
import { ref } from 'vue';

const pokemonModel = new PokemonModel();
export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([]);
    const loadPokemons = async () => {
        await pokemonModel.loadPokemons();
        pokemons.value = pokemonModel.getAllPokemons();
    };  
    return {
        pokemons,
        loadPokemons,
    };
});