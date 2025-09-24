import React from 'react';

/**
 * List of blog posts with actions
 */
// PUBLIC_INTERFACE
export function BlogPostList({ posts, onCreate, onOpen, onEdit, onDelete }) {
  /** Renders a list of posts and a create button. */
  return (
    <div className="card">
      <div className="section-header">
        <div className="h-row">
          <div>
            <h2 className="title">Blog Posts</h2>
            <p className="subtitle">Browse the latest articles</p>
          </div>
          <div>
            <button className="btn btn-amber" onClick={onCreate}>+ New Post</button>
          </div>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        {posts.length === 0 && (
          <div className="post-item">
            <div>
              <div className="post-title">No posts yet</div>
              <div className="post-meta">Be the first to create one.</div>
            </div>
          </div>
        )}
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <div onClick={() => onOpen?.(post.id)} style={{ cursor: 'pointer' }}>
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <span>{post.category || 'General'}</span>
                <span>•</span>
                <span>{new Date(post.updatedAt).toLocaleString()}</span>
                {!!(post.tags || []).length && (
                  <>
                    <span>•</span>
                    <span>{(post.tags || []).map(t => `#${t}`).join(' ')}</span>
                  </>
                )}
              </div>
            </div>
            <div className="post-actions">
              <button className="btn" onClick={() => onEdit?.(post.id)}>Edit</button>
              <button className="btn" onClick={() => onDelete?.(post.id)} aria-label={`Delete ${post.title}`}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
