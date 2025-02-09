import { describe, it, expect, vi } from 'vitest';
import { Pokemon } from '@/models/Pokemon.ts';
import PokemonFilter from '@/components/PokemonFilter.vue';
import { usePokemonStore } from '@/stores/PokemonStore.ts';
import { mount } from '@vue/test-utils';


// Creamos una función mock para los Pokémon
const mockPokemons = [
  new Pokemon({
    name: 'Pikachu',
    id: 1,
    stats: [{ base_stat: 55 }],
    weight: 60,
    sprites: {
      front_default: 'pikachu-front.png',
      back_default: 'pikachu-back.png',
    },
    types: [{ type: { name: 'electric' } }],
  }),
  new Pokemon({
    name: 'Bulbasaur',
    id: 2,
    stats: [{ base_stat: 49 }],
    weight: 69,
    sprites: {
      front_default: 'bulbasaur-front.png',
      back_default: 'bulbasaur-back.png',
    },
    types: [{ type: { name: 'grass' } }],
  }),
  new Pokemon({
    name: 'Charmander',
    id: 3,
    stats: [{ base_stat: 52 }],
    weight: 85,
    sprites: {
      front_default: 'charmander-front.png',
      back_default: 'charmander-back.png',
    },
    types: [{ type: { name: 'fire' } }],
  }),
];

// Mock del store de Pokémon para usar en nuestras pruebas
vi.mock('@/stores/PokemonStore.ts', () => {
  return {
    usePokemonStore: vi.fn().mockReturnValue({
      pokemons: mockPokemons,
      loadPokemons: vi.fn(),
    }),
  };
});

describe('PokemonFilter', () => {
  it('filtra por tipo correctamente', async () => {
    const { getByLabelText, emitted } = mount(PokemonFilter);

    // Simulamos un filtro por tipo (por ejemplo, "electric")
    const filterInput = getByLabelText('Type');
    await filterInput.setValue('electric');

    // Verificamos que los Pokémon filtrados tengan el tipo 'electric'
    const store = usePokemonStore();
    const filteredPokemons = store.pokemons.filter((pokemon) =>
      pokemon.pkm_type.some((type) => type.type.name.includes('electric'))
    );
    expect(filteredPokemons.length).toBe(1);
    expect(filteredPokemons[0].name).toBe('Pikachu');
  });

  it('filtra por peso correctamente', async () => {
    const { getByLabelText } = mount(PokemonFilter);

    // Filtramos por peso mayor o igual a 70
    const weightInput = getByLabelText('Minimum Weight');
    await weightInput.setValue('70');

    const store = usePokemonStore();
    const filteredPokemons = store.pokemons.filter((pokemon) => pokemon.weight >= 70);

    // Verificamos que solo el Pokémon que pesa más de 70 esté en la lista
    expect(filteredPokemons.length).toBe(2);
    expect(filteredPokemons[0].name).toBe('Bulbasaur');
    expect(filteredPokemons[1].name).toBe('Charmander');
  });

  it('filtra por ataque correctamente', async () => {
    const { getByLabelText } = mount(PokemonFilter);

    // Filtramos por ataque mayor o igual a 50
    const powerInput = getByLabelText('Minimum Attack');
    await powerInput.setValue('50');

    const store = usePokemonStore();
    const filteredPokemons = store.pokemons.filter((pokemon) => pokemon.attack >= 50);

    // Verificamos que solo los Pokémon con ataque mayor o igual a 50 estén en la lista
    expect(filteredPokemons.length).toBe(2);
    expect(filteredPokemons[0].name).toBe('Pikachu');
    expect(filteredPokemons[1].name).toBe('Charmander');
  });

  it('muestra "No matching Pokémon found" cuando no haya coincidencias', async () => {
    const { getByLabelText, getByText } = mount(PokemonFilter);

    // Establecemos filtros que no coinciden con ningún Pokémon
    const typeInput = getByLabelText('Type');
    await typeInput.setValue('dragon');

    // Verificamos que el mensaje de no coincidencias aparezca
    const noMatchMessage = getByText('No matching Pokémon found');
    expect(noMatchMessage).toBeInTheDocument();
  });
});
