import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { Sidebar } from './components/Sidebar';
import { BlogPostList } from './components/BlogPostList';
import { BlogPostView } from './components/BlogPostView';
import { BlogPostEditor } from './components/BlogPostEditor';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { blogApi } from './services/blogApi';
import { initialState, reducer, actions } from './state';

/**
 * Main Blog application component managing routing and data operations.
 */
// PUBLIC_INTERFACE
export function BlogApp() {
  /** This component sets up layout, manages pseudo routes via url hash, loads data, and wires CRUD. */
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authOpen, setAuthOpen] = useState({ open: false, mode: 'login' });

  // Load posts on mount
  useEffect(() => {
    (async () => {
      const posts = await blogApi.list();
      dispatch({ type: actions.SET_POSTS, payload: posts });
    })();
  }, []);

  // Hash-based lightweight routing: #/new, #/post/:id, #/edit/:id, default list
  const route = useMemo(() => {
    const hash = window.location.hash.replace(/^#/, '');
    const segments = hash.split('/').filter(Boolean);
    if (segments.length === 0) return { name: 'list' };
    if (segments[0] === 'new') return { name: 'new' };
    if (segments[0] === 'post' && segments[1]) return { name: 'view', id: segments[1] };
    if (segments[0] === 'edit' && segments[1]) return { name: 'edit', id: segments[1] };
    return { name: 'list' };
  }, [state.version]); // version allows us to trigger recompute when data changes

  useEffect(() => {
    const onHashChange = () => dispatch({ type: actions.TOUCH_ROUTE });
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const filteredPosts = useMemo(() => {
    let p = state.posts;
    if (state.categoryFilter) {
      p = p.filter(x => x.category === state.categoryFilter);
    }
    if (state.tagFilter.length) {
      p = p.filter(x => state.tagFilter.every(t => (x.tags || []).includes(t)));
    }
    if (state.search) {
      const s = state.search.toLowerCase();
      p = p.filter(x => x.title.toLowerCase().includes(s) || x.body.toLowerCase().includes(s));
    }
    return p.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [state.posts, state.categoryFilter, state.tagFilter, state.search]);

  const categories = useMemo(() => {
    const set = new Set(state.posts.map(p => p.category).filter(Boolean));
    return Array.from(set).sort();
  }, [state.posts]);

  const tags = useMemo(() => {
    const set = new Set(state.posts.flatMap(p => p.tags || []));
    return Array.from(set).sort();
  }, [state.posts]);

  // CRUD handlers using mock API for now
  const handleCreate = async (data) => {
    const created = await blogApi.create(data);
    dispatch({ type: actions.ADD_POST, payload: created });
    window.location.hash = `#/post/${created.id}`;
  };

  const handleUpdate = async (id, data) => {
    const updated = await blogApi.update(id, data);
    dispatch({ type: actions.UPDATE_POST, payload: updated });
    window.location.hash = `#/post/${id}`;
  };

  const handleDelete = async (id) => {
    await blogApi.remove(id);
    dispatch({ type: actions.DELETE_POST, payload: id });
    window.location.hash = '#/';
  };

  const viewContent = (() => {
    if (route.name === 'new') {
      return (
        <div className="card">
          <div className="section-header">
            <h2 className="title">New Post</h2>
            <p className="subtitle">Share your thoughts with the world</p>
          </div>
          <div className="section">
            <BlogPostEditor onSubmit={handleCreate} />
          </div>
        </div>
      );
    }
    if (route.name === 'edit') {
      const post = state.posts.find(p => String(p.id) === String(route.id));
      if (!post) return <div className="card section">Post not found.</div>;
      return (
        <div className="card">
          <div className="section-header">
            <div className="h-row">
              <div>
                <h2 className="title">Edit Post</h2>
                <p className="subtitle">Update your content</p>
              </div>
            </div>
          </div>
          <div className="section">
            <BlogPostEditor initialValue={post} onSubmit={(data) => handleUpdate(post.id, data)} />
          </div>
        </div>
      );
    }
    if (route.name === 'view') {
      const post = state.posts.find(p => String(p.id) === String(route.id));
      if (!post) return <div className="card section">Post not found.</div>;
      return (
        <BlogPostView
          post={post}
          onEdit={() => (window.location.hash = `#/edit/${post.id}`)}
          onDelete={() => handleDelete(post.id)}
        />
      );
    }
    return (
      <BlogPostList
        posts={filteredPosts}
        onCreate={() => (window.location.hash = '#/new')}
        onOpen={(id) => (window.location.hash = `#/post/${id}`)}
        onEdit={(id) => (window.location.hash = `#/edit/${id}`)}
        onDelete={handleDelete}
      />
    );
  })();

  return (
    <div className="app-shell">
      <TopNavBar
        onLogin={() => setAuthOpen({ open: true, mode: 'login' })}
        onSignup={() => setAuthOpen({ open: true, mode: 'signup' })}
        search={state.search}
        onSearch={(value) => dispatch({ type: actions.SET_SEARCH, payload: value })}
      />
      <main className="main">
        <aside className="sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <div className="chip-group" style={{ marginBottom: 12 }}>
            <button
              className={`chip ${!state.categoryFilter ? 'active' : ''}`}
              onClick={() => dispatch({ type: actions.SET_CATEGORY, payload: null })}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`chip ${state.categoryFilter === cat ? 'active' : ''}`}
                onClick={() => dispatch({ type: actions.SET_CATEGORY, payload: cat })}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 className="sidebar-title">Tags</h3>
          <div className="chip-group">
            {tags.map(tag => {
              const active = state.tagFilter.includes(tag);
              return (
                <button
                  key={tag}
                  className={`chip ${active ? 'active' : ''}`}
                  onClick={() => dispatch({ type: actions.TOGGLE_TAG, payload: tag })}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </aside>

        <section>
          {viewContent}
        </section>
      </main>
      <Footer />
      <AuthModal
        open={authOpen.open}
        mode={authOpen.mode}
        onClose={() => setAuthOpen({ ...authOpen, open: false })}
        onSubmit={(payload) => {
          // Mock auth handling
          console.log('Auth submit', authOpen.mode, payload);
          setAuthOpen({ ...authOpen, open: false });
        }}
      />
    </div>
  );
}
