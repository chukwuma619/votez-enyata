import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface ElectionInvitationEmailProps {
  accessCode: string;
  electionID: string;
  voterName: string;
  creatorName: string;
  electionName: string;
  startDate: string;
  endDate: string;
  creatorEmail: string;
}


export const ElectionInvitationEmail: React.FC<
  Readonly<ElectionInvitationEmailProps>
> = ({
  accessCode,
  electionID,
  voterName,
  creatorName,
  electionName,
  startDate,
  endDate,
  creatorEmail,
}) => {
  const baseUrl = process.env.WEBSITE_URL
    ? `https://${process.env.WEBSITE_URL}`
    : 'http://localhost:3000';

    
const main = {
  fontFamily: "arial, 'helvetica neue', helvetica, sans-serif",
};
  return (
    <>
      <Html>
        <Head />
        <Preview>you are invited to vote</Preview>
        <Tailwind>
          <Body className="[font- w-full bg-[#FAFAFA]" style={main}>
            <Container className="mx-auto max-w-xl bg-white p-[20px]">
              <Section className="pt-4">
                <svg
                  className="mx-auto my-0 block h-6 w-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="122"
                  height="32"
                  viewBox="0 0 122 32"
                  fill="none"
                >
                  <rect width="32" height="32" className="fill-black" />
                  <rect
                    x="4"
                    y="4"
                    width="24"
                    height="10"
                    className="fill-white"
                  />
                  <path
                    d="M45.728 28L36.768 5.6H40.704L46.048 19.2C46.304 19.8613 46.528 20.4587 46.72 20.992C46.9333 21.5253 47.1147 22.016 47.264 22.464C47.4133 22.8907 47.552 23.296 47.68 23.68C47.808 24.064 47.936 24.448 48.064 24.832L47.232 24.864C47.3813 24.352 47.5413 23.8187 47.712 23.264C47.8827 22.7093 48.0747 22.1013 48.288 21.44C48.5227 20.7787 48.8 20.032 49.12 19.2L54.08 5.6H58.112L49.088 28H45.728ZM66.8248 28.32C65.1821 28.32 63.7101 27.9467 62.4088 27.2C61.1288 26.432 60.1154 25.3973 59.3688 24.096C58.6221 22.7733 58.2488 21.2693 58.2488 19.584C58.2488 17.8987 58.6221 16.4053 59.3688 15.104C60.1154 13.7813 61.1288 12.7467 62.4088 12C63.7101 11.232 65.1821 10.848 66.8248 10.848C68.4461 10.848 69.8968 11.232 71.1768 12C72.4781 12.7467 73.5021 13.7813 74.2488 15.104C74.9954 16.4053 75.3688 17.8987 75.3688 19.584C75.3688 21.2693 74.9954 22.7733 74.2488 24.096C73.5021 25.3973 72.4781 26.432 71.1768 27.2C69.8968 27.9467 68.4461 28.32 66.8248 28.32ZM66.8248 25.312C67.8274 25.312 68.7234 25.0667 69.5128 24.576C70.3021 24.064 70.9208 23.3813 71.3688 22.528C71.8168 21.6533 72.0301 20.672 72.0088 19.584C72.0301 18.4747 71.8168 17.4933 71.3688 16.64C70.9208 15.7653 70.3021 15.0827 69.5128 14.592C68.7234 14.1013 67.8274 13.856 66.8248 13.856C65.8221 13.856 64.9154 14.112 64.1048 14.624C63.3154 15.1147 62.6968 15.7973 62.2488 16.672C61.8008 17.5253 61.5874 18.496 61.6088 19.584C61.5874 20.672 61.8008 21.6533 62.2488 22.528C62.6968 23.3813 63.3154 24.064 64.1048 24.576C64.9154 25.0667 65.8221 25.312 66.8248 25.312ZM81.0403 28V6.912H84.3363V28H81.0403ZM77.5523 14.4V11.2H88.2403V14.4H77.5523ZM98.9253 28.32C97.1973 28.32 95.6613 27.9573 94.3173 27.232C92.9946 26.4853 91.9493 25.472 91.1813 24.192C90.4346 22.912 90.0613 21.44 90.0613 19.776C90.0613 18.4533 90.2746 17.248 90.7013 16.16C91.1279 15.072 91.7146 14.1333 92.4613 13.344C93.2293 12.5333 94.1359 11.9147 95.1813 11.488C96.2479 11.04 97.3999 10.816 98.6373 10.816C99.7253 10.816 100.739 11.0293 101.677 11.456C102.616 11.8613 103.427 12.4267 104.109 13.152C104.813 13.8773 105.347 14.7413 105.709 15.744C106.093 16.7253 106.275 17.8027 106.253 18.976L106.221 20.384H92.4933L91.7573 17.76H103.373L102.893 18.304V17.536C102.829 16.832 102.595 16.2027 102.189 15.648C101.784 15.0933 101.272 14.656 100.653 14.336C100.035 14.016 99.3626 13.856 98.6373 13.856C97.4853 13.856 96.5146 14.08 95.7253 14.528C94.9359 14.9547 94.3386 15.5947 93.9333 16.448C93.5279 17.28 93.3253 18.3147 93.3253 19.552C93.3253 20.7253 93.5706 21.7493 94.0613 22.624C94.5519 23.4773 95.2453 24.1387 96.1413 24.608C97.0373 25.0773 98.0719 25.312 99.2453 25.312C100.077 25.312 100.845 25.1733 101.549 24.896C102.275 24.6187 103.053 24.1173 103.885 23.392L105.549 25.728C105.037 26.24 104.408 26.688 103.661 27.072C102.936 27.456 102.157 27.7653 101.325 28C100.515 28.2133 99.7146 28.32 98.9253 28.32ZM109.131 28V25.248L117.803 13.664V14.048H109.131V11.2H121.387V13.888L112.843 25.312L112.715 25.152H121.579V28H109.131Z"
                    className="fill-black"
                  />
                </svg>
              </Section>
              <Heading className="mt-12 text-center text-3xl font-bold text-[#333333]">
                Hey {voterName}
              </Heading>
              <Text className="text-base">
                You&apos;ve been invited to vote in the {electionName} organized
                by
                {creatorName}.
                <br />
                <br />
                The voting period starts on {startDate} and ends on {endDate}.
              </Text>
              <Text className="text-base">
                We&apos;re using an online election system to make voting easy
                and secure. You&apos;ve been assigned a unique access code which
                can only be used to access the voting portal, and your vote will
                remain confidential.
              </Text>
              <Section>
                <Row>
                  <Column align="center">
                    <Text className="w-fit rounded-md bg-[#fafafa] p-2.5 text-sm">
                      Access Code:{' '}
                      <strong className="text-base font-bold">
                        {accessCode}
                      </strong>{' '}
                    </Text>
                  </Column>
                </Row>
                <Text className="-mt-[0.5rem] text-xs font-bold">
                  Important: Do not forward this email. Do not reply to this
                  email to vote, as your vote will not be registered.
                </Text>
              </Section>
              <Section>
                <Heading as="h2" className="text-lg font-bold underline">
                  How to Participate:
                </Heading>
                <ul>
                  <li>
                    <Text>
                      <strong className="text-base">Begin Voting</strong> visit
                      this link:{' '}
                      <Link
                        href={`${baseUrl}/vote/${electionID}/${accessCode}`}
                      >
                        {baseUrl}/vote/{electionID}/{accessCode}
                      </Link>{' '}
                      or copy and paste the link into your web browser. or go to{' '}
                      <Link href={`${baseUrl}/vote/${electionID}`}>
                        {baseUrl}/vote/{electionID}
                      </Link>{' '}
                      and enter &apos;{accessCode}&apos;
                    </Text>
                  </li>

                  <li>
                    <Text>
                      <strong className="text-base">
                        Check Real-Time Results,
                      </strong>{' '}
                      visit:{' '}
                      <Link href={`${baseUrl}/results/${electionID}`}>
                        {baseUrl}/results/{electionID}
                      </Link>
                      .
                    </Text>
                  </li>
                </ul>
              </Section>

              <Section>
                <Text>
                  If you have questions, or feedback, please contact the{' '}
                  {creatorName} at{' '}
                  <Link href={`mailto:${creatorEmail}`}>{creatorEmail}</Link>.
                </Text>
                <Text>Thank you for participating!</Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
};

