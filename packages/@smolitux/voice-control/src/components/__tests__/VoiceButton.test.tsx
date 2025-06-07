import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VoiceControlProvider, useVoiceControl } from '../../VoiceControlProvider';
import { VoiceButton } from '../VoiceButton';

test('voice command triggers click', () => {
  const onClick = jest.fn();
  let simulate: (text: string) => void = () => {};

  const Wrapper: React.FC = ({ children }) => {
    const ctx = useVoiceControl();
    simulate = ctx.simulateCommand;
    return <>{children}</>;
  };

  const { getByText } = render(
    <VoiceControlProvider>
      <Wrapper>
        <VoiceButton onClick={onClick}>Test</VoiceButton>
      </Wrapper>
    </VoiceControlProvider>
  );

  const button = getByText('Test');
  fireEvent.click(button); // normal click
  expect(onClick).toHaveBeenCalledTimes(1);

  simulate('click');
  expect(onClick).toHaveBeenCalledTimes(2);
});
