import { Subheading } from '@/components/heading';
import { Text } from '@/components/text';
import { Container } from '@/components/container';
import BentoCard from '@/components/bento-card';

const features = [
  {
    name: 'Create Elections',
    description:
      'Easily set up and configure elections with a user-friendly interface, allowing you to tailor every detail to your specific needs.',
    graphic: (
      <>
        <div className='absolute inset-0 aspect-[2/1] h-full bg-[url("/images/bento/create-election.png")] bg-[size:175%] bg-[top_right_48px] bg-no-repeat dark:bg-[url("/images/bento/create-election-dark.png")]'></div>
      </>
    ),
    fadeImage: false,
  },
  {
    name: 'Unique Access Codes',
    description:
      'Send unique access codes to eligible voters with just one click, ensuring secure and restricted access to the voting process.',
    graphic: (
      <>
        <div className='absolute inset-0 aspect-[2/1] h-80 w-full bg-[url("/images/bento/send-email.png")] bg-[size:202%] bg-[top_right_-141px] bg-no-repeat dark:bg-[url("/images/bento/send-email-dark.png")]'></div>
      </>
    ),
    fadeImage: false,
  },

  {
    name: 'Secure Voting',
    description:
      'Provide a secure and confidential voting experience for all participants, safeguarding the integrity of your elections.',
    graphic: (
      <>
        <div className='absolute inset-0 aspect-square h-full w-full bg-[url("/images/bento/voting.png")] bg-[size:202%] bg-[top_right_-200px] bg-no-repeat dark:bg-[url("/images/bento/voting-dark.png")]'></div>
      </>
    ),
    fadeImage: true,
  },

  {
    name: 'Eligibility Check',
    description:
      'Ensure that only eligible voters can participate in the election, maintaining the fairness and accuracy of your results.',
    graphic: (
      <>
        <div className='absolute inset-0 aspect-square h-80 w-full bg-[url("/images/bento/verify-access.png")] bg-[size:202%] bg-[top_right_-200px] bg-no-repeat dark:bg-[url("/images/bento/verify-access-dark.png")]'></div>
      </>
    ),
    fadeImage: false,
  },
  {
    name: 'Real-time Results',
    description:
      'Access live updates and real-time results as votes are tallied, keeping everyone informed and engaged throughout the process.',
    graphic: (
      <>
        <div className='absolute inset-0 aspect-square h-80 w-full bg-[url("/images/bento/realtime-results.png")] bg-[size:202%] bg-[top_right_-200px] bg-no-repeat dark:bg-[url("/images/bento/realtime-results-dark.png")]'></div>
      </>
    ),
    fadeImage: false,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      aria-label="What our customers are saying"
      className="border-y border-zinc-950/10 bg-white py-20 sm:py-32 dark:border-white/10 dark:bg-zinc-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Subheading
            level={2}
            className="text-center !text-3xl !font-bold !tracking-tight sm:!text-4xl md:text-left"
          >
            Simplify Your Election Management
          </Subheading>
          <Text className="mt-6 text-center !text-lg !leading-8 md:text-left">
            Because you&apos;d probably be a little confused if we suggested you
            complicate your election management process instead.
          </Text>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {features.map((feature, index) => (
            <BentoCard
              key={index}
              title={feature.name}
              description={feature.description}
              graphic={feature.graphic}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
