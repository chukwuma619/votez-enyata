import axios from 'axios';

export async function initializePayment({
  email,
  amount,
}: {
  email: string;
  amount: string;
}) {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email: email, amount: amount, callback_url: 'https://example.com/' },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function verifyPayment({ reference }: { reference: string }) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function getCurrentRate() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/NGN/1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
