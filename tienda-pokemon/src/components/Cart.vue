<template>
    <div class="relative">
        <button @click="toggleCart" class="relative">
            <i class="pi pi-shopping-cart text-2xl"></i>
            <!-- Contador de ítems -->
            <span v-if="cartStore.items.length > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {{ cartStore.items.length }}
            </span>
        </button>

        <div v-if="isOpen" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <div v-if="cartStore.items.length > 0">
                <div
                    v-for="item in cartStore.items"
                    :key="item.id"
                    class="flex justify-between items-center border-b py-2"
                >
                    <span class="font-bold text-gray-800">{{ item.name }}</span><span class="text-lg font-bold text-green-600">{{ item.price }}€</span>
                    <button @click="removeItem(item.id)" class="text-red-500">X</button>
                </div>
                <button @click="clearCart" class="mt-4 bg-red-500 text-white px-3 py-1 rounded w-full">
                    {{ $t('cart.clearCart') }}
                </button>
                <button @click="buyItems" class="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full">
                    {{ $t('cart.buyItems') }}
                </button>
            </div>
            <div v-else class="text-center text-gray-500">
                {{ $t('cart.empty') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/CartStore.ts';
import { ConnectToFirebase } from '@/firebase.ts';
    
    const firebaseService = new ConnectToFirebase();
    const cartStore = useCartStore();
    const cartItems = cartStore.items;
    const isOpen = ref(false);

    // Desplegable del carrito
    const toggleCart = () => {
        isOpen.value = !isOpen.value;
    };

    const removeItem = (id: number) => {
        cartStore.removeFromCart(id);
    };

    const clearCart = () => {
        cartStore.clearCart();
    };

    const calculateTotal = (): number => {
        return parseFloat(cartItems.reduce((total, item) => total + item.price, 0).toFixed(2));
    }

    // Función para realizar una compra de pokemons
    const buyItems = async () => {
        try {
            const purchaseData = {
                userId: firebaseService.auth.currentUser?.uid,
                pokemons: cartItems.map(item => item.name),
                pokemonIds: cartItems.map(item => item.id),
                total: calculateTotal(),
                createdAt: new Date().toISOString(),
            };
            const purchaseId = await firebaseService.createPurchase(purchaseData);
            alert(`Purchase completed with ID: ${purchaseId}`);
            cartStore.clearCart();
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing your purchase. Please try again later.');
        }
    };
</script>