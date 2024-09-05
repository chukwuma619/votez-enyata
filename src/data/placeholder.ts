export type PersonType = {
  name: string;
  email: string;
  ImageUrl: string;
  desc?: string;
};

export type ElectionType = {
  id: string;
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
};

export type PositionType = {
  id: string;
  name: string;
  election_id: string;
};

export type CandidateType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position_id: string;
  vote_count: number;
};

export type VoterType = {
  id: string;
  name: string;
  email: string;
  accessCode: string;
  emailSent: boolean;
  election_id: string;
};

export type Votes = {
  id: string;
  created_at: string;
  voter_id: string;
  position_id: string;
  candidate_id: string;
  election_id: string;
};

export const people: PersonType[] = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },

  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    ImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const elections: ElectionType[] = [
  {
    id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
    name: 'Student Council Election 2024',
    description:
      'This election will determine the student council representatives for the 2024 academic year.',
    start_datetime: '2024-06-01T09:00:00',
    end_datetime: '2024-06-01T17:00:00',
  },
  {
    id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
    name: 'Board of Directors Election',
    description:
      'Voting to elect new members to the Board of Directors for the upcoming term.',
    start_datetime: '2024-07-15T08:00:00',
    end_datetime: '2024-07-15T20:00:00',
  },
  {
    id: 'fb0b20c6-b141-4f5e-9402-35e129e076ad',
    name: 'Employee of the Year 2024',
    description:
      'Annual voting to recognize and reward the outstanding employee of the year.',
    start_datetime: '2024-08-01T10:00:00',
    end_datetime: '2024-08-01T18:00:00',
  },
  {
    id: 'c5c4d84a-4237-4c8e-b519-af0be2e0ad97',
    name: 'Community Leadership Election',
    description:
      'Elections to choose the new leaders for our community organization.',
    start_datetime: '2024-09-10T07:00:00',
    end_datetime: '2024-09-10T19:00:00',
  },
  {
    id: 'e1629fb1-6f05-4e59-b1bc-2769de141c77',
    name: 'Annual General Meeting Voting',
    description:
      'Voting on key decisions and positions during the Annual General Meeting.',
    start_datetime: '2024-10-05T09:00:00',
    end_datetime: '2024-10-05T15:00:00',
  },
];

export const positions: PositionType[] = [
  {
    id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    name: 'President',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    name: 'Vice President',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '2c6a0b9a-b2f8-4e90-bc0a-2b77b3932c8d',
    name: 'Treasurer',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '10f1d3bc-7e5a-4c2b-88df-0d56d69c9a2d',
    name: 'Secretary',
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: '3a4eeb2e-4b19-4ec7-9ef8-6544a1e9d2b5',
    name: 'Board Member',
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: '7559b8cf-2db1-403e-80e0-1e1b84c7f9a4',
    name: 'Employee of the Year',
    election_id: 'fb0b20c6-b141-4f5e-9402-35e129e076ad',
  },
  {
    id: 'b5fc4d97-1d63-470d-8a1a-b7b9f2c8e2e8',
    name: 'Community Leader',
    election_id: 'c5c4d84a-4237-4c8e-b519-af0be2e0ad97',
  },
  {
    id: 'fe6a3e2b-9edb-4b83-9c7a-e2c9b21d735b',
    name: 'Vice Community Leader',
    election_id: 'c5c4d84a-4237-4c8e-b519-af0be2e0ad97',
  },
  {
    id: 'd62f8a2a-44d3-41d2-a7f1-9a3c29d2e0bf',
    name: 'Chairperson',
    election_id: 'e1629fb1-6f05-4e59-b1bc-2769de141c77',
  },
  {
    id: 'e8276b4e-d287-48b5-b881-1a6b1a9d0f2d',
    name: 'Vice Chairperson',
    election_id: 'e1629fb1-6f05-4e59-b1bc-2769de141c77',
  },
];

export const candidates: CandidateType[] = [
  {
    id: '2b1f5bc2-65e4-46a1-85f5-cc3a2ef4d5a1',
    name: 'John Doe',
    description: 'Experienced leader with a vision for progress.',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: 'a7c4e6a2-28b4-4fa8-a00b-2a0d98a3ef1a',
    name: 'Jane Smith',
    description: 'Committed to transparency and growth.',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '3e6d5b6e-7d2b-4f4d-82a3-fb8a1f8e6d7c',
    name: 'Alice Johnson',
    description: 'Advocate for student rights and welfare.',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '7b6d2e4f-8a5d-41b3-92c5-4f8e7c5b6d1a',
    name: 'Bob Brown',
    description: 'Focused on innovative solutions and collaboration.',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '1d5e6c3f-7d4b-4b3d-81a2-e5f6a4b2c6e7',
    name: 'Carol Davis',
    description: 'Dedicated to financial transparency and accountability.',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '6d3e5c4a-8f6b-4b8d-92e7-1a4d6c3e5f8a',
    name: 'Dave Wilson',
    description: 'Champion of student engagement and participation.',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '3f5d2c6a-8b5d-4a7d-83c6-e4d5b6c8e7f1',
    name: 'Eve Martinez',
    description: 'Passionate about community building and service.',
    position_id: '2c6a0b9a-b2f8-4e90-bc0a-2b77b3932c8d',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '7c4b6d3a-2f5e-4b8d-92c6-1d5f4b3a6c7d',
    name: 'Frank Clark',
    description: 'Focused on financial efficiency and sustainability.',
    position_id: '2c6a0b9a-b2f8-4e90-bc0a-2b77b3932c8d',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '1d6e4f5c-7a4d-4b3d-82c5-e4f7b5a6c8e7',
    name: 'Grace Lee',
    description: 'Ensuring financial integrity and transparency.',
    position_id: '2c6a0b9a-b2f8-4e90-bc0a-2b77b3932c8d',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '2f3a5d4c-8e6b-4b3d-91a7-3c5b2e4f6d1a',
    name: 'Henry Evans',
    description: 'Committed to organizational excellence and growth.',
    position_id: '10f1d3bc-7e5a-4c2b-88df-0d56d69c9a2d',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    vote_count: 0,
  },
  {
    id: '7e5c2d6a-3f4b-4a7e-93b6-2c7a5e4b6d8c',
    name: 'Isabel White',
    description: 'Dedicated to effective communication and organization.',
    position_id: '10f1d3bc-7e5a-4c2b-88df-0d56d69c9a2d',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    vote_count: 0,
  },
  {
    id: '3e6f5d4c-2b5d-4a7c-92e7-4a5b3d6f8e7a',
    name: 'Jack Turner',
    description: 'Promoting innovation and organizational efficiency.',
    position_id: '10f1d3bc-7e5a-4c2b-88df-0d56d69c9a2d',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    vote_count: 0,
  },
];

export const voters: VoterType[] = [
  {
    id: 'c5b38e7f-1d72-4f30-9b72-d2b21d671f8b',
    name: 'Emma Watson',
    email: 'emma.watson@example.com',
    accessCode: 'VOTER-12345',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'a1e98d72-2f59-41d5-8c6b-9c8f5b1a5a1b',
    name: 'Liam Smith',
    email: 'liam.smith@example.com',
    accessCode: 'VOTER-23456',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'd4f8e5c3-9b1d-4b6a-b9f1-3e9d5b7a4f1d',
    name: 'Olivia Johnson',
    email: 'olivia.johnson@example.com',
    accessCode: 'VOTER-34567',
    emailSent: false,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'e1b7c5d4-8e9d-4f2b-9d6a-5c7b3e1f8d7a',
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    accessCode: 'VOTER-45678',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'b8e9f4d1-6a3b-4b8d-9c7e-5d1a4f3b7e2a',
    name: 'Ava Brown',
    email: 'ava.brown@example.com',
    accessCode: 'VOTER-56789',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'f3d7b6e4-2a5d-4c8d-9e7b-3d1a5e4b6c7d',
    name: 'James Davis',
    email: 'james.davis@example.com',
    accessCode: 'VOTER-67890',
    emailSent: false,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'd1a7f5e3-6b2d-4c8b-9e7c-5a3b4f7e2c1d',
    name: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    accessCode: 'VOTER-78901',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'b7d6e5f2-3a9b-4d8c-9e7a-1d2b5e3f6c8d',
    name: 'William Martinez',
    email: 'william.martinez@example.com',
    accessCode: 'VOTER-89012',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'c4b3e7d1-9a6b-4d2f-8e5a-3b9d1c7e4f2a',
    name: 'Isabella Hernandez',
    email: 'isabella.hernandez@example.com',
    accessCode: 'VOTER-90123',
    emailSent: false,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'e5d7b8a3-6c9d-4f2e-8a7b-3d4c1e9f5b7a',
    name: 'Ethan Clark',
    email: 'ethan.clark@example.com',
    accessCode: 'VOTER-01234',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'a6c3e7b5-4d9f-2a7b-8e5d-1b3a9d7f6c2a',
    name: 'Mia Lewis',
    email: 'mia.lewis@example.com',
    accessCode: 'VOTER-34512',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'f2d7c3a9-6b8e-4d1f-9e5c-3a7d1b5e2c9d',
    name: 'Alexander Hall',
    email: 'alexander.hall@example.com',
    accessCode: 'VOTER-45623',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'c7b4e6d1-2a5f-4d8e-9c7a-5b3d4f7e1a6c',
    name: 'Amelia Young',
    email: 'amelia.young@example.com',
    accessCode: 'VOTER-56734',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'd1e7b4c3-6a9d-4f8e-2c5b-3a7f1e9d5b2a',
    name: 'Benjamin King',
    email: 'benjamin.king@example.com',
    accessCode: 'VOTER-67845',
    emailSent: false,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: 'e3b7c5a2-9d8e-4f1d-2a5c-3d7b1e9f6b4a',
    name: 'Charlotte Scott',
    email: 'charlotte.scott@example.com',
    accessCode: 'VOTER-78956',
    emailSent: true,
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },

  {
    id: 'f2b7d1e3-6a9f-4b8e-9c7a-1d3a5f7b6c4a',
    name: 'Daniel Robinson',
    email: 'daniel.robinson@example.com',
    accessCode: 'VOTER-10101',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'c3e4d2a7-9b6e-4f1d-2a5c-3d7b1e9f5b3a',
    name: 'Grace Walker',
    email: 'grace.walker@example.com',
    accessCode: 'VOTER-20202',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'e9d3b4f7-6a2e-4b1d-9c5a-3a8d1b7e4f5a',
    name: 'Henry Martinez',
    email: 'henry.martinez@example.com',
    accessCode: 'VOTER-30303',
    emailSent: false,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'd4b8e3c7-2a5f-4d8e-9c7a-1d3a5e7b6c9a',
    name: 'Chloe Lee',
    email: 'chloe.lee@example.com',
    accessCode: 'VOTER-40404',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'a6c7d4b5-4e9f-2a7b-8c5d-1b3d9f7e6c2a',
    name: 'Lucas Harris',
    email: 'lucas.harris@example.com',
    accessCode: 'VOTER-50505',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'f9d2e5a3-6b8e-4d1f-9c7a-3a2d1e5b4c7a',
    name: 'Ella Clark',
    email: 'ella.clark@example.com',
    accessCode: 'VOTER-60606',
    emailSent: false,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'e1c7d5b3-2a9e-4f8e-6c7b-3b1d9a7f6c5a',
    name: 'Matthew Lewis',
    email: 'matthew.lewis@example.com',
    accessCode: 'VOTER-70707',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'c6b4e7d1-9a5b-4d8f-2e7c-3d5a1f7e4b9a',
    name: 'Zoe Young',
    email: 'zoe.young@example.com',
    accessCode: 'VOTER-80808',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'b3d7e6f2-4a9b-2d8e-6c7a-1d3e5b9f4c7a',
    name: 'David Allen',
    email: 'david.allen@example.com',
    accessCode: 'VOTER-90909',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
  {
    id: 'a1b4e7d3-6c9d-2f8e-5a7b-3d9a1e7b6c2a',
    name: 'Emily Wright',
    email: 'emily.wright@example.com',
    accessCode: 'VOTER-01010',
    emailSent: true,
    election_id: 'd7f4e8b9-b8cb-4b86-bb5d-0f58c2c57020',
  },
];

export const votes: Votes[] = [
  {
    id: '1a2b3c4d-5e6f-7348h-9i0j-1k2l3m4n5o6p',
    created_at: '2024-06-01T10:00:00',
    voter_id: 'e3b7c5a2-9d8e-4f1d-2a5c-3d7b1e9f6b4a',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: 'a7c4e6a2-28b4-4fa8-a00b-2a0d98a3ef1a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    created_at: '2024-06-01T10:00:00',
    voter_id: 'c5b38e7f-1d72-4f30-9b72-d2b21d671f8b',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: '2b1f5bc2-65e4-46a1-85f5-cc3a2ef4d5a1',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
    created_at: '2024-06-01T10:15:00',
    voter_id: 'a1e98d72-2f59-41d5-8c6b-9c8f5b1a5a1b',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: 'a7c4e6a2-28b4-4fa8-a00b-2a0d98a3ef1a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
    created_at: '2024-06-01T10:30:00',
    voter_id: 'd4f8e5c3-9b1d-4b6a-b9f1-3e9d5b7a4f1d',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    candidate_id: '7b6d2e4f-8a5d-41b3-92c5-4f8e7c5b6d1a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
    created_at: '2024-06-01T10:45:00',
    voter_id: 'e1b7c5d4-8e9d-4f2b-9d6a-5c7b3e1f8d7a',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    candidate_id: '1d5e6c3f-7d4b-4b3d-81a2-e5f6a4b2c6e7',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
    created_at: '2024-06-01T11:00:00',
    voter_id: 'b8e9f4d1-6a3b-4b8d-9c7e-5d1a4f3b7e2a',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    candidate_id: '6d3e5c4a-8f6b-4b8d-92e7-1a4d6c3e5f8a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
    created_at: '2024-06-01T11:15:00',
    voter_id: 'f3d7b6e4-2a5d-4c8d-9e7b-3d1a5e4b6c7d',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: '3e6d5b6e-7d2b-4f4d-82a3-fb8a1f8e6d7c',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
    created_at: '2024-06-01T11:30:00',
    voter_id: 'd1a7f5e3-6b2d-4c8b-9e7c-5a3b4f7e2c1d',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: '2b1f5bc2-65e4-46a1-85f5-cc3a2ef4d5a1',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
    created_at: '2024-06-01T11:45:00',
    voter_id: 'b7d6e5f2-3a9b-4d8c-9e7a-1d2b5e3f6c8d',
    position_id: 'f60c23b4-2fc7-4b9b-932b-e5f8bb2efb0e',
    candidate_id: 'a7c4e6a2-28b4-4fa8-a00b-2a0d98a3ef1a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
    created_at: '2024-06-01T12:00:00',
    voter_id: 'c4b3e7d1-9a6b-4d2f-8e5a-3b9d1c7e4f2a',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    candidate_id: '6d3e5c4a-8f6b-4b8d-92e7-1a4d6c3e5f8a',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
  {
    id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
    created_at: '2024-06-01T12:15:00',
    voter_id: 'e5d7b8a3-6c9d-4f2e-8a7b-3d4c1e9f5b7a',
    position_id: '5d6b8b3a-1d9b-4b4c-99cf-54267876c3b1',
    candidate_id: '1d5e6c3f-7d4b-4b3d-81a2-e5f6a4b2c6e7',
    election_id: 'a7b41e30-7a25-4b3d-88dc-1d75c9e0f9f1',
  },
];
