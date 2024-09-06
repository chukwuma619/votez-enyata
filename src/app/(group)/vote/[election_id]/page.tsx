import { Heading } from '@/components/heading';
import VerifyForm from './_components/verify-form';
import { Text, Strong } from '@/components/text';
import { getElection } from '@/data/election';
export default async function VerifyCode({
  params,
}: {
  params: { election_id: string };
}) {
  const electionData = await getElection(params.election_id);
  return (
    <>
      <div className="relative mt-12 sm:mt-16">
        <Heading className="text-center !text-2xl font-medium tracking-tight">
          Verify Access Code
        </Heading>

        <Text className="mt-3 text-center text-lg">
          Please enter the unique access code sent to your email to begin voting
          in the <br /> <Strong>{electionData.name}</Strong>.
        </Text>
      </div>
      <VerifyForm election_id={electionData.id} />
    </>
  );
}
