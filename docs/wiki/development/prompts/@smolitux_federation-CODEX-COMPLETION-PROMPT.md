# 🔗 @smolitux/federation - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS FEDERATION 100% COMPLETE
while [ "$(find packages/@smolitux/federation/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 6 ]; do
  bash scripts/smolitux-analyzer.sh --package=federation
  cd packages/@smolitux/federation
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE FEDERATION KOMPONENTE
  FEDERATION=("FederatedSearch" "CrossPlatformShare" "ProtocolHandler" "ActivityPubViewer" "IdentityBridge" "FederationSettings")
  
  NEXT=$(for comp in "${FEDERATION[@]}"; do
    if [ ! -f "src/components/$comp/$comp.tsx" ] || [ ! -f "src/components/$comp/$comp.test.tsx" ] || [ ! -f "src/components/$comp/$comp.stories.tsx" ]; then
      echo "$comp"; break
    fi
  done)
  
  echo "🎯 COMPLETING FEDERATION: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE FEDERATION KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_FEDERATION]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(federation): complete $NEXT - cross-platform federation component"
  git push origin main
  gh pr create --title "Complete Federation: $NEXT" --body "Federation component with protocol compliance and cross-platform support"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/6 Federation Components"
done
echo "🎉 @smolitux/federation 100% COMPLETE!"
```

---

## 📋 **FEDERATION PACKAGE SPEZIFIKATIONEN:**

### **🎯 Federation Components (6 Total):**
```
FederatedSearch CrossPlatformShare ProtocolHandler ActivityPubViewer IdentityBridge FederationSettings
```

### **✅ Pro Federation Component REQUIRED:**
- **Protocol Compliance:** ActivityPub, AT Protocol, Matrix support
- **Cross-Platform:** Multi-platform content sharing and discovery
- **Identity Management:** Decentralized identity and authentication
- **Standards Compliance:** W3C and fediverse standards
- **Interoperability:** Seamless platform communication

### **🔧 CORE Federation Interfaces:**
```typescript
// FEDERATED Search:
interface FederatedSearchProps {
  query: string;
  platforms: FederatedPlatform[];
  protocols: Protocol[];
  onResults?: (results: FederatedResult[]) => void;
  filters?: SearchFilter[];
  realTime?: boolean;
  deduplication?: boolean;
}

// CROSS-PLATFORM Share:
interface CrossPlatformShareProps {
  content: ShareableContent;
  targetPlatforms: Platform[];
  shareOptions?: ShareOption[];
  onShare?: (platform: Platform, result: ShareResult) => void;
  onError?: (platform: Platform, error: string) => void;
  customization?: ShareCustomization;
}

// PROTOCOL Handler:
interface ProtocolHandlerProps {
  protocols: SupportedProtocol[];
  onMessage?: (message: ProtocolMessage) => void;
  onConnection?: (connection: ProtocolConnection) => void;
  errorHandling?: ProtocolErrorHandling;
  authentication?: ProtocolAuth;
}
```

### **📁 Federation Structure:**
```
src/components/
├── FederatedSearch/        # Multi-platform content search
├── CrossPlatformShare/     # Content sharing across platforms
├── ProtocolHandler/        # Protocol communication handler
├── ActivityPubViewer/      # ActivityPub content viewer
├── IdentityBridge/         # Cross-platform identity management
└── FederationSettings/     # Federation configuration UI
```

### **🌐 PROTOCOL Support:**
```typescript
// SUPPORTED Protocols:
interface SupportedProtocol {
  name: 'ActivityPub' | 'ATProtocol' | 'Matrix' | 'Nostr' | 'RSS';
  version: string;
  capabilities: ProtocolCapability[];
  endpoints: ProtocolEndpoint[];
  authentication: AuthMethod[];
}

// ACTIVITYPUB Integration:
interface ActivityPubObject {
  '@context': string | string[];
  type: 'Article' | 'Note' | 'Person' | 'Follow' | 'Like' | 'Announce';
  id: string;
  actor: string;
  object?: string | ActivityPubObject;
  published?: string;
  content?: string;
  to?: string[];
  cc?: string[];
}

// AT PROTOCOL (Bluesky):
interface ATProtocolRecord {
  $type: string;
  text?: string;
  createdAt: string;
  reply?: ATProtocolReply;
  embed?: ATProtocolEmbed;
  entities?: ATProtocolEntity[];
}
```

### **🔍 FEDERATED Search:**
```typescript
// SEARCH Across Platforms:
interface FederatedResult {
  id: string;
  platform: Platform;
  protocol: Protocol;
  content: SearchableContent;
  relevance: number;
  metadata: {
    author: string;
    published: Date;
    engagement: EngagementMetrics;
    source: string;
  };
}

// SEARCH Aggregation:
interface SearchAggregation {
  deduplication: boolean;
  rankingAlgorithm: 'relevance' | 'chronological' | 'engagement';
  platformWeighting: Record<Platform, number>;
  contentTypes: ContentType[];
  maxResults: number;
}
```

### **🔐 IDENTITY Management:**
```typescript
// DECENTRALIZED Identity:
interface DecentralizedIdentity {
  did: string; // Decentralized Identifier
  publicKey: string;
  privateKey?: string; // Only stored locally
  platforms: ConnectedPlatform[];
  profile: UniversalProfile;
  reputation: ReputationScore;
}

// CROSS-PLATFORM Profile:
interface UniversalProfile {
  displayName: string;
  bio: string;
  avatar: string;
  links: SocialLink[];
  verification: VerificationStatus[];
  preferences: FederationPreferences;
}
```

### **🔄 CROSS-PLATFORM Sharing:**
```typescript
// CONTENT Adaptation:
interface ContentAdapter {
  platform: Platform;
  maxLength: number;
  supportedMedia: MediaType[];
  formatContent: (content: ShareableContent) => AdaptedContent;
  validateContent: (content: AdaptedContent) => ValidationResult;
}

// SHARE Result:
interface ShareResult {
  platform: Platform;
  success: boolean;
  url?: string;
  postId?: string;
  error?: string;
  metrics?: ShareMetrics;
}
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Federation Component:
✅ Protocol message parsing/generation
✅ Cross-platform API integration simulation
✅ Identity verification and authentication
✅ Content adaptation and validation
✅ Network error handling and retry logic
✅ Protocol compliance validation
✅ Security and privacy protection
```

### **📚 STORYBOOK Federation:**
```typescript
// REQUIRED Stories:
✅ Default federation component
✅ Multi-protocol communication examples
✅ Cross-platform sharing scenarios
✅ Identity management workflows
✅ Search result aggregation demos
✅ Error handling demonstrations
✅ Privacy and security showcases
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-federation.md`
- **PROTOCOL COMPLIANCE:** Strict adherence to federation standards
- **PRIVACY PROTECTION:** User data never shared without consent

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
FEDERATION_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $FEDERATION_COUNT -lt 6 ]; then
  echo "🔄 CONTINUE: $FEDERATION_COUNT/6 Complete - Next federation component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 FEDERATION SYSTEM COMPLETE: @smolitux/federation 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **6/6 Federation Components** fully implemented
- **Protocol Compliance** ActivityPub, AT Protocol, Matrix support
- **Cross-Platform Integration** seamless content sharing
- **Decentralized Identity** DID-based authentication
- **Privacy Protection** user-controlled data sharing

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **FederatedSearch Component:**
```typescript
export const FederatedSearch = forwardRef<HTMLDivElement, FederatedSearchProps>(
  ({ 
    query,
    platforms,
    protocols,
    onResults,
    filters = [],
    realTime = false,
    deduplication = true,
    className,
    ...props 
  }, ref) => {
    const [results, setResults] = useState<FederatedResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchStatus, setSearchStatus] = useState<Record<string, SearchStatus>>({});
    
    // Search across multiple platforms
    const performFederatedSearch = useCallback(async (searchQuery: string) => {
      if (!searchQuery.trim()) return;
      
      setLoading(true);
      setResults([]);
      setSearchStatus({});
      
      const searchPromises = platforms.map(async (platform) => {
        try {
          setSearchStatus(prev => ({ ...prev, [platform.id]: 'searching' }));
          
          let platformResults: FederatedResult[] = [];
          
          // Platform-specific search implementation
          switch (platform.protocol) {
            case 'ActivityPub':
              platformResults = await searchActivityPub(platform, searchQuery, filters);
              break;
            case 'ATProtocol':
              platformResults = await searchATProtocol(platform, searchQuery, filters);
              break;
            case 'RSS':
              platformResults = await searchRSS(platform, searchQuery, filters);
              break;
            default:
              platformResults = await searchGeneric(platform, searchQuery, filters);
          }
          
          setSearchStatus(prev => ({ ...prev, [platform.id]: 'completed' }));
          return platformResults;
          
        } catch (error) {
          setSearchStatus(prev => ({ ...prev, [platform.id]: 'error' }));
          console.error(`Search failed for ${platform.name}:`, error);
          return [];
        }
      });
      
      try {
        const allResults = await Promise.all(searchPromises);
        let combinedResults = allResults.flat();
        
        // Deduplication
        if (deduplication) {
          combinedResults = deduplicateResults(combinedResults);
        }
        
        // Ranking and sorting
        combinedResults = rankResults(combinedResults, searchQuery);
        
        setResults(combinedResults);
        onResults?.(combinedResults);
        
      } catch (error) {
        console.error('Federated search failed:', error);
      } finally {
        setLoading(false);
      }
    }, [platforms, protocols, filters, deduplication, onResults]);
    
    // Real-time search updates
    useEffect(() => {
      if (!realTime || !query) return;
      
      const connections = platforms.map(platform => {
        if (platform.protocol === 'ActivityPub') {
          return subscribeActivityPubUpdates(platform, query, (update) => {
            setResults(prev => [update, ...prev]);
          });
        }
        return null;
      }).filter(Boolean);
      
      return () => {
        connections.forEach(connection => connection?.close());
      };
    }, [platforms, query, realTime]);
    
    // Trigger search when query changes
    useEffect(() => {
      if (query) {
        performFederatedSearch(query);
      }
    }, [query, performFederatedSearch]);
    
    return (
      <div 
        ref={ref}
        className={cn('federated-search space-y-4', className)}
        role="search"
        aria-label="Federated content search"
        {...props}
      >
        {/* Search Status */}
        <div className="flex flex-wrap gap-2">
          {platforms.map(platform => (
            <div 
              key={platform.id}
              className={cn(
                'px-2 py-1 rounded text-xs',
                {
                  'bg-yellow-100 text-yellow-800': searchStatus[platform.id] === 'searching',
                  'bg-green-100 text-green-800': searchStatus[platform.id] === 'completed',
                  'bg-red-100 text-red-800': searchStatus[platform.id] === 'error',
                  'bg-gray-100 text-gray-800': !searchStatus[platform.id],
                }
              )}
            >
              {platform.name}
              {searchStatus[platform.id] === 'searching' && (
                <span className="ml-1 animate-spin">⚡</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-muted-foreground">Searching across platforms...</p>
          </div>
        )}
        
        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {results.length} results found
              </h3>
              {deduplication && (
                <span className="text-sm text-muted-foreground">
                  Duplicates removed
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <FederatedResultItem
                  key={`${result.platform}-${result.id}`}
                  result={result}
                  index={index}
                  onInteraction={(action) => {
                    // Handle result interaction
                    console.log('Result interaction:', action, result);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* No Results */}
        {!loading && results.length === 0 && query && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No results found for "{query}" across {platforms.length} platforms
            </p>
          </div>
        )}
        
        {/* Accessibility */}
        <div className="sr-only" aria-live="polite">
          {loading && 'Searching across federated platforms'}
          {results.length > 0 && `Found ${results.length} results`}
        </div>
      </div>
    );
  }
);

// Helper functions for protocol-specific search
const searchActivityPub = async (platform: FederatedPlatform, query: string, filters: SearchFilter[]): Promise<FederatedResult[]> => {
  // ActivityPub search implementation
  const response = await fetch(`${platform.baseUrl}/api/v1/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  
  return data.statuses?.map((status: any) => ({
    id: status.id,
    platform: platform.id,
    protocol: 'ActivityPub',
    content: {
      text: status.content,
      author: status.account.display_name,
      url: status.url,
    },
    relevance: calculateRelevance(status.content, query),
    metadata: {
      author: status.account.acct,
      published: new Date(status.created_at),
      engagement: {
        likes: status.favourites_count,
        shares: status.reblogs_count,
        replies: status.replies_count,
      },
      source: platform.name,
    },
  })) || [];
};

const searchATProtocol = async (platform: FederatedPlatform, query: string, filters: SearchFilter[]): Promise<FederatedResult[]> => {
  // AT Protocol (Bluesky) search implementation
  try {
    const response = await fetch(`${platform.baseUrl}/xrpc/app.bsky.feed.searchPosts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query }),
    });
    
    const data = await response.json();
    
    return data.posts?.map((post: any) => ({
      id: post.uri,
      platform: platform.id,
      protocol: 'ATProtocol',
      content: {
        text: post.record.text,
        author: post.author.displayName,
        url: `${platform.baseUrl}/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`,
      },
      relevance: calculateRelevance(post.record.text, query),
      metadata: {
        author: post.author.handle,
        published: new Date(post.record.createdAt),
        engagement: {
          likes: post.likeCount || 0,
          shares: post.repostCount || 0,
          replies: post.replyCount || 0,
        },
        source: platform.name,
      },
    })) || [];
  } catch (error) {
    console.error('AT Protocol search failed:', error);
    return [];
  }
};

const calculateRelevance = (content: string, query: string): number => {
  // Simple relevance calculation
  const contentLower = content.toLowerCase();
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ');
  
  let score = 0;
  queryWords.forEach(word => {
    if (contentLower.includes(word)) {
      score += 1;
    }
  });
  
  return score / queryWords.length;
};

const deduplicateResults = (results: FederatedResult[]): FederatedResult[] => {
  const seen = new Set<string>();
  return results.filter(result => {
    const key = `${result.content.text.slice(0, 100)}-${result.metadata.author}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const rankResults = (results: FederatedResult[], query: string): FederatedResult[] => {
  return results.sort((a, b) => {
    // Sort by relevance first, then by engagement
    if (a.relevance !== b.relevance) {
      return b.relevance - a.relevance;
    }
    const aEngagement = (a.metadata.engagement.likes || 0) + (a.metadata.engagement.shares || 0);
    const bEngagement = (b.metadata.engagement.likes || 0) + (b.metadata.engagement.shares || 0);
    return bEngagement - aEngagement;
  });
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-federation.md << EOF
# @smolitux/federation Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/6 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 6" | bc)%)
Protocol Support: ✅ ActivityPub, AT Protocol, Matrix
Latest: $NEXT ✅
Cross-Platform: Seamless content sharing and discovery
Identity: Decentralized identity management
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 6/6 FEDERATION COMPONENTS = 100% FEDERATED SYSTEM!**
