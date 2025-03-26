import React, { useState } from 'react';
import { Button, Input } from '@smolitux/core';

export interface CommentData {
  /** Eindeutige ID des Kommentars */
  id: string;
  /** Inhalt des Kommentars */
  content: string;
  /** Autor des Kommentars */
  author: {
    /** Eindeutige ID des Autors */
    id: string;
    /** Name des Autors */
    name: string;
    /** Avatar-URL des Autors */
    avatar?: string;
  };
  /** Erstellungsdatum des Kommentars */
  createdAt: Date;
  /** Anzahl der Likes */
  likes: number;
  /** Wurde der Kommentar vom aktuellen Benutzer geliked? */
  isLiked?: boolean;
  /** Antworten auf den Kommentar */
  replies?: CommentData[];
}

export interface CommentSectionProps {
  /** Kommentare */
  comments: CommentData[];
  /** Aktueller Benutzer */
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  /** Callback beim Hinzufügen eines Kommentars */
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  /** Callback beim Liken eines Kommentars */
  onLikeComment: (commentId: string, isLiked: boolean) => Promise<void>;
  /** Callback beim Löschen eines Kommentars */
  onDeleteComment?: (commentId: string) => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * CommentSection-Komponente für Diskussionen zu Inhalten
 */
export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  onDeleteComment,
  className = '',
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  
  // Kommentar hinzufügen
  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Kommentars:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Antwort hinzufügen
  const handleAddReply = async (parentId: string) => {
    if (!replyContent.trim() || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddComment(replyContent, parentId);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Antwort:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Kommentar liken
  const handleLikeComment = async (commentId: string, isLiked: boolean) => {
    try {
      await onLikeComment(commentId, !isLiked);
    } catch (error) {
      console.error('Fehler beim Liken des Kommentars:', error);
    }
  };
  
  // Kommentar löschen
  const handleDeleteComment = async (commentId: string) => {
    if (!onDeleteComment) return;
    
    try {
      await onDeleteComment(commentId);
    } catch (error) {
      console.error('Fehler beim Löschen des Kommentars:', error);
    }
  };
  
  // Antworten ein-/ausklappen
  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  
  // Datum formatieren
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Avatar-Komponente
  const Avatar = ({ src, alt, size = 'md', className = '' }: { src?: string; alt: string; size?: 'sm' | 'md' | 'lg'; className?: string }) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };
    
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 ${className}`}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
            {alt.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    );
  };
  
  // Einzelner Kommentar
  const Comment = ({ comment, isReply = false }: { comment: CommentData; isReply?: boolean }) => {
    const { id, content, author, createdAt, likes, isLiked, replies } = comment;
    const hasReplies = replies && replies.length > 0;
    const isExpanded = expandedReplies[id] || false;
    
    return (
      <div className={`${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
        <div className="flex">
          <Avatar
            src={author.avatar}
            alt={author.name}
            size="md"
            className="mr-4"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {author.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(createdAt)}
                </p>
              </div>
              
              {currentUser && onDeleteComment && currentUser.id === author.id && (
                <button
                  onClick={() => handleDeleteComment(id)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {content}
            </p>
            
            <div className="mt-2 flex items-center space-x-4">
              <button
                onClick={() => handleLikeComment(id, !!isLiked)}
                className={`flex items-center text-sm ${
                  isLiked
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{likes}</span>
              </button>
              
              {currentUser && (
                <button
                  onClick={() => setReplyingTo(replyingTo === id ? null : id)}
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <span>Antworten</span>
                </button>
              )}
            </div>
            
            {replyingTo === id && currentUser && (
              <div className="mt-4 flex">
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  size="sm"
                  className="mr-2"
                />
                
                <div className="flex-1">
                  <Input
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder="Antwort schreiben..."
                    className="mb-2"
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                    >
                      Abbrechen
                    </Button>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddReply(id)}
                      disabled={!replyContent.trim() || isSubmitting}
                    >
                      Antworten
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {hasReplies && (
              <div className="mt-3">
                <button
                  onClick={() => toggleReplies(id)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {isExpanded
                    ? `${replies!.length} Antworten ausblenden`
                    : `${replies!.length} Antworten anzeigen`}
                </button>
                
                {isExpanded && (
                  <div className="mt-2">
                    {replies!.map(reply => (
                      <Comment key={reply.id} comment={reply} isReply />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Kommentare ({comments.length})
      </h3>
      
      {/* Kommentar-Eingabe */}
      {currentUser ? (
        <div className="mt-4 flex">
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
            size="md"
            className="mr-4"
          />
          
          <div className="flex-1">
            <Input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Kommentar schreiben..."
              className="mb-2"
            />
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                Kommentieren
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Bitte melden Sie sich an, um zu kommentieren.
        </p>
      )}
      
      {/* Kommentarliste */}
      <div className="mt-6 space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Noch keine Kommentare. Sei der Erste!
          </p>
        ) : (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};