import { UserCircle, CreditCard, CheckCircle, Sparkles } from 'lucide-react';

export default function Illustration({ currentStep }) {
  const illustrations = {
    1: {
      icon: UserCircle,
      title: 'Create Your Account',
      description: 'Set up your credentials to get started with our platform',
      color: 'from-blue-500 to-indigo-600'
    },
    2: {
      icon: Sparkles,
      title: 'Tell Us About You',
      description: 'Help us personalize your experience with some basic information',
      color: 'from-purple-500 to-pink-600'
    },
    3: {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Your payment information is encrypted and secure',
      color: 'from-indigo-500 to-purple-600'
    },
    4: {
      icon: CheckCircle,
      title: 'All Set!',
      description: 'You\'re ready to start your journey with us',
      color: 'from-green-500 to-emerald-600'
    }
  };

  const current = illustrations[currentStep];
  const Icon = current.icon;

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center shadow-2xl animate-pulse-slow`}
          >
            <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {current.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i <= currentStep
                  ? `bg-gradient-to-r ${current.color}`
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Features List */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Secure & encrypted</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Quick setup process</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>24/7 support available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
