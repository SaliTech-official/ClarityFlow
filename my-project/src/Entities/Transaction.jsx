// Simple in-memory CRUD for demo purposes
// In a real app, replace with API calls or persistent storage

const STORAGE_KEY = 'transactions';

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export const Transaction = {
  async list(sort = '-created_date') {
    const items = readFromStorage();
    if (sort === '-created_date') {
      items.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    return items;
  },

  async create(data) {
    const items = readFromStorage();
    const newItem = {
      id: crypto.randomUUID(),
      created_date: new Date().toISOString(),
      ...data,
    };
    items.push(newItem);
    writeToStorage(items);
    return newItem;
  },

  async delete(id) {
    const items = readFromStorage();
    const next = items.filter((t) => t.id !== id);
    writeToStorage(next);
    return { success: true };
  },
};

export default Transaction;

