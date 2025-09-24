const STORAGE_KEY = 'ocean_blog_posts_v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage failures in mock
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/**
 * Mock API for blog posts with localStorage persistence.
 */
// PUBLIC_INTERFACE
export const blogApi = {
  /** List all posts */
  async list() {
    let data = load();
    if (data.length === 0) {
      // seed demo content
      data = [
        {
          id: uid(),
          title: 'Welcome to Ocean Blog',
          body: 'Dive into modern content with a clean, minimal interface. This is a sample post to get you started.',
          category: 'General',
          tags: ['welcome', 'ocean'],
          createdAt: Date.now() - 1000 * 60 * 60 * 24,
          updatedAt: Date.now() - 1000 * 60 * 60 * 24,
        },
        {
          id: uid(),
          title: 'Designing with Purpose',
          body: 'Minimalism is not the lack of something, it is the perfect amount of something.',
          category: 'Design',
          tags: ['design', 'minimal'],
          createdAt: Date.now() - 1000 * 60 * 60 * 5,
          updatedAt: Date.now() - 1000 * 60 * 60 * 4,
        },
      ];
      save(data);
    }
    return new Promise((resolve) => setTimeout(() => resolve(data), 200));
  },

  /** Get a single post by id */
  async get(id) {
    const all = load();
    return new Promise((resolve, reject) => {
      const found = all.find(p => String(p.id) === String(id));
      setTimeout(() => (found ? resolve(found) : reject(new Error('Not found'))), 150);
    });
  },

  /** Create a new post */
  async create(payload) {
    const now = Date.now();
    const item = {
      id: uid(),
      title: payload.title,
      body: payload.body,
      category: payload.category || 'General',
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      createdAt: now,
      updatedAt: now,
    };
    const all = load();
    const next = [...all, item];
    save(next);
    return new Promise((resolve) => setTimeout(() => resolve(item), 120));
  },

  /** Update an existing post */
  async update(id, payload) {
    const all = load();
    const idx = all.findIndex(p => String(p.id) === String(id));
    if (idx === -1) throw new Error('Not found');
    const next = { ...all[idx], ...payload, updatedAt: Date.now() };
    const list = [...all];
    list[idx] = next;
    save(list);
    return new Promise((resolve) => setTimeout(() => resolve(next), 120));
  },

  /** Delete a post */
  async remove(id) {
    const all = load();
    const list = all.filter(p => String(p.id) !== String(id));
    save(list);
    return new Promise((resolve) => setTimeout(() => resolve(true), 100));
  }
};
