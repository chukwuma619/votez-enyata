import { Text, Strong } from '@/components/text';
export default function BentoCard({
  className,
  title,
  description,
  graphic,
  fadeImage,
}: {
  className?: string;
  title: string;
  description: string;
  graphic: React.ReactNode;
  fadeImage: boolean;
}) {
  return (
    <>
      <div
        className={`relative flex flex-col overflow-hidden rounded-lg shadow-sm ring ring-zinc-950/5 dark:ring-white/5 [&:nth-child(-n+2)]:md:col-span-3 [&:nth-child(1)]:md:rounded-tl-[2rem] [&:nth-child(2)]:md:rounded-tr-[2rem] [&:nth-child(3)]:md:rounded-bl-[2rem] [&:nth-child(5)]:md:rounded-br-[2rem] [&:nth-child(n_+_3)]:md:col-span-2 ${className}`}
      >
        <div className="relative h-80 shrink-0">
          {graphic}

          {/* {fadeImage && (
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-50%"></div>
            )} */}
        </div>
        <div className="relative border-t border-zinc-950/5 p-6 dark:border-white/5">
          <Text className="!text-2xl/8 !font-medium !tracking-tight">
            <Strong>{title}</Strong>
          </Text>
          <Text className="mt-2">{description}</Text>
        </div>
      </div>
    </>
  );
}
