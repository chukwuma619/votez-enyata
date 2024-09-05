import * as Headless from '@headlessui/react';
import React from 'react';
import NextLink, { type LinkProps } from 'next/link';

export const Link = React.forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <NextLink {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
