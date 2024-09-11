import { Heading } from '@/components/heading';
import { Subheading } from '@/components/heading';
import { Stat } from '@/app/dashboard/_components/stat';
import { getDate, getTime, convertTimestampFmtToInputFmt } from '@/lib/utils';
import { getAuthUser, getAuthUserOverviewData } from '@/data/profile';
import UpdatePeriod from './_components/update-period';
import { getUserUpcomingElections } from '@/data/election';
export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    period?: 'last-week' | 'last-two-week' | 'last-month';
  };
}) {
  const period = searchParams?.period || 'last-week';
  const {
    totalElections,
    activeElections,
    totalRegVoters,
    voterTurnoutRate,
    totalElectionsChange,
    totalRegVotersChange,
    voterTurnoutRateChange,
  } = await getAuthUserOverviewData({ range: period ? period : 'last-week' });

  const userData = await getAuthUser();
  const upcomaingElections = await getUserUpcomingElections(userData.id);
  return (
    <>
      <Heading>Good Day, {userData.user_metadata.first_name}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <UpdatePeriod />
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total Elections Created"
          value={`${totalElections}`}
          change={totalElectionsChange}
        />
        <Stat
          title="Active Elections"
          value={`${activeElections}`}
          change="-0.5%"
        />
        <Stat
          title="Total Voters Registered"
          value={`${totalRegVoters}`}
          change={totalRegVotersChange}
        />
        <Stat
          title="Voter Turnout Rate"
          value={`${voterTurnoutRate}%`}
          change={voterTurnoutRateChange}
        />
      </div>

      <Subheading className="mt-14">Upcoming Elections</Subheading>
      <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6">
        {upcomaingElections.map((election, index) => (
          <li key={index} className="py-4 sm:flex">
            <time
              dateTime={
                convertTimestampFmtToInputFmt(election.start_datetime).split(
                  'T',
                )[0]
              }
              className="w-28 flex-none text-zinc-500"
            >
              {getDate(election.start_datetime)}
            </time>
            <p className="mt-2 flex-auto font-semibold sm:mt-0">
              {election.name}
            </p>
            <p className="flex-none text-zinc-500 sm:ml-6">
              <time
                dateTime={convertTimestampFmtToInputFmt(
                  election.start_datetime,
                )}
              >
                {getTime(election.start_datetime)}
              </time>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
