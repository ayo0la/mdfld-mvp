import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  size: number | string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size: number | string) => void;
  clearCart: () => void;
  incrementQuantity: (id: number, size: number | string) => void;
  decrementQuantity: (id: number, size: number | string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[] | null>(null);

  // Only read from localStorage on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      setCart(stored ? JSON.parse(stored) : []);
    }
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      if (!prev) return [{ ...item, quantity: 1 }];
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: number | string) => {
    setCart(prev => prev ? prev.filter(i => !(i.id === id && i.size === size)) : []);
  };

  const clearCart = () => setCart([]);

  const incrementQuantity = (id: number, size: number | string) => {
    setCart(prev => prev ? prev.map(i =>
      i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
    ) : []);
  };

  const decrementQuantity = (id: number, size: number | string) => {
    setCart(prev => prev ? prev.map(i =>
      i.id === id && i.size === size && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
    ).filter(i => i.quantity > 0) : []);
  };

  // Don't render children until cart is initialized
  if (cart === null) return null;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}; 