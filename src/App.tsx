import { useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { StoryAndReserveSection } from './components/StoryAndReserveSection';
import { CartItem, Dish, DishAddon } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addConfiguredDishToCart = (
    dish: Dish,
    portionLabel: string,
    portionExtra: number,
    selectedAddons: DishAddon[],
    quantity: number
  ) => {
    const addonKey = selectedAddons
      .map((a) => a.id)
      .sort()
      .join(',');
    const cartKey = `${dish.id}__${portionLabel}__${addonKey}`;
    const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = dish.price + portionExtra + addonsPrice;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex !== -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          dishId: dish.id,
          name: dish.name,
          image: dish.image,
          portionLabel,
          addons: selectedAddons,
          unitPrice,
          quantity,
        },
      ];
    });
  };

  const handleQuickAdd = (dish: Dish) => {
    const defaultPortion = dish.portions[0];
    addConfiguredDishToCart(
      dish,
      defaultPortion?.label ?? 'فردي',
      defaultPortion?.extraPrice ?? 0,
      [],
      1
    );
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#181715]">
      <Navbar cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onQuickAdd={handleQuickAdd}
        />
        <StoryAndReserveSection />
      </main>

      <Footer />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={addConfiguredDishToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
