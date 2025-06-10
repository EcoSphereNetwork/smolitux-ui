# 👥 @smolitux/community - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS COMMUNITY FEATURES 100% COMPLETE
while [ "$(find packages/@smolitux/community/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 12 ]; do
  bash scripts/smolitux-analyzer.sh --package=community
  cd packages/@smolitux/community
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE COMMUNITY KOMPONENTE
  COMMUNITY=("UserProfile" "ActivityFeed" "Comments" "SocialShare" "UserCard" "PostComposer" "NotificationCenter" "FollowButton" "MessageThread" "UserList" "ReactionBar" "MentionInput")
  
  NEXT=$(for comp in "${COMMUNITY[@]}"; do
    if [ ! -f "src/components/$comp/$comp.tsx" ] || [ ! -f "src/components/$comp/$comp.test.tsx" ] || [ ! -f "src/components/$comp/$comp.stories.tsx" ]; then
      echo "$comp"; break
    fi
  done)
  
  echo "🎯 COMPLETING COMMUNITY: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE COMMUNITY KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_COMMUNITY]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(community): complete $NEXT - social platform component"
  git push origin main
  gh pr create --title "Complete Community: $NEXT" --body "Social platform component with privacy and moderation"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/12 Community Components"
done
echo "🎉 @smolitux/community 100% COMPLETE!"
```

---

## 📋 **COMMUNITY PACKAGE SPEZIFIKATIONEN:**

### **🎯 Community Components (12 Total):**
```
UserProfile ActivityFeed Comments SocialShare UserCard PostComposer NotificationCenter FollowButton MessageThread UserList ReactionBar MentionInput
```

### **✅ Pro Community Component REQUIRED:**
- **Privacy Controls:** Public, private, followers-only visibility
- **Moderation:** Report, block, hide functionality
- **Real-time:** Live updates for feeds and notifications
- **Social Features:** Follow, like, share, comment interactions
- **Mobile:** Touch-friendly social interactions

### **🔧 CORE Community Interfaces:**
```typescript
// USER Profile:
interface UserProfileProps {
  user: UserData;
  isOwner?: boolean;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onBlock?: (userId: string) => void;
  onReport?: (userId: string, reason: string) => void;
  showPrivacyControls?: boolean;
}

// ACTIVITY Feed:
interface ActivityFeedProps {
  activities: ActivityItem[];
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
  onShare?: (activityId: string) => void;
  onReport?: (activityId: string, reason: string) => void;
  realTime?: boolean;
}

// COMMENTS System:
interface CommentsProps {
  comments: CommentData[];
  onReply?: (commentId: string, content: string) => void;
  onLike?: (commentId: string) => void;
  onReport?: (commentId: string, reason: string) => void;
  allowNesting?: boolean;
  maxDepth?: number;
}
```

### **📁 Community Structure:**
```
src/components/
├── UserProfile/            # Complete user profile display
├── ActivityFeed/           # Social activity stream
├── Comments/               # Comment system with nesting
├── SocialShare/            # Share to social platforms
├── UserCard/               # Compact user display
├── PostComposer/           # Create posts with media
├── NotificationCenter/     # Real-time notifications
├── FollowButton/           # Follow/unfollow functionality
├── MessageThread/          # Direct messaging
├── UserList/               # List of users with actions
├── ReactionBar/            # Like, love, angry reactions
└── MentionInput/           # @mention input with autocomplete
```

### **🔐 PRIVACY & Moderation:**
```typescript
// PRIVACY Settings:
interface PrivacySettings {
  visibility: 'public' | 'private' | 'followers';
  allowMessages: boolean;
  allowMentions: boolean;
  showOnlineStatus: boolean;
  searchable: boolean;
}

// MODERATION Features:
interface ModerationActions {
  report: (targetId: string, reason: string, details?: string) => void;
  block: (userId: string) => void;
  unblock: (userId: string) => void;
  hide: (contentId: string) => void;
  mute: (userId: string, duration?: number) => void;
}

// CONTENT Filtering:
interface ContentFilter {
  keywords: string[];
  users: string[];
  minimumAge?: number;
  requireModeration?: boolean;
}
```

### **⚡ REAL-TIME Features:**
```typescript
// LIVE Updates:
interface RealTimeConfig {
  notifications: boolean;
  activities: boolean;
  messages: boolean;
  onlineStatus: boolean;
  typingIndicators: boolean;
}

// WEBSOCKET Integration:
const useSocialRealTime = (config: RealTimeConfig) => {
  // WebSocket connection and event handling
};
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Community Component:
✅ Social interaction testing (follow, like, share)
✅ Privacy controls testing (visibility settings)
✅ Moderation functionality (report, block)
✅ Real-time updates simulation
✅ Accessibility (social context for screen readers)
✅ Mobile touch interactions
✅ Content filtering and validation
```

### **📚 STORYBOOK Community:**
```typescript
// REQUIRED Stories:
✅ Default social component
✅ Privacy setting variations
✅ Moderation action examples
✅ Real-time update simulations
✅ Mobile interaction patterns
✅ Error states (blocked users, private content)
✅ Different user roles and permissions
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-community.md`
- **DATA PRIVACY:** GDPR-compliant privacy controls
- **CONTENT MODERATION:** Community guidelines enforcement

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
COMMUNITY_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $COMMUNITY_COUNT -lt 12 ]; then
  echo "🔄 CONTINUE: $COMMUNITY_COUNT/12 Complete - Next community component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 SOCIAL PLATFORM COMPLETE: @smolitux/community 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **12/12 Community Components** fully implemented
- **Privacy Controls** granular visibility settings
- **Moderation Tools** report, block, content filtering
- **Real-time Features** live updates and notifications
- **Mobile Social UX** touch-optimized interactions

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **UserProfile Component:**
```typescript
export const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(
  ({ 
    user, 
    isOwner = false,
    onFollow,
    onMessage,
    onBlock,
    onReport,
    showPrivacyControls = false,
    className,
    ...props 
  }, ref) => {
    const [isFollowing, setIsFollowing] = useState(user.isFollowing);
    const [showReportModal, setShowReportModal] = useState(false);
    
    const handleFollow = useCallback(() => {
      if (isFollowing) {
        // Unfollow logic
        onFollow?.(user.id);
        setIsFollowing(false);
      } else {
        // Follow logic  
        onFollow?.(user.id);
        setIsFollowing(true);
      }
    }, [isFollowing, onFollow, user.id]);
    
    const handleReport = useCallback((reason: string) => {
      onReport?.(user.id, reason);
      setShowReportModal(false);
    }, [onReport, user.id]);
    
    return (
      <div 
        ref={ref}
        className={cn('user-profile', className)}
        role="region"
        aria-label={`${user.displayName}'s profile`}
        {...props}
      >
        {/* Profile Header */}
        <div className="profile-header">
          <img 
            src={user.avatar} 
            alt={`${user.displayName}'s avatar`}
            className="avatar"
          />
          <div className="user-info">
            <h1 className="display-name">{user.displayName}</h1>
            <p className="username">@{user.username}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
          </div>
          
          {/* Action Buttons */}
          {!isOwner && (
            <div className="profile-actions">
              <button 
                onClick={handleFollow}
                className={cn('follow-btn', { following: isFollowing })}
                aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              
              <button 
                onClick={() => onMessage?.(user.id)}
                className="message-btn"
                aria-label="Send message"
              >
                Message
              </button>
              
              <button 
                onClick={() => setShowReportModal(true)}
                className="report-btn"
                aria-label="Report user"
              >
                Report
              </button>
            </div>
          )}
        </div>
        
        {/* Privacy Controls */}
        {isOwner && showPrivacyControls && (
          <PrivacyControls userId={user.id} />
        )}
        
        {/* Profile Stats */}
        <div className="profile-stats" role="list">
          <div role="listitem">
            <span className="stat-value">{user.followersCount}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div role="listitem">
            <span className="stat-value">{user.followingCount}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
        
        {/* Report Modal */}
        {showReportModal && (
          <ReportModal 
            onReport={handleReport}
            onClose={() => setShowReportModal(false)}
            targetType="user"
            targetName={user.displayName}
          />
        )}
        
        {/* Accessibility */}
        <div className="sr-only">
          Profile for {user.displayName}. 
          {user.followersCount} followers, {user.followingCount} following.
          {isFollowing ? 'You are following this user.' : 'You are not following this user.'}
        </div>
      </div>
    );
  }
);
```

### **Social Hooks Pattern:**
```typescript
export const useSocialActions = () => {
  const follow = useCallback(async (userId: string) => {
    // Follow logic with API call
  }, []);
  
  const unfollow = useCallback(async (userId: string) => {
    // Unfollow logic with API call
  }, []);
  
  const like = useCallback(async (contentId: string) => {
    // Like logic with API call
  }, []);
  
  const share = useCallback(async (contentId: string, platform?: string) => {
    // Share logic
  }, []);
  
  return { follow, unfollow, like, share };
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-community.md << EOF
# @smolitux/community Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/12 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 12" | bc)%)
Social Features: ✅ Follow, like, share, comment
Latest: $NEXT ✅
Privacy: Granular visibility controls
Moderation: Report, block, content filtering
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 12/12 COMMUNITY COMPONENTS = 100% SOCIAL PLATFORM!**
