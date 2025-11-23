<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '../stores/cartStore';
import CartList from './CartList.vue';
import CartTotals from './CartTotals.vue';
import ShippingCalculator from './ShippingCalculator.vue';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchInitialProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div v-if="cartStore.isLoading && cartStore.cartItems.length === 0" class="text-center py-12">
        <p class="text-gray-500">Loading products...</p>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Cart List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg p-6">
            <CartList />
          </div>
        </div>
        
        <!-- Right Column - Totals and Shipping -->
        <div class="lg:col-span-1">
          <CartTotals />
          <ShippingCalculator />
        </div>
      </div>
    </div>
  </div>
</template>

