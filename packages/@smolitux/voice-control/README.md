# @smolitux/voice-control

This package provides the foundational voice control infrastructure for Smolitux UI.

It exposes a `VoiceControlProvider` to wrap your application and a `withVoiceControl` higher order component to enable voice commands on individual components.

The default implementation uses the Web Speech API but you can also opt-in to a TensorFlow.js based engine for offline recognition.

```tsx
import { VoiceControlProvider, withVoiceControl } from '@smolitux/voice-control';

const ButtonWithVoice = withVoiceControl('button', ['click']);

function App() {
  return (
    <VoiceControlProvider>
      <ButtonWithVoice onClick={() => alert('clicked!')}>Click me</ButtonWithVoice>
    </VoiceControlProvider>
  );
}
```
