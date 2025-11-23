import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '../cartStore';
import { productService } from '../../services/productService';

// Mock the productService
vi.mock('../../services/productService', () => ({
  productService: {
    fetchProducts: vi.fn(),
    addProduct: vi.fn(),
  },
}));

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 10 },
  };

  it('initializes with default state', () => {
    const store = useCartStore();
    expect(store.cartItems).toEqual([]);
    expect(store.shippingCost).toBe(0);
    expect(store.isLoading).toBe(false);
    expect(store.subtotal).toBe(0);
    expect(store.tax).toBe(0);
    expect(store.totalAmount).toBe(0);
  });

  describe('fetchInitialProducts', () => {
    it('fetches products and populates cart', async () => {
      const store = useCartStore();
      const mockProducts = [mockProduct];
      (productService.fetchProducts as any).mockResolvedValue(mockProducts);

      await store.fetchInitialProducts();

      expect(productService.fetchProducts).toHaveBeenCalledWith(5);
      expect(store.cartItems).toHaveLength(1);
      expect(store.cartItems[0]).toEqual({
        ...mockProduct,
        quantity: 1,
        color: 'Brown',
        size: 'XL',
      });
      expect(store.isLoading).toBe(false);
    });

    it('handles error during fetch', async () => {
      const store = useCartStore();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (productService.fetchProducts as any).mockRejectedValue(new Error('API Error'));

      await store.fetchInitialProducts();

      expect(store.cartItems).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('addItem', () => {
    it('adds a new product to the cart', async () => {
      const store = useCartStore();
      const newProduct = { ...mockProduct, id: 2, title: 'New Product', price: 29 };
      (productService.addProduct as any).mockResolvedValue(newProduct);

      await store.addItem();

      expect(productService.addProduct).toHaveBeenCalled();
      expect(store.cartItems).toHaveLength(1);
      expect(store.cartItems[0].title).toBe('New Product');
      expect(store.cartItems[0].price).toBe(29);
      expect(store.isLoading).toBe(false);
    });
  });

  describe('Quantity Management', () => {
    it('increments quantity', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 1 }];

      store.incrementQuantity(1);

      expect(store.cartItems[0].quantity).toBe(2);
    });

    it('decrements quantity', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 2 }];

      store.decrementQuantity(1);

      expect(store.cartItems[0].quantity).toBe(1);
    });

    it('removes item when decrementing from 1', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 1 }];

      store.decrementQuantity(1);

      expect(store.cartItems).toHaveLength(0);
    });

    it('updates quantity directly', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 1 }];

      store.updateQuantity(1, 5);

      expect(store.cartItems[0].quantity).toBe(5);
    });

    it('removes item if updated quantity is <= 0', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 1 }];

      store.updateQuantity(1, 0);

      expect(store.cartItems).toHaveLength(0);
    });
  });

  describe('Cart Operations', () => {
    it('removes an item', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, quantity: 1 }];

      store.removeItem(1);

      expect(store.cartItems).toHaveLength(0);
    });

    it('clears the cart', () => {
      const store = useCartStore();
      store.cartItems = [
        { ...mockProduct, quantity: 1 },
        { ...mockProduct, id: 2, quantity: 1 },
      ];
      store.shippingCost = 10;

      store.clearCart();

      expect(store.cartItems).toHaveLength(0);
      expect(store.shippingCost).toBe(0);
    });
  });

  describe('Calculations', () => {
    it('calculates subtotal, tax, and total correctly', () => {
      const store = useCartStore();
      // Item 1: 100 * 2 = 200
      // Item 2: 50 * 1 = 50
      // Subtotal = 250
      store.cartItems = [
        { ...mockProduct, id: 1, price: 100, quantity: 2 },
        { ...mockProduct, id: 2, price: 50, quantity: 1 },
      ];

      expect(store.subtotal).toBe(250);
      
      // Tax is 20% of subtotal: 250 * 0.2 = 50
      expect(store.tax).toBe(50);

      // Total = Subtotal + Shipping + Tax
      // 250 + 0 + 50 = 300
      expect(store.totalAmount).toBe(300);
    });

    it('includes shipping in total', () => {
      const store = useCartStore();
      store.cartItems = [{ ...mockProduct, price: 100, quantity: 1 }];
      store.shippingCost = 20;

      // Subtotal: 100
      // Tax: 20
      // Shipping: 20
      // Total: 140
      expect(store.totalAmount).toBe(140);
    });

    it('calculates random shipping cost', () => {
      const store = useCartStore();
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5; // (0.5 * 50) + 10 = 35
      global.Math = mockMath;

      store.calculateShipping();
      
      expect(store.shippingCost).toBeGreaterThanOrEqual(10);
      expect(store.shippingCost).toBeLessThanOrEqual(60); // 10 + 50
    });
  });
});

