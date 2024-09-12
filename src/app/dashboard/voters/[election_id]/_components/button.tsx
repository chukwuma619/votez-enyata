'use client';
import { Button } from '@/components/button';
import { useState } from 'react';
import CreateVoterForm from './create-form';

export default function AddVoter({ election_id }: { election_id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Voter
      </Button>
      <CreateVoterForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        election_id={election_id}
      />
    </>
  );
}
