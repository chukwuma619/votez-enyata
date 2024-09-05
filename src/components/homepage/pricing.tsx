import { CheckIcon } from '@heroicons/react/20/solid';
import { Container } from '../container';
import { clsx } from 'clsx';
import { Subheading } from '../heading';
import { Text } from '../text';
import { Button } from '../button';
import { tiers } from '@/data/tiers';
import { formatCurrency } from '@/lib/utils';

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Choose a plan that fits your needs."
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Subheading
            level={2}
            className="!text-4xl !font-bold !tracking-tight sm:!text-5xl"
          >
            Choose a plan that fits your needs.
          </Subheading>
          <Text className="mx-auto mt-6 max-w-2xl text-center !text-lg !leading-8">
            Our pricing is designed to accommodate elections of all sizes.
          </Text>
        </div>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              className={clsx(
                tier.mostPopular
                  ? 'ring-2 ring-zinc-950 dark:ring-white'
                  : 'ring-1 ring-zinc-950/5 dark:ring-white/5',
                'grid grid-cols-subgrid grid-rows-[auto_112px_auto_auto_minmax(0,_1fr)] rounded-3xl p-8 xl:p-10',
              )}
            >
              <div className="row-span-1 flex items-center justify-between gap-x-4">
                <Subheading
                  level={3}
                  id={tier.id}
                  className={clsx(
                    !tier.mostPopular
                      ? '!text-zinc-500 dark:!text-zinc-400'
                      : '',
                    '!text-lg !font-semibold !leading-8',
                  )}
                >
                  {tier.name}
                </Subheading>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-zinc-950/[2.5%] px-2.5 py-1 text-xs font-semibold leading-5 text-zinc-500 dark:bg-white/[2.5%] dark:text-zinc-400">
                    Most popular
                  </p>
                ) : null}
              </div>
              <Text className="row-span-1 mt-4 text-sm leading-6">
                {tier.description}
              </Text>
              <Text className="mt-6 flex items-baseline gap-x-1">
                <span className="!text-4xl !font-bold !tracking-tight !text-zinc-900 dark:!text-white">
                  {typeof tier.price === 'number'
                    ? formatCurrency(tier.price)
                    : tier.price}
                </span>

                {index !== 3 && (
                  <span className="text-sm font-semibold leading-6 text-zinc-500 dark:text-zinc-400">
                    /election
                  </span>
                )}
              </Text>

              {tier.mostPopular ? (
                <Button
                  href={tier.href}
                  className="mt-6"
                  aria-describedby={tier.id}
                >
                  Buy plan
                </Button>
              ) : (
                <Button
                  href={tier.href}
                  className="mt-6"
                  aria-describedby={tier.id}
                  outline
                >
                  Buy plan
                </Button>
              )}

              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-zinc-500 xl:mt-10 dark:text-zinc-400"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-zinc-950 dark:text-white"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
