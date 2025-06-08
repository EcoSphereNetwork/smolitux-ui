import React from 'react';
import { render } from '@testing-library/react';
import { withVoiceControl, VoiceControlProps } from './withVoiceControl';
import { useVoiceControl } from './VoiceControlProvider';

jest.mock('./VoiceControlProvider');

const Base = React.forwardRef<HTMLDivElement, { id?: string }>((props, ref) => (
  <div ref={ref} data-testid="base" {...props} />
));

const VoiceDiv = withVoiceControl(Base, ['test']);

describe('withVoiceControl', () => {
  it('registers and unregisters component', () => {
    const register = jest.fn();
    const unregister = jest.fn();
    (useVoiceControl as jest.Mock).mockReturnValue({
      registerComponent: register,
      unregisterComponent: unregister,
      targetComponent: null,
      lastCommand: '',
    });

    const { unmount } = render(<VoiceDiv voiceCommands={['test']} />);
    expect(register).toHaveBeenCalled();
    unmount();
    expect(unregister).toHaveBeenCalled();
  });

  it('triggers onVoiceCommand when command matches', () => {
    const onVoiceCommand = jest.fn();
    (useVoiceControl as jest.Mock).mockReturnValue({
      registerComponent: jest.fn(),
      unregisterComponent: jest.fn(),
      targetComponent: '1',
      lastCommand: 'go',
    });

    render(<VoiceDiv voiceCommands={['go']} onVoiceCommand={onVoiceCommand} />);
    expect(onVoiceCommand).toHaveBeenCalledWith('go');
  });
});

