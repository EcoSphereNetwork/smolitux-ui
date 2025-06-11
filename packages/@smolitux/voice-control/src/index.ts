export { VoiceControlProvider, useVoiceControl } from './VoiceControlProvider';
export { withVoiceControl } from './withVoiceControl';
export type { VoiceControlProps } from './withVoiceControl';
export { VoiceControlManager } from './VoiceControlManager';
export type { EngineType } from './VoiceControlManager';
export { WebSpeechRecognitionEngine } from './engines/WebSpeechRecognitionEngine';
export { TensorFlowRecognitionEngine } from './engines/TensorFlowRecognitionEngine';
export { ModelManager } from './models/ModelManager';
export { ModelTrainer } from './models/ModelTrainer';
export { default as ModelTrainingComponent } from './models/ModelTrainingComponent';
export { SpeechSynthesizer } from './SpeechSynthesizer';
export type { SpeechSynthesizerOptions } from "./SpeechSynthesizer";
export type {
  SpeechRecognitionConstructor,
  SpeechAPISupport,
  VoiceCommandRegistration,
  FeedbackType,
  RecognizerParams,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionResult,
  SpeechRecognitionResultList,
  SpeechRecognitionAlternative,
} from './types';
export { VoiceRecognition } from './components/VoiceRecognition';
export type { VoiceRecognitionProps } from './components/VoiceRecognition';
export { SpeechSynthesis } from './components/SpeechSynthesis';
export type { SpeechSynthesisProps } from './components/SpeechSynthesis/SpeechSynthesis';
