# Shopping Cart Application

A responsive shopping cart application built with Vue 3, TypeScript, Tailwind CSS, and Pinia.

## Features

- **Product Management**: Fetch products from FakeStoreAPI and display them in the cart
- **Cart Functionality**:
  - Add items to cart
  - Remove individual items
  - Adjust item quantities
  - Clear entire cart
- **Calculations**:
  - Real-time subtotal calculation
  - 20% tax calculation
  - Shipping cost calculation (mocked)
  - Total amount calculation
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **State Management**: Uses Pinia for centralized state management

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Pinia** for state management
- **Vite** for build tooling
- **FakeStoreAPI** for product data

## Project Structure

```
src/
├── components/
│   ├── CartItem.vue          # Individual cart item component
│   ├── CartList.vue          # List of cart items
│   ├── CartPage.vue          # Main cart page layout
│   ├── CartTotals.vue        # Cart totals summary
│   └── ShippingCalculator.vue # Shipping calculation form
├── services/
│   └── productService.ts     # API service for products
├── stores/
│   └── cartStore.ts          # Pinia store for cart state
├── App.vue                   # Root component
├── main.ts                   # Application entry point
└── style.css                 # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopping-cart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## API Integration

The application uses the [FakeStoreAPI](https://fakestoreapi.com/) for product data:

- **GET** `/products?limit=5` - Fetches initial products
- **POST** `/products` - Adds a new product to the cart

## Features Implementation

### Core Features
- ✅ Fetch products on component mount
- ✅ Display cart items with image, title, price, quantity, and total
- ✅ Quantity adjustment controls (+/- buttons)
- ✅ Remove individual items
- ✅ Clear cart functionality
- ✅ Add item functionality (POST to API)
- ✅ Subtotal calculation
- ✅ Tax calculation (20%)
- ✅ Total calculation (Subtotal + Shipping + Tax)
- ✅ Responsive design

### Bonus Features
- ✅ Shipping calculation (mocked)
- ✅ Pinia state management
- ✅ TypeScript type safety
- ✅ Input validation

## Development

The project uses:
- **Vue 3 Composition API** for component logic
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Pinia** for state management


## License

MIT
