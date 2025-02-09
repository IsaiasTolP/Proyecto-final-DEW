<template>
    <navigation />
    <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold mb-4">{{ $t('purchaseHistory') }}</h1>

        <div v-if="loading" class="text-center text-gray-600">
            {{ $t('history.loadingMsg') }}
        </div>
        <div v-else>
            <div v-if="purchases.length > 0">
                <div 
                    v-for="purchase in purchases" 
                    :key="purchase.id" 
                    class="border p-4 mb-4 rounded shadow-sm"
                >
                    <p><strong>{{ $t('history.purchaseId') }}:</strong> {{ purchase.id }}</p>
                    <p><strong>{{ $t('history.date') }}:</strong> {{ formatDate(purchase.createdAt) }}</p>
                    <p><strong>{{ $t('history.purchasedPokemons') }}:</strong> {{ purchase.pokemons.join(', ') }}</p>
                    <p><strong>{{ $t('history.total') }}:</strong> {{ purchase.total }}€</p>
                </div>
            </div>
            <div v-else class="text-center text-gray-600">
                {{ $t('history.noPurchases') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ConnectToFirebase } from '@/firebase.ts';
import type { PurchaseData } from '@/firebase.ts';
import navigation from "@/components/navbar.vue";

    const firebaseService = new ConnectToFirebase();
    // Extendemos la interfaz para incluir el id del documento
    interface Purchase extends PurchaseData {
        id: string;
    }

    const purchases = ref<Purchase[]>([]);
    const loading = ref<boolean>(true);

    

    const fetchPurchases = async () => {
        try {
            const data = await firebaseService.readAllPurchases();
            purchases.value = data as Purchase[];
        } catch (error) {
            console.error("Error al cargar las compras:", error);
        } finally {
            loading.value = false;
        }
    };
    onMounted(() => {
        firebaseService.onAuthStateChanged((user) => {
            if (user) {
                fetchPurchases();
            } else {
                console.error("No hay usuario logueado");
                loading.value = false;
            }
        });
    });

    // Función para formatear la fecha
    const formatDate = (date: Date | string): string => {
        const d = new Date(date);
        return d.toLocaleString();
    };
</script>