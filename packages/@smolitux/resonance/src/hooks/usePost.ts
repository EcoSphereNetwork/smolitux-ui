import { useState, useEffect } from 'react';

/**
 * Hook für die Verwaltung von Post-Daten
 * @param postId ID des Posts
 * @returns Post-Daten und Funktionen
 */
export function usePost(postId: string) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulierte Daten-Fetch-Funktion
  const fetchPost = async () => {
    if (!postId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In einer realen Implementierung würde hier ein API-Aufruf stehen
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulierte Daten
      setPost({
        id: postId,
        title: 'Beispiel-Post',
        content: 'Dies ist ein Beispiel-Post.',
        author: {
          id: 'user1',
          name: 'Max Mustermann',
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
      });
      
      setComments([]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Initialer Fetch
  useEffect(() => {
    fetchPost();
  }, [postId]);

  // Funktion zum Liken eines Posts
  const likePost = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.likes + 1,
    }));
  };

  // Funktion zum Kommentieren eines Posts
  const commentPost = (content: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      content,
      author: {
        id: 'currentUser',
        name: 'Aktueller Benutzer',
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    setComments(prev => [newComment, ...prev]);
    setPost(prev => ({
      ...prev,
      comments: prev.comments + 1,
    }));
  };

  // Funktion zum Teilen eines Posts
  const sharePost = () => {
    setPost(prev => ({
      ...prev,
      shares: prev.shares + 1,
    }));
  };

  return {
    post,
    comments,
    loading,
    error,
    likePost,
    commentPost,
    sharePost,
  };
}