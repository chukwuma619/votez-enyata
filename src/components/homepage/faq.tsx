import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '../description-list';
import { Subheading } from '../heading';
import { Text, TextLink } from '../text';

const faqs = [
  {
    id: 1,
    question: 'What is Votez?',
    answer:
      'Votez is a comprehensive election management platform that allows election creators to easily create, manage, and host secure and efficient elections.',
  },
  {
    id: 2,
    question: 'How do I create an election on Votez?',
    answer:
      'You can create an election by signing up on Votez, navigating to the dashboard, and following the step-by-step process to set up your election, add positions, and assign candidates.',
  },
  {
    id: 3,
    question: 'Is my election data secure?',
    answer:
      'Yes, Votez prioritizes security. We implement industry-standard security measures to ensure that all election data is safe and secure.',
  },
  {
    id: 4,
    question: 'Can I see real-time results during the election?',
    answer:
      'Yes, our platform provides real-time updates as votes are tallied, so both election creators and voters can stay informed throughout the process.',
  },
  {
    id: 5,
    question: 'What happens if I need help during the election process?',
    answer:
      'Votez offers support to help you with any issues that arise. You can contact our support team via email or through the support section on our website.',
  },
  {
    id: 6,
    question: 'How many voters can I add in the Free plan?',
    answer:
      'The Free plan allows you to add up to 20 voters. For more voters, you can choose from our Basic, Standard, or Premium plans.',
  },
  {
    id: 7,
    question: 'Can I use Votez for multiple elections?',
    answer:
      'Each plan on Votez is for a single election instance. You will need to create a new instance for each election you want to manage.',
  },
  {
    id: 8,
    question: 'How are voters notified?',
    answer:
      'Voters receive a unique access code via email, which they can use to securely vote in the election.',
  },
  {
    id: 9,
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit and debit cards for payment. All transactions are processed securely.',
  },
  {
    id: 10,
    question: 'Can I get a refund if something goes wrong?',
    answer:
      'Please refer to our refund policy on the Votez website for detailed information regarding refunds and cancellations.',
  },
];

export default function FAQ() {
  return (
    <div id='faq' className="border-t border-zinc-950/10 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <Subheading
          level={2}
          className="!text-2xl !font-bold !leading-10 !tracking-tight"
        >
          Frequently asked questions
        </Subheading>
        <Text className="mt-6 max-w-2xl !text-base !leading-7">
          Have a different question and can&apos;t find the answer you&apos;re
          looking for? Reach out to our support team by{' '}
          <TextLink href="#">sending us an email</TextLink> and we&apos;ll get
          back to you as soon as we can.
        </Text>
        <div className="mt-20">
          <DescriptionList className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <DescriptionTerm className="!text-base !font-semibold !leading-7 !text-gray-950 dark:!text-white">
                  {faq.question}
                </DescriptionTerm>
                <DescriptionDetails className="mt-2 !text-base !leading-7 !text-zinc-500 dark:text-zinc-400">
                  {faq.answer}
                </DescriptionDetails>
              </div>
            ))}
          </DescriptionList>
        </div>
      </div>
    </div>
  );
}
