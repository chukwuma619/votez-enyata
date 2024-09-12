'use client';

import { Avatar } from '@/components/avatar';
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar';
import { Subheading } from '@/components/heading';
import { Strong, Text } from '@/components/text';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import DashboardSkeleton from '@/components/skeletons';
import { Tables } from '@/types/database.types';
import { createClient } from '@/lib/supabase/client';
export default function ResultClient({
  election_id,
  positions,
  candid,
}: {
  election_id: string;
  positions: Omit<Tables<'positions'>, 'election_id' | 'created_at'>[];
  candid: { [key: string]: (Tables<'candidates'> & { voteCount: number })[] };
}) {
  const [selectedPosition, setSelectedPosition] = useState(positions[0].id);
  const [candidate, setCandidate] = useState(candid);
  const [candidateFromSelectedPosition, setCandidateFromSelectedPosition] =
    useState(candidate[selectedPosition]);

  useEffect(() => {
    setCandidateFromSelectedPosition(candidate[selectedPosition]);
  }, [selectedPosition, candidate]);

  useEffect(() => {
    const supabse = createClient();
    const channels = supabse
      .channel('realtime votes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'votes',
          filter: `election_id=eq.${election_id}`,
        },
        (payload) => {
          console.log('Change received!', payload);
          const vote = payload.new as Tables<'votes'>;
          setCandidate((prevCandidates) => {
            console.log('begin');
            const updatedCandidates = { ...prevCandidates };

            const positionCandidates = updatedCandidates[vote.position_id];
            const candidateIndex = positionCandidates.findIndex(
              (cand) => cand.id === vote.candidate_id,
            );

            if (candidateIndex !== -1) {
              positionCandidates[candidateIndex] = {
                ...positionCandidates[candidateIndex],
                voteCount: positionCandidates[candidateIndex].voteCount + 1,
              };
            }

            console.log('end');
            return {
              ...updatedCandidates,
              [vote.position_id]: positionCandidates,
            };
          });
        },
      )
      .subscribe();

    return () => {
      supabse.removeChannel(channels);
    };
  }, [election_id]);

  return (
    <>
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

      <div className="pb-6">
        <div className="grid grid-cols-1 gap-8 divide-y sm:gap-4">
          <Suspense fallback={<DashboardSkeleton />}>
            {candidateFromSelectedPosition
              .sort((a, b) => b.voteCount - a.voteCount)
              .map((person, index) => (
                <div
                  key={index}
                  className="grid rounded-md [grid-template-columns:50px_auto_minmax(auto,100px)]"
                >
                  <Text className="m-auto">{index + 1}</Text>
                  <div className="flex items-center gap-6 py-6">
                    <Avatar
                      className="size-20"
                      
                      square
                      alt=""
                      src={person.photo_url}
                    />

                    <div>
                      <Subheading className="!text-lg/7">
                        {person.name}
                      </Subheading>
                      <Text className="line-clamp-2">{person.bio}</Text>
                    </div>
                  </div>
                  <Text className="m-auto">
                    <Strong>{person.voteCount} </Strong>
                  </Text>
                </div>
              ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}
