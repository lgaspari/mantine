import React from 'react';
import { render } from '@testing-library/react';
import {
  itRendersChildren,
  itIsPolymorphic,
  itSupportsSystemProps,
  itSupportsProviderVariant,
  itSupportsProviderSize,
} from '@mantine/tests';
import { Anchor, AnchorProps } from './Anchor';

const defaultProps: AnchorProps = {};

describe('@mantine/core/Anchor', () => {
  itRendersChildren(Anchor, defaultProps);
  itIsPolymorphic(Anchor, defaultProps);
  itSupportsProviderVariant(Anchor, defaultProps, 'Anchor');
  itSupportsProviderSize(Anchor, defaultProps, 'Anchor');
  itSupportsSystemProps({
    component: Anchor,
    props: defaultProps,
    displayName: '@mantine/core/Anchor',
    refType: HTMLAnchorElement,
    providerName: 'Anchor',
  });

  it('adds type="button" attribute if component prop is button', () => {
    const { container: link } = render(<Anchor component="a" />);
    const { container: button } = render(<Anchor component="button" />);
    const { container: buttonReset } = render(<Anchor component="button" type="reset" />);

    expect(link.querySelector('a').getAttribute('type')).toBe(null);
    expect(button.querySelector('button').getAttribute('type')).toBe('button');
    expect(buttonReset.querySelector('button').getAttribute('type')).toBe('reset');
  });

  it('sets underline=false by default', () => {
    const { container: link } = render(<Anchor />);
    expect(link.querySelector('a')).not.toHaveStyle({ 'text-decoration': 'underline' });
  });

  it('adds text-decoration underline if underline prop is true', () => {
    const { container: link } = render(<Anchor underline />);
    expect(link.querySelector('a')).toHaveStyle({ 'text-decoration': 'underline' });
  });
});
