import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { Lock, BadgeCheck, Truck } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const getOrderNumber = () => {
  // Generate a mock order number
  return `MD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const getExpectedDelivery = (delivery: string) => {
  const today = new Date();
  let days = delivery === 'express' ? 2 : 5;
  today.setDate(today.getDate() + days);
  return today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const OrderConfirmation: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  React.useEffect(() => {
    clearCart();
  }, []);
  const { payment, total, shipping, delivery, cart } = router.query;
  let shippingObj = shipping ? JSON.parse(shipping as string) : null;
  let cartArr = cart ? JSON.parse(cart as string) : [];
  let subtotal = cartArr.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  let marketplaceFee = subtotal * 0.05;
  let buyerProtection = 1.99;
  let shippingCost = delivery === 'express' ? 15 : 5;
  let grandTotal = subtotal + marketplaceFee + buyerProtection + shippingCost;
  const orderNumber = getOrderNumber();
  const expectedDelivery = getExpectedDelivery(delivery as string);

  return (
    <div className="min-h-screen bg-dark-2 text-white font-gordita flex flex-col">
      <main className="container mx-auto py-10 px-4 flex-1">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-dark-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">ORDER CONFIRMED</h1>
          <p className="text-lg text-gray-300 mb-2">Thank you for your purchase. We'll send you shipping confirmation<br/>and tracking number via email shortly.</p>
          <p className="text-sm text-gray-400 mb-6">Didn't get the email? Check your spam folder or <a href="#" className="underline text-primary">resend it</a></p>
        </div>
        <div className="bg-gray-800 rounded-lg max-w-3xl mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-gray-400">Order Number</div>
              <div className="font-bold text-lg">{orderNumber}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Expected Delivery</div>
              <div className="font-bold text-lg">{expectedDelivery}</div>
              <div className="text-primary text-xs font-semibold">{delivery === 'express' ? 'Express Delivery (1-2 business days)' : 'Standard Delivery (3-5 business days)'}</div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-primary text-lg font-bold mb-2">Order Summary</h2>
            <div className="divide-y divide-gray-700">
              {cartArr.map((item: any) => (
                <div key={item.id + '-' + item.size} className="flex items-center py-4">
                  <div className="w-14 h-14 bg-gray-700 rounded flex items-center justify-center mr-4 overflow-hidden">
                    <img src={item.imageUrl || '/images/placeholder.png'} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.name} <span className="text-xs text-gray-400">(#{item.id})</span></div>
                    <div className="text-xs text-gray-400">Size: {item.size}</div>
                  </div>
                  <div className="text-right font-bold">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-primary text-lg font-bold mb-2">Price Details</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Marketplace Fee (5%)</span><span>${marketplaceFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Buyer Protection</span><span>${buyerProtection.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8 mb-4">
            <button className="bg-primary text-dark-2 px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors">TRACK ORDER</button>
            <button className="bg-gray-700 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-600 transition-colors" onClick={() => router.push('/shop')}>BACK TO SHOP</button>
          </div>
          <div className="flex justify-center gap-8 mt-6 text-xs text-gray-400">
            <div className="flex items-center gap-1"><Lock className="w-4 h-4" /> Secure Payment</div>
            <div className="flex items-center gap-1"><BadgeCheck className="w-4 h-4" /> Authentic Products</div>
            <div className="flex items-center gap-1"><Truck className="w-4 h-4" /> Fast Delivery</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation; 