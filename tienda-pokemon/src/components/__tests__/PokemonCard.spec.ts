import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import PokemonCard from '@/components/PokemonCard.vue'; // Ajusta la ruta según sea necesario
import { createPinia, setActivePinia } from 'pinia';
import type { Pokemon } from '@/models/Pokemon.ts'; // Ajusta la ruta según sea necesario

// Mock para el store de carrito
const mockAddToCart = vi.fn();

vi.mock('@/stores/CartStore', () => ({
  useCartStore: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe('PokemonCard.vue', () => {
  let wrapper: VueWrapper<any>;
  let pinia: ReturnType<typeof createPinia>;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'Pikachu',
    attack: 50,
    price: 100,
    weight: 60,
    pkm_front: 'https://example.com/pikachu-front.png',
    pkm_back: 'https://example.com/pikachu-back.png',
    pkm_type: [
      { type: { name: 'Electric' } },
    ],
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    const options: MountingOptions<any> = {
      props: {
        pokemon: mockPokemon,
      },
      global: {
        plugins: [pinia],
        mocks: {
          $t: (msg: string) => msg,
        },
      },
    };

    wrapper = mount(PokemonCard, options);
  });

  it('renders the component with correct data', () => {
    expect(wrapper.text()).toContain('stats.attack: 50');
    expect(wrapper.text()).toContain('100€');
    expect(wrapper.text()).toContain('stats.weight: 60');
    expect(wrapper.text()).toContain('Pikachu');
    expect(wrapper.text()).toContain('Electric');
  });

  it('changes image on hover', async () => {
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://example.com/pikachu-front.png');

    await img.trigger('mouseover');
    await wrapper.vm.$nextTick(); // Espera un ciclo de actualización del DOM
    expect(img.attributes('src')).toBe('https://example.com/pikachu-back.png');
  });

  it('adds the Pokemon to the cart when the button is clicked', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(mockAddToCart).toHaveBeenCalledWith(mockPokemon);
  });
});
