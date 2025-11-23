<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import type { CartItem as CartItemType } from '../services/productService';

const props = defineProps<{
  item: CartItemType;
}>();

const cartStore = useCartStore();

const handleRemove = () => {
  cartStore.removeItem(props.item.id);
};

const handleIncrement = () => {
  cartStore.incrementQuantity(props.item.id);
};

const handleDecrement = () => {
  cartStore.decrementQuantity(props.item.id);
};

const itemTotal = props.item.price * props.item.quantity;
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-200 gap-4">
    <!-- Product Info -->
    <div class="flex items-center flex-1">
      <div class="relative w-16 h-16 mr-4 bg-gray-200 rounded flex-shrink-0">
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover rounded"
        />
        <button
          @click="handleRemove"
          class="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-700 transition-colors"
          aria-label="Remove item"
        >
          ×
        </button>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-gray-900 truncate">{{ item.title }}</h3>
        <div class="text-sm text-gray-500 mt-1">
          <span v-if="item.color">Color: {{ item.color }}</span>
          <span v-if="item.color && item.size"> • </span>
          <span v-if="item.size">Size: {{ item.size }}</span>
        </div>
      </div>
    </div>

    <!-- Price -->
    <div class="flex md:block justify-between md:w-24 md:text-right md:mr-6">
      <span class="text-gray-600 md:hidden">Price:</span>
      <span class="text-gray-900 font-medium">${{ item.price.toFixed(2) }}</span>
    </div>

    <!-- Quantity Controls -->
    <div class="flex md:block items-center justify-between md:w-32 md:mr-6">
      <span class="text-gray-600 md:hidden">Quantity:</span>
      <div class="flex items-center border border-gray-300 rounded">
        <button
          @click="handleDecrement"
          class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          :value="item.quantity"
          @input="cartStore.updateQuantity(item.id, Math.max(1, parseInt(($event.target as HTMLInputElement).value) || 1))"
          min="1"
          class="w-12 text-center border-0 focus:outline-none focus:ring-0"
        />
        <button
          @click="handleIncrement"
          class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>

    <!-- Total -->
    <div class="flex md:block justify-between md:w-24 md:text-right">
      <span class="text-gray-600 md:hidden">Total:</span>
      <span class="text-gray-900 font-medium">${{ itemTotal.toFixed(2) }}</span>
    </div>
  </div>
</template>

