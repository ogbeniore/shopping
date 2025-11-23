<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

const city = ref('Stuttgart');
const address = ref('Mirpur Dhaka - 1200');
const postalCode = ref('12345');

const handleCalculateShipping = () => {
  cartStore.calculateShipping();
};
</script>

<template>
  <div class="bg-white border border-gray-300 rounded p-6 mt-6">
    <h2 class="text-xl font-bold text-blue-900 mb-6">Calculate Shopping</h2>
    
    <div class="space-y-4">
      <input
        v-model="city"
        type="text"
        placeholder="Stuttgart"
        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      
      <input
        v-model="address"
        type="text"
        placeholder="Mirpur Dhaka - 1200"
        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      
      <input
        v-model="postalCode"
        type="text"
        placeholder="12345"
        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      
      <button
        @click="handleCalculateShipping"
        class="w-full px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
      >
        Calculate Shipping
      </button>
    </div>
  </div>
</template>

