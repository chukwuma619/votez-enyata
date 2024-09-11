'use client';
import { Subheading } from '@/components/heading';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/components/description-list';
import { Link } from '@/components/link';
import { convertDateTime } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Tables } from '@/types/database.types';
import { Text } from '@/components/text';
export default function VotersClient({
  elections,
}: {
  elections: Tables<'elections'>[];
}) {
  const pathname = usePathname();

  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {elections.map((election, index) => (
        <Link key={index} href={pathname + `/${election.id}`}>
          <div className="rounded-xl border border-zinc-950/10 hover:bg-zinc-950/[2.5%] dark:border-white/10 dark:hover:bg-white/[2.5%]">
            <div className="p-4">
              <Subheading className="sm:!text-base/7">
                {election.name}
              </Subheading>
              <Text className="mt-2 line-clamp-2">{election.description}</Text>
              <DescriptionList className={'!text-xs'}>
                <DescriptionTerm>Start Datetime</DescriptionTerm>
                <DescriptionDetails>
                  {convertDateTime(election.start_datetime)}
                </DescriptionDetails>

                <DescriptionTerm>End Datetime</DescriptionTerm>
                <DescriptionDetails>
                  {convertDateTime(election.end_datetime)}
                </DescriptionDetails>
              </DescriptionList>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
