import React from 'react';

/**
 * Individual blog post view with edit/delete actions
 */
// PUBLIC_INTERFACE
export function BlogPostView({ post, onEdit, onDelete }) {
  /** Displays a single post content. */
  return (
    <article className="card article">
      <div className="post-meta" style={{ marginBottom: 8 }}>
        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{post.category || 'General'}</span>
        <span>•</span>
        <span>{new Date(post.updatedAt).toLocaleString()}</span>
      </div>
      <h1 className="article-title">{post.title}</h1>
      {(post.tags || []).length > 0 && (
        <div className="post-meta" style={{ marginBottom: 10 }}>{post.tags.map(t => `#${t}`).join(' ')}</div>
      )}
      <div className="article-body">{post.body}</div>
      <div className="post-actions" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onEdit}>Edit</button>
        <button className="btn" onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}
