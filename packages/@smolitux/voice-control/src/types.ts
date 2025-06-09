export interface VoiceCommandRegistration {
  id: string;
  commands: string[];
}

export type FeedbackType = 'start' | 'stop' | 'command';

export type SpeechRecognitionConstructor = new () => SpeechRecognition;

export interface SpeechAPISupport {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export interface RecognizerParams {
  scoreThreshold?: number;
}
