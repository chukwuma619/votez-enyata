import { candidates, positions, votes, elections, voters } from './placeholder';

export async function getUserElections(user_id: string) {
  return elections;
}

export async function getElection(election_id: string) {
  return (await getUserElections('demo')).find(
    (election) => election.id === election_id,
  );
}

export async function isVoterPermitted(election_id: string, voter_id: string) {
  let foundVoter = voters.find(
    (voter) => voter.election_id === election_id && voter.id === voter_id,
  );
  if (foundVoter) return true;

  return false;
}

export async function getAllVoteStatusOfPositionsOFVoter(
  election_id: string,
  voter_id: string,
) {
  const voteStatus: {
    [key: string]: {
      status: boolean;
      candidate_id?: string;
    };
  } = {};
  let positions = await getPositionsOfElection(election_id);
  positions.forEach((position) => {
    const votePresent = votes.find(
      (vote) => vote.position_id === position.id && vote.voter_id === voter_id,
    );
    if (votePresent) {
      voteStatus[position.id] = {
        status: true,
        candidate_id: votePresent.candidate_id,
      };
    } else {
      voteStatus[position.id] = {
        status: false,
        candidate_id: votePresent,
      };
    }
  });
  return voteStatus;
}
export async function getTotalVotesForCandidate(
  election_id: string,
  position_id: string,
  candidate_id: string,
) {
  const filteredVote = votes.filter(
    (vote) =>
      vote.candidate_id === candidate_id &&
      vote.position_id === position_id &&
      vote.election_id === election_id,
  );
  return filteredVote.length;
}

export async function getPositionsOfElection(election_id: string) {
  return positions.filter((position) => position.election_id === election_id);
}

export async function getVotesOfElection(election_id: string) {
  return votes.filter((vote) => vote.election_id === election_id);
}
export async function getPositionOfElection(
  election_id: string,
  position_id: string,
) {
  return (await getPositionsOfElection(election_id)).find(
    (position) => position.id === position_id,
  );
}

export async function getCandidatesOfPosition(position_id: string) {
  return candidates.filter(
    (candidate) => candidate.position_id === position_id,
  );
}

export async function getCandidateOfPosition(
  position_id: string,
  candidate_id: string,
) {
  return (await getCandidatesOfPosition(position_id)).find(
    (candidate) => candidate.id === candidate_id,
  );
}

export async function getElectionVoters(election_id: string) {
  return voters.filter((voter) => voter.election_id === election_id);
}
