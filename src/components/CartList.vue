<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import CartItem from './CartItem.vue';

const cartStore = useCartStore();
</script>

<template>
  <div class="w-full">
    <!-- Table Header -->
    <div class="hidden md:flex items-center py-4 border-b-2 border-blue-900 mb-4">
      <div class="flex-1 font-bold text-blue-900">Product</div>
      <div class="w-24 text-right font-bold text-blue-900 mr-6">Price</div>
      <div class="w-32 text-center font-bold text-blue-900 mr-6">Quantity</div>
      <div class="w-24 text-right font-bold text-blue-900">Total</div>
    </div>

    <!-- Cart Items -->
    <div v-if="cartStore.cartItems.length > 0" class="space-y-0">
      <CartItem
        v-for="item in cartStore.cartItems"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="py-12 text-center text-gray-500">
      <p>Your cart is empty</p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4 mt-6">
      <button
        @click="cartStore.addItem"
        :disabled="cartStore.isLoading"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ cartStore.isLoading ? 'Adding...' : 'Add Item' }}
      </button>
      <button
        @click="cartStore.clearCart"
        :disabled="cartStore.cartItems.length === 0"
        class="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Cart
      </button>
    </div>
  </div>
</template>

