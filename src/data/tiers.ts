export const tiers = [
    {
      name: 'Free',
      id: 'tier-free',
      href: '#',
      price: 0,
      description:
        'Get started with basic election features, perfect for small and simple elections. Limited to one use per user.',
      features: ['Up to 20 voters', 'Real-time Results', 'Basic Support'],
      mostPopular: false,
    },
    {
      name: 'Basic',
      id: 'tier-basic',
      href: '#',
      price: 29,
      description: 'Perfect for small organizations hosting simple elections.',
      features: ['Up to 400 voters', 'Real-time Results', 'Basic Support'],
      mostPopular: true,
    },
    {
      name: 'Pro',
      id: 'tier-pro',
      href: '#',
      price: 99,
      description:
        'Ideal for medium-sized organizations with more complex needs.',
      features: [
        'Up to 1,000 voters',
        'Real-time Results',
        'Priority Support',
        'Advanced Analytics',
      ],
      mostPopular: false,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      price: 'Contact us',
      description: 'For large organizations with custom requirements.',
      features: [
        'Unlimited voters',
        'Real-time Results',
        'Dedicated Support',
        'Custom Features',
      ],
      mostPopular: false,
    },
  ];