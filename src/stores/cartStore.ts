import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { productService, type CartItem } from '../services/productService';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);
  const shippingCost = ref<number>(0);
  const isLoading = ref<boolean>(false);

  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  const tax = computed(() => {
    return subtotal.value * 0.2; // 20% tax
  });

  const totalAmount = computed(() => {
    return subtotal.value + shippingCost.value + tax.value;
  });

  async function fetchInitialProducts() {
    isLoading.value = true;
    try {
      const products = await productService.fetchProducts(5);
      cartItems.value = products.map((product) => ({
        ...product,
        quantity: 1,
        color: 'Brown',
        size: 'XL',
      }));
    } catch (error) {
      console.error('Failed to fetch initial products:', error);
    } finally {
      isLoading.value = false;
    }
  }

  function updateQuantity(itemId: number, newQuantity: number) {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      if (newQuantity <= 0) {
        removeItem(itemId);
      } else {
        item.quantity = newQuantity;
      }
    }
  }

  function incrementQuantity(itemId: number) {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      item.quantity += 1;
    }
  }

  function decrementQuantity(itemId: number) {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        removeItem(itemId);
      }
    }
  }

  function removeItem(itemId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
  }

  function clearCart() {
    cartItems.value = [];
    shippingCost.value = 0;
  }

  async function addItem() {
    isLoading.value = true;
    try {
      const newProduct = await productService.addProduct({
        title: 'New Product',
        price: 29,
      });
      const cartItem: CartItem = {
        ...newProduct,
        quantity: 1,
        color: 'Brown',
        size: 'XL',
      };
      cartItems.value.push(cartItem);
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      isLoading.value = false;
    }
  }

  function calculateShipping() {
    // Mock shipping calculation - generate random cost
    shippingCost.value = Math.floor(Math.random() * 50) + 10;
  }

  return {
    cartItems,
    shippingCost,
    isLoading,
    subtotal,
    tax,
    totalAmount,
    fetchInitialProducts,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    addItem,
    calculateShipping,
  };
});

