import { PricingSection  } from "@/components/pricing-section"

export default function Page() {
  const tiers = [
    {
      name: "Starter",
      price: { monthly: 15, yearly: 144 },
      description: "Essential tools for growing your business.",
      features: [
        { name: "5 Projects", description: "Up to 5 active projects", included: true },
        { name: "Basic Analytics", description: "See how you're doing", included: true },
        { name: "48-hour Support", description: "Get help when you need it", included: true },
      ],
      highlight: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: "Pro",
      price: { monthly: 49, yearly: 470 },
      description: "Advanced features for scaling teams.",
      features: [
        { name: "Unlimited Projects", description: "No limits on your potential", included: true },
        { name: "Advanced Analytics", description: "Deep insights and reporting", included: true },
        { name: "24/7 Priority Support", description: "We're here for you anytime", included: true },
      ],
      highlight: true,
      badge: "Best Value",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <PricingSection tiers={tiers} />
      </div>
    </div>
  );
}
