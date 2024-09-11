'use client';
import { Button } from '@/components/button';
import { Subheading } from '@/components/heading';
import { Text } from '@/components/text';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/components/description-list';

import {useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { convertDateTime } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tables } from '@/types/database.types';
import UpdateElectionForm from './edit-form';
import { deleteElection} from '@/actions/election';

export default function ElectionCard({
  election,
}: {
  election: Tables<'elections'>;
}) {
  const [openEditModel, setOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Tables<'elections'>>();
  const pathname = usePathname();
 
  return (
    <>
      <div className="rounded-xl border border-zinc-950/10 dark:border-white/10">
        <div className="p-4">
          <Link href={pathname + `/${election.id}`}>
            <Subheading className="sm:!text-base/7">{election.name}</Subheading>
          </Link>

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
        <div className="flex items-center gap-4 px-4 py-3">
          <Button href={pathname + `/${election.id}`} outline type="button">
            View Positions
          </Button>

          <Dropdown>
            <DropdownButton outline>
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu>
              {election.status !== 'completed' && (
                <DropdownItem
                  onClick={() => {
                    setSelectedData(election);
                    setOpenEditModal(true);
                  }}
                >
                  Edit
                </DropdownItem>
              )}
              <DropdownItem
                onClick={() => {
                  deleteElection(election.id);
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {selectedData && (
        <UpdateElectionForm
          isOpen={openEditModel}
          setIsOpen={setOpenEditModal}
          data={selectedData}
        />
      )}
    </>
  );
}
