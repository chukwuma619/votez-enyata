'use client';
import { Button } from '@/components/button';
import { Heading, Subheading } from '@/components/heading';
import { Divider } from '@/components/divider';
import { Text } from '@/components/text';
import { useState } from 'react';
import CreateElectionForm from '@/app/dashboard/elections/_components/create-form';
import { Tables } from '@/types/database.types';
import ElectionCard from './election-card';

export default function ElectionClient({
  elections,
}: {
  elections: Tables<'elections'>[];
  hasUseFreePlan: boolean;
  userEmail: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Elections</Heading>
        <Button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create Election
        </Button>
      </div>
      <div className="mt-10 h-full">
        <Divider />

        {elections.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {elections.map((election, index) => (
              <ElectionCard
                key={index}
                election={election}
              />
            ))}
          </div>
        ) : (
          <div className="mt-36 flex size-full items-center justify-center">
            <div className="text-center">
              <Subheading level={2} className="mt-2">
                No elections
              </Subheading>

              <Text className="mt-1">
                Get started by creating a new election.
              </Text>
            </div>
          </div>
        )}
      </div>

      <CreateElectionForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
