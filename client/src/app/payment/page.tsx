"use client";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  checkoutUrl: string;
}

function PricingCard({ title, price, features, checkoutUrl }: PricingCardProps) {
  const handleSubscribe = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <div className="pricing-card p-8 rounded-lg bg-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
      <h3 className="text-2xl font-semibold text-blue-400 mb-4">{title}</h3>
      <p className="text-4xl font-bold my-4 neon-price">{price}</p>
      <ul className="text-gray-300 space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-center space-x-2">
            <span className="text-green-400">✔</span> <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={handleSubscribe}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
      >
        Choose Plan
      </button>
    </div>
  );
}

const Pricing = () => {
  return (
    <section className="text-center py-16 bg-gray-800 min-h-screen">
      <h2 className="text-4xl font-semibold neon-text">Choose Your Plan</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl ">
        <PricingCard 
          title="Starter" 
          price="$9.99/month" 
          features={["Basic AI Content", "1 Social Account", "Standard Analytics"]}
          checkoutUrl="https://buy.stripe.com/test_6oE6sp9eH0y08co7ss" 
        />
        <PricingCard 
          title="Pro" 
          price="$29.99/month" 
          features={["Advanced AI", "Up to 5 Social Accounts", "AI-Powered Ads"]}
          checkoutUrl="https://buy.stripe.com/test_6oE6sp9eH0y08co7ss" 
        />
        <PricingCard 
          title="Enterprise" 
          price="Custom" 
          features={["Unlimited Access", "Full Automation", "Priority Support"]}
          checkoutUrl="https://buy.stripe.com/test_6oE6sp9eH0y08co7ss" 
        />
      </div>
    </section>
  );
};

export default Pricing;