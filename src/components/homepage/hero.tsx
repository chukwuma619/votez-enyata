import { Heading } from '@/components/heading';
import { Strong, Text } from '@/components/text';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/components/description-list';

const stats = [
  { id: 1, name: 'Elections Hosted', value: '10,000+' },
  { id: 2, name: 'Votes Cast', value: '500,000+' },
  { id: 3, name: 'Satisfied Creators', value: '1,000+' },
  { id: 4, name: 'Uptime', value: '99.99%' },
];

export default function Hero() {
  return (
    <div className="relative isolate pt-24">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-zinc-950/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white/10 dark:[mask-image:radial-gradient(100%_100%_at_top_right,#09090b,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y={-1}
          className="overflow-visible fill-zinc-950/[2.5%] dark:fill-white/[2.5%]"
        >
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      ></div>

      <Container className="pb-16 pt-20 text-center lg:pt-32">
        <Heading className="mx-auto max-w-5xl font-display !text-4xl !font-medium !tracking-tight sm:!text-7xl">
          Seamless Election Organization Made Simple.
        </Heading>
        <Text className="mx-auto mt-6 max-w-2xl !text-lg tracking-tight">
          Transforming the way you create, manage, and execute elections with
          ease and security.
        </Text>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/auth/sign-up">Get started</Button>
          <Button outline href="/#faq">
            Learn more <span aria-hidden="true">→</span>
          </Button>
        </div>
        <div className="mt-36 lg:mt-44">
          <Text className="font-display !text-base">
            <Strong>Trusted by Thousands</Strong>
          </Text>
          <DescriptionList className="mt-8 grid grid-cols-2 gap-8 sm:mt-20 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-y-3 border-l border-zinc-950/10 pl-6 lg:first:border-l-0 dark:border-white/10"
              >
                <DescriptionTerm className="text-sm leading-6">
                  {stat.name}
                </DescriptionTerm>
                <DescriptionDetails className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </DescriptionDetails>
              </div>
            ))}
          </DescriptionList>
        </div>
      </Container>
    </div>
  );
}
