'use client';
import { Button } from '@/components/button';
import { Heading, Subheading } from '@/components/heading';
import { Divider } from '@/components/divider';
import { Text } from '@/components/text';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown';
import Link from 'next/link';

import { useState } from 'react';

import CreatePositionForm from '@/app/dashboard/elections/[election_id]/_components/create-form';

import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { PositionType } from '@/data/placeholder';
import { usePathname } from 'next/navigation';
import { Tables } from '@/types/database.types';
import UpdatePositionForm from './edit-form';
import { deletePosition } from '@/actions/position';

export default function PositionsClient({
  positions,
  election_id,
}: {
  positions: Tables<'positions'>[];
  election_id: string;
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [openEditModel, setOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Tables<'positions'>>();
  const pathname = usePathname();

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/elections"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Elections
        </Link>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <Heading>Positions</Heading>
        <Button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Position
        </Button>
      </div>
      <div className="mt-10">
        <Divider />

        {positions.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((position, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-950/10 dark:border-white/10"
              >
                <div className="p-4">
                  <Link href={pathname + `/${position.id}`}>
                    <Subheading className="sm:!text-base/7">
                      {position.name}
                    </Subheading>
                  </Link>
                </div>
                <div className="flex items-center gap-4 px-4 py-3">
                  <Button
                    onClick={() => {
                      setSelectedData(position);
                      setOpenEditModal(true);
                    }}
                    outline
                    type="button"
                  >
                    Edit
                  </Button>

                  <Dropdown>
                    <DropdownButton outline>
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem href={pathname + `/${position.id}`}>
                        View Position
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          deletePosition(position.id, position.election_id);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-36 flex size-full items-center justify-center">
            <div className="text-center">
              <Subheading level={2} className="mt-2">
                No Positions
              </Subheading>

              <Text className="mt-1">
                Get started by creating a new position.
              </Text>
            </div>
          </div>
        )}
      </div>

      <CreatePositionForm
        election_id={election_id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {selectedData && (
        <UpdatePositionForm
          isOpen={openEditModel}
          setIsOpen={setOpenEditModal}
          data={selectedData}
        />
      )}
    </>
  );
}
