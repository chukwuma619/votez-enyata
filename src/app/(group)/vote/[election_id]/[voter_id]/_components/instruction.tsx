import { Button } from '@/components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { TextLink } from '@/components/text';
import { Dispatch, SetStateAction } from 'react';
export default function VoterInstruction({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>INSTRUCTIONS TO VOTER</DialogTitle>
        <DialogDescription>
          If you have any question or complaint, contact the election{' '}
          <TextLink href={'#'}>Official</TextLink> for help
        </DialogDescription>
        <DialogBody>
          <ol className="pl-4 text-base/6 text-zinc-500 [list-style:auto] sm:text-sm/6 dark:text-zinc-400">
            <li>
              For each position, select the candidate you wish to vote for by
              clicking the corresponding candidate or radio button.
            </li>
            <li>
              Once you have made your selections, click the &quot;Submit
              Vote&quot; button to finalize and record your votes.
            </li>
            <li>
              Review your choices and confirm the submission of your vote. You
              should see a confirmation message indicating your vote has been
              successfully recorded.
            </li>
            <li>
              Do not share your access code with anyone to ensure the integrity
              and confidentiality of your vote.
            </li>
          </ol>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
