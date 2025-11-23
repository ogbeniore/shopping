<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

const handleCheckout = () => {
  alert('Proceeding to checkout...');
};
</script>

<template>
  <div class="bg-white border border-gray-300 rounded p-6">
    <h2 class="text-xl font-bold text-blue-900 mb-6">Cart Totals</h2>
    
    <div class="space-y-4 mb-6">
      <div class="flex justify-between">
        <span class="text-gray-700">Subtotals:</span>
        <span class="text-gray-900 font-medium">${{ cartStore.subtotal.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between">
        <span class="text-gray-700">Shipping</span>
        <span class="text-gray-900 font-medium">
          {{ cartStore.shippingCost > 0 ? `$${cartStore.shippingCost.toFixed(2)}` : '—' }}
        </span>
      </div>
      
      <div class="flex justify-between">
        <span class="text-gray-700">Tax (20%)</span>
        <span class="text-gray-900 font-medium">${{ cartStore.tax.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between pt-4 border-t border-gray-300">
        <span class="text-lg font-bold text-gray-900">Totals:</span>
        <span class="text-lg font-bold text-gray-900">${{ cartStore.totalAmount.toFixed(2) }}</span>
      </div>
    </div>
    
    <button
      @click="handleCheckout"
      class="w-full px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
    >
      Proceed To Checkout
    </button>
  </div>
</template>

