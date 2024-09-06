'use client';
import { Button, FormButton } from '@/components/button';
import crypto from 'crypto';
import { Avatar } from '@/components/avatar';
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar';
import { FieldGroup, Fieldset, Label } from '@/components/fieldset';
import { Subheading } from '@/components/heading';
import { Text } from '@/components/text';
import { useEffect, useState } from 'react';
import { Radio, RadioField, RadioGroup } from '@/components/radio';
import { Tables } from '@/types/database.types';
import { castVote } from '@/actions/vote';
import { useFormState, useFormStatus } from 'react-dom';
import { Notification } from '@/components/notification';

export default function VotingForm({
  voter_id,
  positions,
  election_id,
  candid,
  votes_status,
}: {
  voter_id: string;
  positions: Omit<Tables<'positions'>, 'election_id' | 'created_at'>[];
  election_id: string;
  candid: {
    [key: string]: Tables<'candidates'>[];
  };
  votes_status: {
    [key: string]: {
      status: boolean;
      candidate_id?: string;
    };
  };
}) {
  const [selectedPosition, setSelectedPosition] = useState(positions[0].id);
  const [candidate, setCandidate] = useState(candid);
  const [candidateFromSelectedPosition, setCandidateFromSelectedPosition] =
    useState(candidate[selectedPosition]);

  const [voteStatusForAllPositions, setVoteStatusForAllPositions] =
    useState(votes_status);

  const [voteStatusOfSelectedPosition, setVoteStatusOfSelectedPosition] =
    useState(votes_status[selectedPosition].status);

  const [
    voteCandidateIdOfSelectedPosition,
    setVoteCandidateIdOfSelectedPosition,
  ] = useState(votes_status[selectedPosition].candidate_id || '');

  useEffect(() => {
    setCandidateFromSelectedPosition(candidate[selectedPosition]);
  }, [selectedPosition, candidate]);

  useEffect(() => {
    setVoteStatusOfSelectedPosition(
      voteStatusForAllPositions[selectedPosition].status,
    );
    setVoteCandidateIdOfSelectedPosition(
      voteStatusForAllPositions[selectedPosition].candidate_id || '',
    );
  }, [selectedPosition, voteStatusForAllPositions]);

  const [errorMessage, dispatch] = useFormState(
    castVote.bind(null, voter_id, selectedPosition, election_id),
    undefined,
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }

    if (errorMessage && errorMessage.change_status) {
      const { pos, data } = errorMessage.change_status;
      setVoteStatusForAllPositions((prevStatus) => ({
        ...prevStatus,
        [pos]: data,
      }));
    }
  }, [errorMessage]);

  function generateShortSecureAccessCode(length = 8) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
    return hashedCode.substring(0, length); // Truncate to desired length
  }

  console.log(generateShortSecureAccessCode());

  return (
    <>
      {errorMessage && errorMessage.message && (
        <Notification
          message={errorMessage.message}
          status="error"
          show={showError}
          setShow={setShowError}
        />
      )}
      <div className="mt-4 border-y">
        <Navbar className="justify-center">
          <NavbarSection className="h-16 snap-x overflow-x-auto">
            {positions.map((position, index) => (
              <NavbarItem
                key={index}
                className="snap-center text-nowrap"
                onClick={() => {
                  setSelectedPosition(position.id);
                }}
                current={position.id === selectedPosition}
              >
                {position.name}
              </NavbarItem>
            ))}
          </NavbarSection>
        </Navbar>
      </div>

      <form action={dispatch} className="md:px-4">
        <Fieldset aria-label="selecting candidate" className="pb-6">
          {/* <RadioGroup
            name="candidate_id"
            value={
              voteStatusOfSelectedPosition
                ? voteCandidateIdOfSelectedPosition
                : ''
            }
            className="grid grid-cols-1 gap-8 divide-y sm:gap-4"
            onChange={(e) => setVoteCandidateIdOfSelectedPosition(e)}
          >
            {candidateFromSelectedPosition.map((person, index) => (
              <RadioField
                key={index}
                disabled={
                  voteStatusOfSelectedPosition &&
                  person.id !== voteCandidateIdOfSelectedPosition
                }
                className="rounded-md px-4 hover:bg-zinc-950/[2.5%] has-[[data-slot='control'][aria-checked='true']]:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%] has-[[data-slot='control'][aria-checked='true']]:dark:bg-white/[2.5%]"
              >
                <Label>
                  <div className="flex items-center gap-6 py-6">
                    <Avatar
                      className="size-20"
                      width={80}
                      height={80}
                      square
                      alt=""
                      src={person.photo_url}
                    />

                    <div>
                      <Subheading className="!text-lg/7">
                        {person.name}
                      </Subheading>
                      {person.bio && (
                        <Text className="line-clamp-2">{person.bio}</Text>
                      )}
                    </div>
                  </div>
                </Label>
                <Radio value={`${person.id}`} />
              </RadioField>
            ))}
          </RadioGroup> */}
          <RadioGroup
            name="candidate_id"
            value={voteCandidateIdOfSelectedPosition}
            className="grid grid-cols-1 gap-8 divide-y sm:gap-4"
            onChange={(e) => setVoteCandidateIdOfSelectedPosition(e)}
          >
            {candidateFromSelectedPosition.map((person, index) => (
              <RadioField
                key={index}
                disabled={
                  voteStatusOfSelectedPosition &&
                  person.id !== voteCandidateIdOfSelectedPosition
                }
                className="rounded-md px-4 hover:bg-zinc-950/[2.5%] has-[[data-slot='control'][aria-checked='true']]:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%] has-[[data-slot='control'][aria-checked='true']]:dark:bg-white/[2.5%]"
              >
                <Label>
                  <div className="flex items-center gap-6 py-6">
                    <Avatar
                      className="size-20"
                      width={80}
                      height={80}
                      square
                      alt=""
                      src={person.photo_url}
                    />

                    <div>
                      <Subheading className="!text-lg/7">
                        {person.name}
                      </Subheading>
                      {person.bio && (
                        <Text className="line-clamp-2">{person.bio}</Text>
                      )}
                    </div>
                  </div>
                </Label>
                <Radio value={`${person.id}`} />
              </RadioField>
            ))}
          </RadioGroup>
          <FieldGroup className="flex items-center justify-end">
            {voteStatusOfSelectedPosition ? (
              <Button
                disabled={voteStatusOfSelectedPosition}
                type="submit"
                className="w-full"
              >
                Submit Vote
              </Button>
            ) : (
              <FormButton className="w-full">Submit Vote</FormButton>
            )}
          </FieldGroup>
        </Fieldset>
      </form>
    </>
  );
}
