import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
} from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Text } from './text';
import clsx from 'clsx';
import { Button } from './button';
export function Notification({
  message,
  status,
  show,
  setShow,
}: {
  message: string;
  status?: 'success' | 'warning' | 'error';
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  {status && (
                    <div className="flex-shrink-0">
                      {status === 'success' && (
                        <CheckCircleIcon
                          className="h-6 w-6 text-green-400"
                          aria-hidden="true"
                        />
                      )}

                      {status === 'warning' && (
                        <QuestionMarkCircleIcon
                          className="h-6 w-6 text-yellow-400"
                          aria-hidden="true"
                        />
                      )}

                      {status === 'error' && (
                        <ExclamationCircleIcon
                          className="h-6 w-6 text-red-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}

                  <div className={clsx(status ? 'ml-3' : '', 'w-0 flex-1')}>
                    <Text className="text-sm !font-medium">{message}</Text>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <Button
                      plain
                      type="button"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
