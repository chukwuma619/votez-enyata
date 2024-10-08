'use client';
import { Button } from '@/components/button';
import { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import VoterInstruction from './instruction';

export default function InstructionButton() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        outline
        className="!font-normal"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <DocumentTextIcon />
        Instructions
      </Button>
      <VoterInstruction isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
