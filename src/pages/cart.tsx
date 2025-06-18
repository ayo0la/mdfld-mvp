import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="min-h-screen bg-dark-2 text-white font-gordita">
        <main className="container mx-auto py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-left">Shopping Cart</h1>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            {cart.length === 0 ? (
              <div className="text-gray-400">Your cart is currently empty.</div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id + '-' + item.size} className="flex items-center gap-4 mb-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded bg-gray-700 object-cover" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-400">Size: {item.size}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => decrementQuantity(item.id, item.size)}>-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => incrementQuantity(item.id, item.size)}>+</button>
                        <button className="ml-4 px-2 py-1 bg-red-600 rounded text-xs" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-gray-400">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-6">
                  <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={clearCart}>Clear Cart</button>
                  <div className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-end mt-6">
                  <Link href="/checkout" className="bg-primary text-dark-1 px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors">Proceed to Checkout</Link>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cart; 