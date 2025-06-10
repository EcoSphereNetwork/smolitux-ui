# 🤖 @smolitux/ai - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS AI COMPONENTS 100% COMPLETE
while [ "$(find packages/@smolitux/ai/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 8 ]; do
  bash scripts/smolitux-analyzer.sh --package=ai
  cd packages/@smolitux/ai
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE AI KOMPONENTE
  AI_COMPONENTS=("ChatInterface" "ContentAnalytics" "SentimentDisplay" "AIModeration" "ContentGeneration" "SmartSuggestions" "NLPInsights" "MLModelViewer")
  
  NEXT=$(for comp in "${AI_COMPONENTS[@]}"; do
    if [ ! -f "src/components/$comp/$comp.tsx" ] || [ ! -f "src/components/$comp/$comp.test.tsx" ] || [ ! -f "src/components/$comp/$comp.stories.tsx" ]; then
      echo "$comp"; break
    fi
  done)
  
  echo "🎯 COMPLETING AI: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE AI KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_AI]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(ai): complete $NEXT - AI-powered component with ethical guidelines"
  git push origin main
  gh pr create --title "Complete AI: $NEXT" --body "AI component with ethics, performance, and error handling"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 AI Components"
done
echo "🎉 @smolitux/ai 100% COMPLETE!"
```

---

## 📋 **AI PACKAGE SPEZIFIKATIONEN:**

### **🎯 AI Components (8 Total):**
```
ChatInterface ContentAnalytics SentimentDisplay AIModeration ContentGeneration SmartSuggestions NLPInsights MLModelViewer
```

### **✅ Pro AI Component REQUIRED:**
- **Ethical AI:** Bias detection, fairness considerations
- **Performance:** Caching, streaming, error handling
- **Privacy:** Data protection, user consent
- **Real-time:** Streaming responses, live processing
- **Fallbacks:** Graceful degradation when AI unavailable

### **🔧 CORE AI Interfaces:**
```typescript
// CHAT Interface:
interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isStreaming?: boolean;
  streamingMessage?: string;
  aiModel?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  onError?: (error: AIError) => void;
  ethicsCheck?: boolean;
}

// CONTENT Analytics:
interface ContentAnalyticsProps {
  content: string;
  metrics: AnalyticsMetrics;
  realTime?: boolean;
  onAnalysisComplete?: (results: AnalysisResults) => void;
  includeReadability?: boolean;
  includeSEO?: boolean;
  includeAccessibility?: boolean;
}

// SENTIMENT Display:
interface SentimentDisplayProps {
  data: SentimentAnalysis;
  showBreakdown?: boolean;
  showConfidence?: boolean;
  animated?: boolean;
  onSentimentChange?: (sentiment: SentimentScore) => void;
}
```

### **📁 AI Structure:**
```
src/components/
├── ChatInterface/          # AI chat with streaming
├── ContentAnalytics/       # Content analysis dashboard
├── SentimentDisplay/       # Sentiment visualization
├── AIModeration/           # Content moderation AI
├── ContentGeneration/      # AI content creation
├── SmartSuggestions/       # AI-powered suggestions
├── NLPInsights/            # Natural language processing
└── MLModelViewer/          # Model performance visualization
```

### **🛡️ ETHICAL AI Features:**
```typescript
// BIAS Detection:
interface BiasDetection {
  checkForBias: (content: string) => BiasReport;
  mitigationSuggestions: string[];
  fairnessScore: number;
  demographicAnalysis?: DemographicBias[];
}

// PRIVACY Protection:
interface PrivacyConfig {
  dataScrubbing: boolean;
  personalInfoDetection: boolean;
  consentRequired: boolean;
  dataRetention: number; // days
  anonymization: boolean;
}

// TRANSPARENCY:
interface AITransparency {
  modelName: string;
  confidence: number;
  reasoning?: string[];
  limitations: string[];
  trainingData?: DatasetInfo;
}
```

### **⚡ PERFORMANCE Optimization:**
```typescript
// CACHING Strategy:
interface AICache {
  enabled: boolean;
  ttl: number;
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'smart';
}

// STREAMING Responses:
interface StreamingConfig {
  enabled: boolean;
  chunkSize: number;
  bufferSize: number;
  onChunk: (chunk: string) => void;
  onComplete: (fullResponse: string) => void;
}
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede AI Component:
✅ AI service mocking (API responses)
✅ Streaming response testing
✅ Error handling (rate limits, failures)
✅ Ethics validation (bias detection)
✅ Performance testing (large datasets)
✅ Privacy compliance testing
✅ Real-time processing validation
```

### **📚 STORYBOOK AI:**
```typescript
// REQUIRED Stories:
✅ Default AI component with mock data
✅ Streaming response demonstration
✅ Error state handling
✅ Ethics and bias detection showcase
✅ Performance with large datasets
✅ Privacy controls demonstration
✅ Different AI model comparisons
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-ai.md`
- **API KEYS:** Secure handling of AI service credentials
- **RATE LIMITS:** Proper error handling and user feedback

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
AI_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $AI_COUNT -lt 8 ]; then
  echo "🔄 CONTINUE: $AI_COUNT/8 Complete - Next AI component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 AI SYSTEM COMPLETE: @smolitux/ai 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **8/8 AI Components** fully implemented
- **Ethical AI** bias detection and fairness
- **Performance** optimized with caching and streaming
- **Privacy** GDPR-compliant data handling
- **Real-time** streaming and live processing

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **ChatInterface Component:**
```typescript
export const ChatInterface = forwardRef<HTMLDivElement, ChatInterfaceProps>(
  ({ 
    messages,
    onSendMessage,
    isStreaming = false,
    streamingMessage,
    aiModel = 'GPT-4',
    systemPrompt,
    ethicsCheck = true,
    onError,
    className,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Auto-scroll to bottom
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingMessage]);
    
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim() || isLoading) return;
      
      // Ethics check
      if (ethicsCheck) {
        const biasCheck = await checkForBias(inputValue);
        if (biasCheck.severity > 0.7) {
          onError?.({
            type: 'ethics',
            message: 'Content may contain bias',
            details: biasCheck
          });
          return;
        }
      }
      
      setIsLoading(true);
      try {
        await onSendMessage(inputValue);
        setInputValue('');
      } catch (error) {
        onError?.(error as AIError);
      } finally {
        setIsLoading(false);
      }
    }, [inputValue, isLoading, ethicsCheck, onSendMessage, onError]);
    
    return (
      <div 
        ref={ref}
        className={cn('chat-interface', className)}
        role="log"
        aria-label="AI chat conversation"
        aria-live="polite"
        {...props}
      >
        {/* System Prompt Display */}
        {systemPrompt && (
          <div className="system-prompt" role="status">
            <span className="sr-only">System instructions: </span>
            {systemPrompt}
          </div>
        )}
        
        {/* Messages */}
        <div className="messages-container">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id}
              message={message}
              isAI={message.role === 'assistant'}
              aiModel={aiModel}
            />
          ))}
          
          {/* Streaming Message */}
          {isStreaming && streamingMessage && (
            <div className="streaming-message" role="status">
              <div className="ai-avatar">{aiModel}</div>
              <div className="message-content">
                {streamingMessage}
                <span className="typing-indicator" aria-label="AI is typing">
                  <span></span><span></span><span></span>
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading || isStreaming}
            className="chat-input"
            aria-label="Chat message input"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading || isStreaming}
            className="send-button"
            aria-label="Send message"
          >
            {isLoading ? <LoadingIcon /> : <SendIcon />}
          </button>
        </form>
        
        {/* AI Model Info */}
        <div className="ai-info" role="status">
          <span className="sr-only">Using AI model: </span>
          {aiModel}
          {ethicsCheck && (
            <span className="ethics-badge" title="Ethics checking enabled">
              🛡️ Ethics Check
            </span>
          )}
        </div>
        
        {/* Accessibility */}
        <div className="sr-only" aria-live="polite">
          {isStreaming && 'AI is generating a response'}
          {isLoading && 'Processing your message'}
        </div>
      </div>
    );
  }
);
```

### **AI Ethics Hook:**
```typescript
export const useAIEthics = () => {
  const checkForBias = useCallback(async (content: string): Promise<BiasReport> => {
    // Bias detection logic
    return {
      severity: 0.2,
      types: ['gender'],
      suggestions: ['Consider gender-neutral language'],
      confidence: 0.85
    };
  }, []);
  
  const validateContent = useCallback(async (content: string): Promise<ValidationResult> => {
    // Content validation logic
    return {
      safe: true,
      issues: [],
      recommendations: []
    };
  }, []);
  
  return { checkForBias, validateContent };
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-ai.md << EOF
# @smolitux/ai Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 8" | bc)%)
Ethical AI: ✅ Bias detection, fairness checks
Latest: $NEXT ✅
Performance: Streaming, caching, error handling
Privacy: GDPR-compliant data handling
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 8/8 AI COMPONENTS = 100% ETHICAL AI SYSTEM!**
