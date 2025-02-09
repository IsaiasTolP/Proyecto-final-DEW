import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cart from '@/components/Cart.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '@/stores/CartStore';
import type { Pokemon } from '@/models/Pokemon';

vi.mock('@/firebase.ts', () => ({
  ConnectToFirebase: class {
    auth = { currentUser: { uid: 'test-user' } };
    createPurchase = vi.fn().mockResolvedValue('test-purchase-id');
  }
}));

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key, // Devuelve la clave en lugar de la traducción
  }),
}));

describe('Cart.vue', () => {
  let cartStore: ReturnType<typeof useCartStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
    cartStore.items = [
      {
        id: 1,
        name: 'Pikachu',
        attack: 55,
        price: 10,
        weight: 6,
        pkm_front: 'pikachu_front.png',
        pkm_back: 'pikachu_back.png',
        pkm_type: [{ type: { name: 'Electric' } }],
      },
      {
        id: 2,
        name: 'Charmander',
        attack: 52,
        price: 15,
        weight: 8.5,
        pkm_front: 'charmander_front.png',
        pkm_back: 'charmander_back.png',
        pkm_type: [{ type: { name: 'Fire' } }],
      },
    ] as Pokemon[];
  });

  it('muestra el número de ítems en el carrito', async () => {
    const wrapper = mount(Cart, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
    expect(wrapper.find('span.absolute').text()).toBe('2');
  });

  it('muestra los ítems en el carrito cuando está abierto', async () => {
    const wrapper = mount(Cart, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.html()).toContain('Pikachu');
    expect(wrapper.html()).toContain('Charmander');
  });

  it('elimina un ítem cuando se presiona el botón de eliminar', async () => {
    const wrapper = mount(Cart, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
    await wrapper.find('button').trigger('click');
    await wrapper.findAll('button.text-red-500')[0].trigger('click');
    expect(cartStore.items.length).toBe(1);
    expect(cartStore.items[0].name).toBe('Charmander');
  });

  it('vacía el carrito al presionar el botón de limpiar', async () => {
    const wrapper = mount(Cart, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
    await wrapper.find('button').trigger('click');
    await wrapper.find('button.bg-red-500').trigger('click');
    expect(cartStore.items.length).toBe(0);
  });

  it('procesa la compra correctamente', async () => {
    window.alert = vi.fn();
    const wrapper = mount(Cart, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
    await wrapper.find('button').trigger('click');
    await wrapper.find('button.bg-green-500').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('Purchase completed with ID: test-purchase-id');
    expect(cartStore.items.length).toBe(0);
  });
});
