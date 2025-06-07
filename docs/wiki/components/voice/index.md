# Voice-Komponenten

Die Voice-Komponenten ermöglichen die Steuerung von UI-Elementen per Sprache. Grundlage ist der `VoiceControlProvider` aus `@smolitux/voice-control`.

## VoiceButton

```tsx
import { VoiceButton } from '@smolitux/core';

<VoiceButton id="submit" onClick={() => alert('gesendet')}>Sprechen oder klicken</VoiceButton>
```

## VoiceInput

```tsx
import { VoiceInput } from '@smolitux/core';

<VoiceInput label="Nachricht" placeholder="Diktieren Sie Ihre Nachricht" />
```

## VoiceSelect

```tsx
import { VoiceSelect } from '@smolitux/core';

<VoiceSelect label="Sprache" options={[{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'Englisch' }]} />
```

## VoiceCard

```tsx
import { VoiceCard } from '@smolitux/core';

<VoiceCard voiceCommands={["öffnen", "open"]}>Inhalt</VoiceCard>
```

## VoiceModal

```tsx
import { VoiceModal, VoiceButton } from '@smolitux/core';

<VoiceButton id="open-modal">Modal öffnen</VoiceButton>
<VoiceModal triggerId="open-modal" voiceCommands={["schließen"]}>
  <p>Sprachgesteuertes Modal</p>
</VoiceModal>
```
