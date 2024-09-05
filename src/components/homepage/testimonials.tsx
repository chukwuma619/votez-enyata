import Image from 'next/image';

import { Container } from '@/components/container';
import avatarImage1 from '@/../public/images/avatars/avatar-1.png';
import avatarImage2 from '@/../public/images/avatars/avatar-2.png';
import avatarImage3 from '@/../public/images/avatars/avatar-3.png';
import avatarImage4 from '@/../public/images/avatars/avatar-4.png';
import avatarImage5 from '@/../public/images/avatars/avatar-5.png';
import { Subheading } from '../heading';
import { Text } from '../text';

const testimonials = [
  [
    {
      content:
        'Votez made our annual company elections a breeze. The user interface is intuitive and the results are delivered in real-time. Highly recommend!',
      author: {
        name: 'John Doe',
        role: 'CEO at Doe Enterprises',
        image: avatarImage1,
      },
    },
    {
      content:
        'Managing our community board elections has never been easier. The platform ensures a secure and fair voting process for all members.',
      author: {
        name: 'Jane Smith',
        role: 'Director at Community Hub',
        image: avatarImage2,
      },
    },
  ],
  [
    {
      content:
        'The ability to track votes in real-time and the comprehensive reports post-election have been game-changers for our student government elections.',
      author: {
        name: 'Carlos Gomez',
        role: 'President of Student Council',
        image: avatarImage3,
      },
    },
    {
      content:
        'Votez provides an all-in-one solution for election management. From setting up the election to announcing the results, everything is seamless and efficient.',
      author: {
        name: 'Emily Johnson',
        role: 'Event Coordinator at Events Co.',
        image: avatarImage4,
      },
    },
  ],
  [
    {
      content:
        'The customer support team at Votez is exceptional. They helped us every step of the way, ensuring our election ran smoothly.',
      author: {
        name: 'Michael Lee',
        role: 'Manager at Tech Solutions',
        image: avatarImage5,
      },
    },
    {
      content:
        'We saw a significant increase in voter participation with Votez. The platform is user-friendly and secure, giving our voters confidence in the process.',
      author: {
        name: 'Sophia Davis',
        role: 'Coordinator at Nonprofit Org',
        image: avatarImage3,
      },
    },
  ],
];

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Subheading className="!text-4xl !font-bold !tracking-tight sm:!text-5xl">
            What Our Users Are Saying
          </Subheading>
          <Text className="mx-auto mt-6 max-w-2xl text-center !text-lg !leading-8">
            Hear from election creators who have transformed their election
            process with Votez.{' '}
          </Text>
        </div>

        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-zinc-900/10 dark:bg-zinc-900">
                      <QuoteIcon className="absolute left-6 top-6 fill-zinc-100 dark:fill-zinc-800" />
                      <blockquote className="relative">
                        <Text className="!text-lg !tracking-tight">
                          {testimonial.content}
                        </Text>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-zinc-950/5 pt-6 dark:border-white/5">
                        <div>
                          <div className="font-display text-base text-slate-900 dark:text-white">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt={`photo of ${testimonial.author.name}`}
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
