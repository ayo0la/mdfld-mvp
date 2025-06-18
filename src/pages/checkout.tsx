import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
// TODO: Replace with shadcn/ui Button when available. Using a basic button for now.
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={"bg-primary text-white px-4 py-2 rounded font-bold " + (props.className || "")}>{props.children}</button>
);
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

// Google Places API types
declare global {
  interface Window {
    google: any;
  }
}

// Minimal Address Autocomplete Component
const AddressAutocomplete: React.FC<{ 
  onAddressSelect: (place: any) => void; 
  value: string;
  onValueChange: (value: string) => void;
}> = ({ onAddressSelect, value, onValueChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max wait time
    
    // Wait for Google Maps API to load
    const initAutocomplete = () => {
      console.log('Checking Google Maps API availability...', retryCount);
      console.log('window.google:', !!window.google);
      console.log('window.google.maps:', !!window.google?.maps);
      console.log('window.google.maps.places:', !!window.google?.maps?.places);
      console.log('inputRef.current:', !!inputRef.current);
      
      if (!window.google || !window.google.maps || !window.google.maps.places || !inputRef.current) {
        retryCount++;
        if (retryCount < maxRetries) {
          console.log('Google Maps API not ready, retrying...', retryCount);
          setTimeout(initAutocomplete, 100);
        } else {
          console.error('Failed to initialize Google Maps API after', maxRetries, 'retries');
        }
        return;
      }
      
      try {
        // Create autocomplete instance with more permissive settings
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
          fields: ['address_components', 'formatted_address', 'geometry'],
        });
        
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          console.log('Place selected:', place);
          onAddressSelect(place);
        });

        setIsInitialized(true);
        console.log('Autocomplete initialized successfully');
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    };

    initAutocomplete();

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        try {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        } catch (error) {
          console.error('Error cleaning up autocomplete:', error);
        }
      }
    };
  }, [onAddressSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Address Line 1"
        className="bg-dark-2 border border-primary rounded px-3 py-2 w-full"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      {!isInitialized && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
          Loading...
        </div>
      )}
    </div>
  );
};

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
if (!stripePublicKey) {
  throw new Error("Stripe public key is not set. Please set NEXT_PUBLIC_STRIPE_PUBLIC_KEY in your .env.local file.");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Checkout: React.FC = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [delivery, setDelivery] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Handler for Google Places address selection
  const handleAddressSelect = (place: any) => {
    if (!place.address_components) return;
    const addressComponents = place.address_components;
    const newShipping = { ...shipping };
    let streetNumber = '';
    let route = '';
    addressComponents.forEach((component: any) => {
      const types = component.types;
      if (types.includes('street_number')) streetNumber = component.long_name;
      if (types.includes('route')) route = component.long_name;
      if (types.includes('subpremise')) newShipping.addressLine2 = component.long_name;
      if (types.includes('locality')) newShipping.city = component.long_name;
      if (types.includes('administrative_area_level_1')) newShipping.state = component.short_name;
      if (types.includes('postal_code')) newShipping.postalCode = component.long_name;
      if (types.includes('country')) newShipping.country = component.long_name;
    });
    newShipping.address = `${streetNumber} ${route}`.trim() || place.formatted_address || '';
    setShipping(newShipping);
  };

  // Mock shipping cost calculation
  const shippingCost = delivery === 'express' ? 15 : delivery === 'standard' ? 5 : 0;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.05;
  const buyerProtection = 1.99;
  const total = subtotal + serviceFee + buyerProtection + shippingCost;

  // Validation
  const shippingValid = Object.values(shipping).every(Boolean);
  const deliveryValid = !!delivery;
  const cardValid = payment === 'card';
  const paymentValid = payment === 'card' ? shippingValid && deliveryValid : payment === 'paypal' ? true : false;

  // Button label logic
  let buttonLabel = 'Proceed';
  if (step === 3) buttonLabel = 'Place Order';

  // Button enabled logic
  let buttonEnabled = false;
  if (step === 1) buttonEnabled = shippingValid;
  if (step === 2) buttonEnabled = deliveryValid;
  if (step === 3) buttonEnabled = paymentValid;

  // Stepper handler
  const handleProceed = () => {
    if (step === 1 && shippingValid) setStep(2);
    else if (step === 2 && deliveryValid) setStep(3);
    else if (step === 3 && paymentValid) {
      if (payment === 'paypal') {
        // In real implementation: window.location.href = paypalUrl;
        // For now, simulate success and redirect
        router.push({
          pathname: '/order-confirmation',
          query: {
            payment: 'paypal',
            total,
            shipping: JSON.stringify(shipping),
            delivery,
            cart: JSON.stringify(cart),
          },
        });
      }
    }
  };

  // Handle PayPal redirect
  const handlePayPalRedirect = () => {
    setPayment('paypal');
    // Mock PayPal redirect
    alert('Redirecting to PayPal to complete payment... (mock)');
    // In real implementation: window.location.href = paypalUrl;
  };

  const handleStripeCheckout = async () => {
    try {
      // REMINDER: Make sure your backend server is running on port 4000 for this to work.
      const response = await fetch('http://localhost:4000/api/payments/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shipping, delivery }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Could not start checkout session.');
      }
    } catch (err: any) {
      if (err.message && err.message.includes('Failed to fetch')) {
        alert('Could not connect to backend server. Please make sure it is running on port 4000.');
      } else {
        console.error('Stripe Checkout error:', err);
        alert('An error occurred while redirecting to payment. Please try again.');
      }
    }
  };

  // CardElement styling options
  const cardElementOptions = {
    style: {
      base: {
        color: '#fff',
        fontFamily: 'Gordita, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#cbd5e1',
        },
      },
      invalid: {
        color: '#ff6b6b',
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ensure Google Places autocomplete dropdown is visible */
            .pac-container {
              z-index: 9999 !important;
              background-color: #2d3748 !important;
              border: 1px solid #4a5568 !important;
              border-radius: 0.375rem !important;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            }
            
            .pac-item {
              color: #e2e8f0 !important;
              padding: 8px 12px !important;
              border-bottom: 1px solid #4a5568 !important;
              cursor: pointer !important;
            }
            
            .pac-item:hover {
              background-color: #4a5568 !important;
            }
            
            .pac-item-selected {
              background-color: #3182ce !important;
              color: white !important;
            }
            
            .pac-item-query {
              color: #e2e8f0 !important;
              font-weight: 500 !important;
            }
            
            .pac-matched {
              color: #3182ce !important;
              font-weight: bold !important;
            }
          `
        }} />
      </Head>
      <div className="min-h-screen bg-dark-2 text-white font-gordita">
        <main className="container mx-auto py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-left">CHECKOUT</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Summary & Stepper */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Cart Summary */}
              <div className="bg-gray-800 rounded-lg p-6 mb-2">
                <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
                {cart.length === 0 ? (
                  <div className="text-gray-400">Your cart is currently empty.</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id + '-' + item.size} className="flex items-center gap-4 mb-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded bg-gray-700 object-cover" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-400">Size: {item.size}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => decrementQuantity(item.id, item.size)}>-</button>
                          <span className="px-2">{item.quantity}</span>
                          <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => incrementQuantity(item.id, item.size)}>+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-xs text-gray-400">${item.price.toFixed(2)} each</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Step 1: Shipping Info */}
              {step >= 1 && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="First Name" className="bg-dark-2 border border-primary rounded px-3 py-2" value={shipping.firstName} onChange={e => setShipping(s => ({ ...s, firstName: e.target.value }))} />
                    <input type="text" placeholder="Last Name" className="bg-dark-2 border border-primary rounded px-3 py-2" value={shipping.lastName} onChange={e => setShipping(s => ({ ...s, lastName: e.target.value }))} />
                  </div>
                  {/* Address Autocomplete */}
                  <div className="relative mb-4">
                    <AddressAutocomplete 
                      onAddressSelect={handleAddressSelect} 
                      value={shipping.address} 
                      onValueChange={(value) => setShipping(s => ({ ...s, address: value }))} 
                    />
                  </div>
                  <input type="text" placeholder="Address Line 2 (Optional)" className="bg-dark-2 border border-primary rounded px-3 py-2 w-full mb-4" value={shipping.addressLine2} onChange={e => setShipping(s => ({ ...s, addressLine2: e.target.value }))} />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="City" className="bg-dark-2 border border-primary rounded px-3 py-2" value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
                    <input type="text" placeholder="State" className="bg-dark-2 border border-primary rounded px-3 py-2" value={shipping.state} onChange={e => setShipping(s => ({ ...s, state: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Postal Code" className="bg-dark-2 border border-primary rounded px-3 py-2" value={shipping.postalCode} onChange={e => setShipping(s => ({ ...s, postalCode: e.target.value }))} />
                    <select 
                      className="bg-dark-2 border border-primary rounded px-3 py-2" 
                      value={shipping.country} 
                      onChange={e => setShipping(s => ({ ...s, country: e.target.value }))}
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Australia">Australia</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>
              )}
              {/* Step 2: Delivery Method */}
              {step >= 2 && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Delivery Method</h2>
                  <div className="flex gap-4">
                    <button onClick={() => setDelivery('standard')} className={`flex-1 p-4 rounded-lg border ${delivery === 'standard' ? 'border-primary bg-dark-2' : 'border-gray-700 bg-gray-900'} font-bold`}>Standard Delivery<br /><span className="text-xs font-normal">3-5 business days (${step >= 2 ? '$5.00' : ''})</span></button>
                    <button onClick={() => setDelivery('express')} className={`flex-1 p-4 rounded-lg border ${delivery === 'express' ? 'border-primary bg-dark-2' : 'border-gray-700 bg-gray-900'} font-bold`}>Express Delivery<br /><span className="text-xs font-normal">1-2 business days (${step >= 2 ? '$15.00' : ''})</span></button>
                  </div>
                </div>
              )}
              {/* Step 3: Payment Method */}
              {step >= 3 && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setPayment('card')} className={`flex-1 p-2 rounded border ${payment === 'card' ? 'border-primary bg-dark-2' : 'border-gray-700 bg-gray-800'} font-bold`}>Credit/Debit Card</button>
                    <button onClick={handlePayPalRedirect} className={`flex-1 p-2 rounded border ${payment === 'paypal' ? 'border-primary bg-dark-2' : 'border-gray-700 bg-gray-800'} font-bold`}>PayPal</button>
                  </div>
                  {/* Card Input Fields */}
                  {payment === 'card' && (
                    <div className="bg-dark-2 rounded-lg p-4 border border-gray-700">
                      <h3 className="font-semibold mb-4">Card Information</h3>
                      <div className="space-y-4">
                        <CardElement options={cardElementOptions} />
                      </div>
                    </div>
                  )}
                  {/* PayPal Info */}
                  {payment === 'paypal' && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-blue-400">PayPal Selected</span>
                      </div>
                      <p className="text-sm text-gray-300">You will be redirected to PayPal to complete your payment securely.</p>
                    </div>
                  )}
                </div>
              )}
              {/* Stepper Button */}
              <div className="flex justify-end mt-6">
                {payment === 'card' ? (
                  <Button
                    className={`w-full py-3 rounded font-bold text-lg transition ${buttonEnabled ? 'bg-primary text-white hover:bg-accent' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    disabled={!buttonEnabled}
                    onClick={handleStripeCheckout}
                  >
                    {buttonLabel}
                  </Button>
                ) : (
                  <Button
                    className={`w-full py-3 rounded font-bold text-lg transition ${buttonEnabled ? 'bg-primary text-white hover:bg-accent' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    disabled={!buttonEnabled}
                    onClick={handleProceed}
                  >
                    {buttonLabel}
                  </Button>
                )}
              </div>
            </div>
            {/* Right: Payment Summary */}
            <div className="w-full lg:w-[350px] flex-shrink-0">
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
                <div className="flex justify-between text-sm mb-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm mb-2"><span>Marketplace Service Fee (5%)</span><span>${serviceFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm mb-2"><span>Buyer Protection Fee</span><span>${buyerProtection.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm mb-2"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-bold mt-4 mb-6"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <div className="text-xs text-gray-400 text-center mt-2">Secure checkout with SSL encryption</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WrappedCheckout = (props: any) => (
  <Elements stripe={stripePromise}>
    <Checkout {...props} />
  </Elements>
);

export default WrappedCheckout; 