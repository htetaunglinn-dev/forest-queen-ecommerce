# Forest Queen - Premium Outdoor & Camping Equipment

A modern, responsive ecommerce landing page for a camping equipment store built with Next.js 14+, React, TypeScript, and Tailwind CSS.

![Forest Queen Landing Page](https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=400&fit=crop)

## Features

### Design & UX
- 🎨 Modern, nature-inspired design with forest greens and earth tones
- 📱 Fully responsive mobile-first design
- ✨ Smooth animations and transitions
- 🖼️ Image hover effects and loading states
- 🎯 Clean typography and professional spacing

### Components
- **Header**: Sticky navigation with search, cart, and mobile menu
- **Hero Section**: Compelling hero with call-to-action and statistics
- **Categories**: Interactive category grid with hover effects
- **Product Showcase**: Filterable product grid with 12 sample products
- **Product Cards**: Detailed cards with ratings, prices, and badges
- **Quick View Modal**: Popup product details with quantity selector
- **Trust Indicators**: Free shipping, returns, support, and security badges
- **Newsletter**: Email subscription with success state
- **Footer**: Comprehensive footer with links and social media

### Features
- Product category filtering (All, Tents, Sleeping Bags, Backpacks, etc.)
- Product quick view modal
- Shopping cart badge with item count
- Star ratings and review counts
- Sale badges and discount percentages
- Stock status indicators
- Responsive mobile navigation
- Custom scrollbar styling

## Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist Sans & Geist Mono

## Project Structure

```
forest-queen-ecommerce/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation header
│   │   └── Footer.tsx      # Site footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Categories.tsx  # Category grid
│   │   ├── ProductShowcase.tsx  # Product grid with filters
│   │   ├── TrustIndicators.tsx  # Trust badges
│   │   └── Newsletter.tsx  # Newsletter signup
│   ├── products/
│   │   ├── ProductCard.tsx      # Product card component
│   │   └── ProductQuickView.tsx # Quick view modal
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       ├── Badge.tsx       # Badge component
│       └── StarRating.tsx  # Star rating component
├── data/
│   └── products.ts         # Mock product data
├── types/
│   └── index.ts           # TypeScript type definitions
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Navigate to the project directory**:

```bash
cd forest-queen-ecommerce
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Colors

The color scheme is defined in `app/globals.css`. Modify the CSS variables to change the theme:

```css
:root {
  --forest-green: #047857;
  --forest-green-dark: #065f46;
  --earth-brown: #78350f;
  --sky-blue: #0284c7;
}
```

### Products

Edit the mock product data in `data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'Your Product Name',
    description: 'Product description',
    price: 299.99,
    rating: 4.8,
    // ... more fields
  },
];
```

### Categories

Modify categories in `data/products.ts`:

```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: 'Category Name',
    slug: 'category-slug',
    image: 'https://...',
  },
];
```

## Component Usage

### Button Component

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

### Product Card

```tsx
import { ProductCard } from '@/components/products/ProductCard';

<ProductCard
  product={productData}
  onQuickView={(product) => handleQuickView(product)}
/>
```

### Badge Component

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="sale">Sale</Badge>
```

Variants: `sale`, `new`, `premium`, `bestseller`

## Features Breakdown

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Hamburger menu for mobile devices
- Adaptive grid layouts

### Performance Optimizations
- Next.js Image component for optimized images
- Lazy loading states for images
- Efficient re-rendering with React hooks
- CSS-based animations (no JavaScript animations)

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features to add:

- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] User authentication
- [ ] Product search with autocomplete
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Backend integration
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Admin dashboard

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is for demonstration purposes.

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS
