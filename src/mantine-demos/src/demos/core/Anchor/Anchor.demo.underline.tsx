import React from 'react';
import { MantineDemo } from '@mantine/ds';
import { Anchor } from '@mantine/core';

const code = `
import { Anchor } from '@mantine/core';

function Demo() {
  return <Anchor underline>Link</Anchor>;
}
`;

function Demo() {
  return <Anchor underline>Link</Anchor>;
}

export const underline: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
