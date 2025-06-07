export interface RecognitionEngine {
  onResult: (text: string) => void;
  onStateChange: (isListening: boolean) => void;
  start(): void;
  stop(): void;
  cleanup(): void;
  isSupported(): boolean;
}
