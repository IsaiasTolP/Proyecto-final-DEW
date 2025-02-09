// src/stores/cartStore.ts
import { defineStore } from 'pinia';
import type { Pokemon } from '@/models/Pokemon';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as Pokemon[],
    }),
    actions: {
        addToCart(pokemon: Pokemon) {
            if (!this.items.find(item => item.id === pokemon.id)) {
                this.items.push(pokemon);
            }
        },
        removeFromCart(id: number) {
            this.items = this.items.filter(pokemon => pokemon.id !== id);
        },
        clearCart() {
            this.items = [];
        },
    },
});
