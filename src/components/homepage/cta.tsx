import Link from 'next/link';
import { Container } from '../container';
import { Subheading } from '../heading';
import { Text } from '../text';
import { Button } from '../button';

export default function CTA() {
  return (
    <>
      <section className="border-t border-zinc-950/10 py-20 sm:py-32 dark:border-white/10">
        <Container className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 dark:bg-zinc-900">
            <Subheading
              level={2}
              className="mx-auto max-w-2xl !text-3xl !font-bold !tracking-tight sm:!text-4xl"
            >
              Ready to Start Your Election?
            </Subheading>
            <Text className="mx-auto mt-6 max-w-xl !text-lg !leading-8">
              Join countless organizations in transforming how elections are
              conducted. Experience the ease and security of Votez today.
            </Text>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href="#">Get started</Button>
              <Button href="#" outline>
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#78716c" />
                  <stop offset={1} stopColor="#71717a" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </Container>
      </section>
    </>
  );
}
