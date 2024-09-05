import { Heading } from './heading';
import { Text } from './text';
import { Button } from './button';
export default function ErrorState({
  title,
  description,
  showButton = true,
}: {
  title: string;
  description: string;
  showButton?: boolean;
}) {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Heading className="!text-3xl !font-bold !tracking-tight sm:!text-5xl">
          {title}
        </Heading>
        <Text className="mt-6 text-base leading-7">{description}</Text>
        {showButton && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              href="/"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
