'use client';

import { useState } from 'react';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleCheckout = async (plan: any) => {
    setIsLoading(true); // Set loading to true

try {
  // Simulate API call (replace with your actual API call)
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, checkoutUrl: 'https://checkout.com' }); // Replace with actual checkout URL
    }, 2000); // Simulate 2-second delay
  });


      const data = await response;

      if (data.success) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error(data.error);
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };

  const personalPlans = [
    { name: 'Free', price: 0, features: ['Basic features'] },
    { name: 'Plus', price: 10, features: ['More features', 'Priority support'] },
    { name: 'Pro', price: 20, features: ['All features', 'Dedicated support'] },
  ];

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded ${
            activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-4 py-2 rounded ${
            activeTab === 'business' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Business
        </button>
      </div>

      {activeTab === 'personal' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalPlans.map((plan) => (
            <div key={plan.name} className="p-4 text-center border border-gray-600 rounded">
              <div className="space-y-2"> {/* Mimic CardContent spacing */}
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-gray-400">{plan.features.join(', ')}</p>
                <p className="text-lg font-bold">${plan.price}</p>
                <button
                  onClick={() => handleCheckout(plan)}
                  className={`px-4 py-2 rounded bg-blue-500 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? 'Loading...' : `Get ${plan.name}`} {/* Show loading text */}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center border border-gray-600 rounded">
          <div className="space-y-2"> {/* Mimic CardContent spacing */}
            <h2 className="text-xl font-semibold">Business Plan</h2>
            <p className="text-gray-400">Exclusive benefits for businesses.</p>
            <button
              onClick={() => handleCheckout({ name: 'Business' })}
              className={`px-4 py-2 rounded bg-blue-500 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Get Business'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}