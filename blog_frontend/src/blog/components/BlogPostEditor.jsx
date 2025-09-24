import React, { useEffect, useState } from 'react';

const defaultValue = {
  title: '',
  body: '',
  category: 'General',
  tags: []
};

/**
 * Editor for creating/updating blog posts
 */
// PUBLIC_INTERFACE
export function BlogPostEditor({ initialValue, onSubmit }) {
  /** Controlled form to edit or create a blog post. */
  const [form, setForm] = useState(defaultValue);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialValue) {
      setForm({
        title: initialValue.title || '',
        body: initialValue.body || '',
        category: initialValue.category || 'General',
        tags: initialValue.tags || []
      });
    } else {
      setForm(defaultValue);
    }
  }, [initialValue]);

  const handleAddTag = () => {
    const cleaned = tagInput.trim().replace(/^#/, '');
    if (!cleaned) return;
    if (!form.tags.includes(cleaned)) {
      setForm({ ...form, tags: [...form.tags, cleaned] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    onSubmit?.(form);
  };

  return (
    <form className="editor" onSubmit={submit}>
      <input
        className="input"
        placeholder="Post title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        aria-label="Post title"
      />
      <div className="form-row">
        <select
          className="select"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          aria-label="Category"
        >
          <option>General</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Product</option>
          <option>Culture</option>
        </select>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="input"
            placeholder="Add tag (press +)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            aria-label="Tag input"
          />
          <button type="button" className="btn btn-primary" onClick={handleAddTag}>+ Tag</button>
        </div>
      </div>
      <div className="chip-group" style={{ marginBottom: 4 }}>
        {form.tags.map(tag => (
          <button type="button" key={tag} className="chip active" onClick={() => handleRemoveTag(tag)}>
            #{tag} ×
          </button>
        ))}
      </div>
      <textarea
        className="textarea"
        placeholder="Write your content..."
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
        aria-label="Post body"
      />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button className="btn btn-amber" type="submit">{initialValue ? 'Update Post' : 'Create Post'}</button>
      </div>
    </form>
  );
}
